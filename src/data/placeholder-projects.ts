import type { PortfolioProject } from '../types';
import placeholderImage from 'figma:asset/bc73bb8a3e11bcaf8016f38de735484fdf83be63.png';

// Dados placeholder para demonstração do template
// Substitua estes dados pelos projetos reais do cliente
export const placeholderProjects: PortfolioProject[] = [
  {
    id: 'placeholder-1',
    title: 'Projeto 1',
    slug: 'projeto-1',
    category: ['branding'],
    short_description: 'Descrição breve do projeto 1',
    full_description: 'Descrição completa do projeto 1. Este é um projeto de exemplo para demonstração do template.',
    cover_image_url: placeholderImage,
    gallery: [placeholderImage],
    tags: ['tag1', 'tag2'],
    featured: true,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'placeholder-2',
    title: 'Projeto 2',
    slug: 'projeto-2',
    category: ['design comercial'],
    short_description: 'Descrição breve do projeto 2',
    full_description: 'Descrição completa do projeto 2. Este é um projeto de exemplo para demonstração do template.',
    cover_image_url: placeholderImage,
    gallery: [placeholderImage],
    tags: ['tag1', 'tag2'],
    featured: false,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'placeholder-3',
    title: 'Projeto 3',
    slug: 'projeto-3',
    category: ['embalagem'],
    short_description: 'Descrição breve do projeto 3',
    full_description: 'Descrição completa do projeto 3. Este é um projeto de exemplo para demonstração do template.',
    cover_image_url: placeholderImage,
    gallery: [placeholderImage],
    tags: ['tag1', 'tag2'],
    featured: false,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'placeholder-4',
    title: 'Projeto 4',
    slug: 'projeto-4',
    category: ['branding'],
    short_description: 'Descrição breve do projeto 4',
    full_description: 'Descrição completa do projeto 4. Este é um projeto de exemplo para demonstração do template.',
    cover_image_url: placeholderImage,
    gallery: [placeholderImage],
    tags: ['tag1', 'tag2'],
    featured: false,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'placeholder-5',
    title: 'Projeto 5',
    slug: 'projeto-5',
    category: ['design comercial'],
    short_description: 'Descrição breve do projeto 5',
    full_description: 'Descrição completa do projeto 5. Este é um projeto de exemplo para demonstração do template.',
    cover_image_url: placeholderImage,
    gallery: [placeholderImage],
    tags: ['tag1', 'tag2'],
    featured: false,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'placeholder-6',
    title: 'Projeto 6',
    slug: 'projeto-6',
    category: ['embalagem'],
    short_description: 'Descrição breve do projeto 6',
    full_description: 'Descrição completa do projeto 6. Este é um projeto de exemplo para demonstração do template.',
    cover_image_url: placeholderImage,
    gallery: [placeholderImage],
    tags: ['tag1', 'tag2'],
    featured: true,
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
