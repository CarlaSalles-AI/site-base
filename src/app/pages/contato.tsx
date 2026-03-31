import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { contactAPI } from '../../lib/api';

/* ============================================
   📞 CONTATO - PÁGINA DE CONTATO
   ============================================
   
   CUSTOMIZAR:
   1. Título e descrição: Linhas 71-79
   2. Informações de contato: Linhas 91-93
   3. Formulário: Já funcional com Supabase
   
   ============================================ */

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.submit(formData);
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.', {
        duration: 5000,
        style: {
          fontSize: '16px',
          padding: '16px 24px',
          minHeight: '60px'
        }
      });
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.', {
        duration: 5000,
        style: {
          fontSize: '16px',
          padding: '16px 24px',
          minHeight: '60px'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-20 relative">
      <section className="section-spacing-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* ========== TÍTULO - CUSTOMIZAR AQUI ========== */}
          <div className="max-w-4xl mb-16">
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              VAMOS CONVERSAR
            </motion.h1>
            <motion.p 
              className="text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Entre em contato conosco. Estamos prontos para ouvir suas ideias e ajudar seu negócio.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* ========== INFORMAÇÕES - CUSTOMIZAR AQUI ========== */}
            <div>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'contato@suaempresa.com.br', href: 'mailto:contato@suaempresa.com.br', delay: 0.2 },
                  { icon: Phone, label: 'Telefone', value: '(00) 00000-0000', href: 'https://wa.me/5500000000000', delay: 0.3, target: '_blank' },
                  { icon: MapPin, label: 'Localização', value: 'Sua Cidade, Estado', href: null, delay: 0.4 }
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: contact.delay }}
                    >
                      <Icon className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                          {contact.label}
                        </p>
                        {contact.href ? (
                          <a 
                            href={contact.href}
                            className="text-foreground hover:text-muted-foreground transition-colors"
                            target={contact.target}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{contact.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <motion.div 
              className="bg-muted/30 p-[6px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-none bg-background"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-none bg-background"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs">Empresa (Opcional)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="rounded-none bg-background"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="rounded-none bg-background resize-none"
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}