import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase clients
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper to get user from token
async function getUser(authHeader: string | null) {
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

// Helper to generate ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// AUTH ROUTES
// ============================================

// Health check
app.get("/make-server-a04a6230/health", (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Setup - Create first admin_master (only works if no admin exists)
app.post("/make-server-a04a6230/auth/setup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    console.log('Setup request received:', { email, name });

    // Validate input
    if (!email || !password || !name) {
      return c.text('Email, password and name are required', 400);
    }

    if (password.length < 6) {
      return c.text('Password must be at least 6 characters', 400);
    }

    // Create user in Supabase Auth first
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: { name }
    });

    if (authError) {
      console.log('Error creating user in Supabase Auth:', authError);
      
      // Better error messages
      if (authError.message.includes('already been registered') || authError.message.includes('already exists')) {
        return c.text('Email já está registrado. Use /login para acessar o sistema.', 400);
      }
      
      return c.text(`Erro ao criar usuário: ${authError.message}`, 400);
    }

    console.log('User created in Auth:', authData.user.id);

    // Create profile in usuarios table with admin_master role
    // IMPORTANT: Use supabaseAdmin to bypass RLS policies
    const { data: newProfile, error: insertError } = await supabaseAdmin
      .from('usuarios')
      .insert({
        id: authData.user!.id,
        nome: name,
        email,
        role: 'admin_master'
      })
      .select()
      .single();

    if (insertError) {
      console.log('Error creating user profile in database:', insertError);
      
      // If profile creation fails, delete the auth user to keep consistency
      await supabaseAdmin.auth.admin.deleteUser(authData.user!.id);
      
      return c.text(`Erro no banco de dados: ${insertError.message}`, 500);
    }

    console.log('Profile created successfully:', newProfile);

    return c.json({ 
      success: true, 
      message: 'Admin criado com sucesso!',
      profile: newProfile 
    });
  } catch (error: any) {
    console.log('Error in setup:', error);
    return c.text(`Erro no servidor: ${error.message || error}`, 500);
  }
});

// Get profile
app.get("/make-server-a04a6230/auth/profile", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      return c.text('Unauthorized', 401);
    }

    const { data: profile, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      console.log('Error getting profile from database:', error);
      return c.text('Profile not found', 404);
    }

    return c.json(profile);
  } catch (error) {
    console.log('Error getting profile:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Get all users (admin_master only)
app.get("/make-server-a04a6230/auth/users", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      return c.text('Unauthorized', 401);
    }

    const { data: profile, error: profileError } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'admin_master') {
      return c.text('Only admin_master can list users', 403);
    }

    const { data: usuarios, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error listing users from database:', error);
      return c.text(`Database error: ${error.message}`, 500);
    }

    return c.json(usuarios || []);
  } catch (error) {
    console.log('Error listing users:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Create new user (admin_master only)
app.post("/make-server-a04a6230/auth/signup", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      return c.text('Unauthorized', 401);
    }

    const { data: profile, error: profileError } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'admin_master') {
      return c.text('Only admin_master can create users', 403);
    }

    const { email, password, name, role } = await c.req.json();

    // Validate input
    if (!email || !password || !name || !role) {
      return c.text('Email, password, name and role are required', 400);
    }

    if (password.length < 6) {
      return c.text('Password must be at least 6 characters', 400);
    }

    if (!['admin_master', 'editor'].includes(role)) {
      return c.text('Invalid role', 400);
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: { name }
    });

    if (authError) {
      console.log('Error creating user in Supabase Auth:', authError);
      return c.text(`Error creating user: ${authError.message}`, 400);
    }

    // Create profile in usuarios table
    const { data: newProfile, error: insertError } = await supabase
      .from('usuarios')
      .insert({
        id: authData.user!.id,
        nome: name,
        email,
        role
      })
      .select()
      .single();

    if (insertError) {
      console.log('Error creating user profile in database:', insertError);
      return c.text(`Database error: ${insertError.message}`, 500);
    }

    return c.json({ 
      success: true, 
      message: 'User created successfully',
      profile: newProfile 
    });
  } catch (error) {
    console.log('Error in signup:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// ============================================
// PORTFOLIO ROUTES
// ============================================

// Submit contact form
app.post("/make-server-a04a6230/contact", async (c) => {
  try {
    const { name, email, company, message } = await c.req.json();

    console.log('📧 Contact form submission received:', { name, email, company, message: message?.substring(0, 50) });

    // Validate input
    if (!name || !email || !message) {
      console.log('❌ Validation failed: missing required fields');
      return c.text('Name, email and message are required', 400);
    }

    // Save to database table 'mensagens'
    const { data: savedMessage, error: dbError } = await supabase
      .from('mensagens')
      .insert({
        nome: name,
        email: email,
        empresa: company || null,
        mensagem: message,
        lida: false
      })
      .select()
      .single();

    if (dbError) {
      console.log('❌ Database error saving message:', dbError);
      return c.text(`Database error: ${dbError.message}`, 500);
    }

    console.log('✅ Contact saved to database:', savedMessage.id);

    // Send email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.log('⚠️ RESEND_API_KEY not configured, skipping email send');
      return c.json({ success: true, message: 'Contact saved (email not configured)' });
    }

    console.log('📤 Attempting to send email via Resend...');

    const emailHtml = `
      <h2>Nova mensagem de contato - Website</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">Enviado em ${new Date().toLocaleString('pt-BR')}</p>
    `;

    const emailPayload = {
      from: 'Website <onboarding@resend.dev>',
      to: ['contato@seudominio.com.br'],
      subject: `Nova mensagem de contato: ${name}`,
      html: emailHtml,
      reply_to: email
    };

    console.log('📧 Email payload:', JSON.stringify(emailPayload, null, 2));

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    console.log('📬 Resend API response status:', emailResponse.status);

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.log('❌ Error sending email via Resend:', errorText);
      // Don't fail the request - contact is already saved
      return c.json({ 
        success: true, 
        message: 'Contact saved but email failed to send',
        emailError: errorText 
      });
    }

    const emailResult = await emailResponse.json();
    console.log('✅ Email sent successfully via Resend:', emailResult);

    return c.json({ success: true, message: 'Contact submitted and email sent' });
  } catch (error) {
    console.log('❌ Error processing contact form:', error);
    console.log('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.text(`Server error: ${error instanceof Error ? error.message : String(error)}`, 500);
  }
});

// Get all contact submissions (admin only)
app.get("/make-server-a04a6230/contact", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      return c.text('Unauthorized', 401);
    }

    // Get messages from 'mensagens' table
    const { data: mensagens, error } = await supabase
      .from('mensagens')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Error getting messages from database:', error);
      return c.text(`Database error: ${error.message}`, 500);
    }

    return c.json(mensagens || []);
  } catch (error) {
    console.log('Error getting contacts:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// ============================================
// PORTFOLIO ROUTES
// ============================================

// Get all projects
app.get("/make-server-a04a6230/portfolio", async (c) => {
  try {
    const published = c.req.query('published');
    
    // Get all projects from database
    let query = supabase
      .from('projetos')
      .select('*')
      .order('title', { ascending: true }); // Ordem alfabética por título
    
    if (published !== undefined) {
      query = query.eq('published', published === 'true');
    }
    
    const { data: projects, error } = await query;
    
    if (error) {
      console.log('Error getting portfolio from database:', error);
      return c.text(`Database error: ${error.message}`, 500);
    }

    // Ensure category is always an array for each project
    const normalizedProjects = (projects || []).map(p => ({
      ...p,
      category: Array.isArray(p.category) ? p.category : 
                typeof p.category === 'string' ? [p.category] : []
    }));

    return c.json(normalizedProjects);
  } catch (error) {
    console.log('Error getting portfolio:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Get project by ID (must be before slug route to avoid conflict)
app.get("/make-server-a04a6230/portfolio/id/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const { data: project, error } = await supabase
      .from('projetos')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !project) {
      console.log('Error getting project by ID from database:', error);
      return c.text('Project not found', 404);
    }

    // Normalize category to array
    const normalized = {
      ...project,
      category: Array.isArray(project.category) ? project.category : 
                typeof project.category === 'string' ? [project.category] : []
    };

    return c.json(normalized);
  } catch (error) {
    console.log('Error getting project by ID:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Get project by slug
app.get("/make-server-a04a6230/portfolio/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    
    const { data: project, error } = await supabase
      .from('projetos')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !project) {
      console.log('Error getting project from database:', error);
      return c.text('Project not found', 404);
    }

    // Normalize category to array
    const normalized = {
      ...project,
      category: Array.isArray(project.category) ? project.category : 
                typeof project.category === 'string' ? [project.category] : []
    };

    return c.json(normalized);
  } catch (error) {
    console.log('Error getting project:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Create portfolio project
app.post("/make-server-a04a6230/portfolio", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      console.log('Portfolio POST - Unauthorized');
      return c.text('Unauthorized', 401);
    }

    const data = await c.req.json();
    console.log('Portfolio POST - Data received:', JSON.stringify(data, null, 2));
    console.log('Portfolio POST - Category type:', typeof data.category, Array.isArray(data.category));
    console.log('Portfolio POST - Category value:', data.category);

    // Validate required fields
    if (!data.title || !data.slug) {
      console.log('Portfolio POST - Missing required fields');
      return c.text('Missing required fields: title, slug', 400);
    }

    // Ensure category is an array
    const categoryArray = Array.isArray(data.category) ? data.category : [data.category].filter(Boolean);
    console.log('Portfolio POST - Category normalized:', categoryArray);

    const now = new Date().toISOString();
    
    // Insert into database using English column names
    const { data: project, error } = await supabase
      .from('projetos')
      .insert({
        title: data.title,
        slug: data.slug,
        category: categoryArray,
        short_description: data.short_description,
        full_description: data.full_description || '',
        cover_image_url: data.cover_image_url || '',
        gallery: data.gallery || [],
        tags: data.tags || [],
        featured: data.featured || false,
        published: data.published || false,
        created_at: now,
        updated_at: now,
        created_by: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Portfolio POST - Database error:', JSON.stringify(error, null, 2));
      return c.text(`Database error: ${JSON.stringify(error)}`, 500);
    }
    
    console.log('Portfolio POST - Project saved successfully:', project.id);
    return c.json(project);
  } catch (error) {
    console.error('Portfolio POST - Error:', error);
    return c.text(`Error creating project: ${error}`, 500);
  }
});

// Update project
app.put("/make-server-a04a6230/portfolio/:id", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      console.log('Portfolio PUT - Unauthorized');
      return c.text('Unauthorized', 401);
    }

    const id = c.req.param('id');
    const data = await c.req.json();
    
    console.log('Portfolio PUT - Updating project:', id);
    console.log('Portfolio PUT - Data received:', JSON.stringify(data, null, 2));

    // Ensure category is an array
    const categoryArray = Array.isArray(data.category) ? data.category : [data.category].filter(Boolean);

    const now = new Date().toISOString();

    const { data: project, error } = await supabase
      .from('projetos')
      .update({
        title: data.title,
        slug: data.slug,
        category: categoryArray,
        short_description: data.short_description,
        full_description: data.full_description || '',
        cover_image_url: data.cover_image_url || '',
        gallery: data.gallery || [],
        tags: data.tags || [],
        featured: data.featured || false,
        published: data.published || false,
        updated_at: now
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.log('Portfolio PUT - Database error:', error);
      return c.text(`Database error: ${error.message}`, 500);
    }

    if (!project) {
      console.log('Portfolio PUT - Project not found');
      return c.text('Project not found', 404);
    }

    console.log('Portfolio PUT - Project updated successfully:', project.id);
    return c.json(project);
  } catch (error) {
    console.log('Portfolio PUT - Error:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Delete project
app.delete("/make-server-a04a6230/portfolio/:id", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      return c.text('Unauthorized', 401);
    }

    const id = c.req.param('id');

    const { error } = await supabase
      .from('projetos')
      .delete()
      .eq('id', id);

    if (error) {
      console.log('Error deleting project from database:', error);
      return c.text(`Database error: ${error.message}`, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting project:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

// Upload image to Cloudinary
app.post("/make-server-a04a6230/cloudinary/upload", async (c) => {
  try {
    const user = await getUser(c.req.header('Authorization'));
    if (!user) {
      return c.text('Unauthorized', 401);
    }

    const cloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME');
    const apiKey = Deno.env.get('CLOUDINARY_API_KEY');
    const apiSecret = Deno.env.get('CLOUDINARY_API_SECRET');

    console.log('Cloudinary config check:', {
      cloudName: cloudName ? '✓' : '✗',
      apiKey: apiKey ? '✓' : '✗',
      apiSecret: apiSecret ? '✓' : '✗'
    });

    if (!cloudName || !apiKey || !apiSecret) {
      console.log('Missing Cloudinary credentials');
      return c.text('Cloudinary credentials not configured', 500);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'portfolio';

    if (!file) {
      console.log('No file provided in request');
      return c.text('No file provided', 400);
    }

    console.log('File received:', { name: file.name, type: file.type, size: file.size });

    // Convert file to base64 - FIX for large files
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Convert bytes to base64 without spreading (prevents stack overflow)
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    const dataUri = `data:${file.type};base64,${base64}`;

    console.log('File converted to base64, length:', base64.length);

    // Create signature for authenticated upload
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    
    // Generate SHA-1 signature
    const encoder = new TextEncoder();
    const data = encoder.encode(paramsToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log('Signature generated, uploading to Cloudinary...');

    // Upload to Cloudinary
    const uploadFormData = new FormData();
    uploadFormData.append('file', dataUri);
    uploadFormData.append('folder', folder);
    uploadFormData.append('timestamp', timestamp.toString());
    uploadFormData.append('signature', signature);
    uploadFormData.append('api_key', apiKey);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );

    console.log('Cloudinary response status:', uploadResponse.status);

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.log('Cloudinary upload error:', errorText);
      return c.text(`Upload failed: ${errorText}`, 500);
    }

    const result = await uploadResponse.json();
    console.log('Upload successful:', result.secure_url);
    
    return c.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    console.log('Error uploading to Cloudinary:', error);
    return c.text(`Server error: ${error}`, 500);
  }
});

Deno.serve(app.fetch);