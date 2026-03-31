import { Target, Lightbulb, Palette, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { ServicesSection } from '../components/blocks/services-section';
import { CTASection } from '../components/blocks/cta-section';

/* ============================================
   🛠️ SERVIÇOS - PÁGINA DE SOLUÇÕES
   ============================================
   
   CUSTOMIZAR:
   1. Título hero: Linha 36
   2. Descrição hero: Linha 44
   3. Serviços principais: Array mainServices
   4. Seção intermediária: Textos e bullet points
   5. Processo: Steps do "Como funciona"
   6. CTA final: Título, descrição e botão
   
   ============================================ */

export default function Servicos() {
  const mainServices = [
    {
      icon: Target,
      title: 'Serviço 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    {
      icon: Lightbulb,
      title: 'Serviço 2',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
    },
    {
      icon: Palette,
      title: 'Serviço 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.'
    },
    {
      icon: Cpu,
      title: 'Serviço 4',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus.'
    }
  ];

  return (
    <div className="pt-20 relative">
      {/* Hero Section */}
      <section className="section-spacing-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              SOLUÇÕES
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Oferecemos um conjunto integrado de soluções para atender às necessidades do seu negócio com qualidade e eficiência.
            </motion.p>
          </div>
        </div>
      </section>

      <ServicesSection
        title="O que fazemos"
        description=""
        services={mainServices}
      />

      <section className="section-spacing-sm bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl lg:text-4xl font-light mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Seu título de destaque aqui
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.p>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                Nosso trabalho garante que:
              </p>
              <ul className="space-y-3 text-lg text-muted-foreground ml-6">
                <li>• Benefício ou diferencial número um</li>
                <li>• Benefício ou diferencial número dois</li>
                <li>• Benefício ou diferencial número três</li>
                <li>• Benefício ou diferencial número quatro</li>
              </ul>
            </motion.div>

            <motion.p
              className="text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h2 
              className="text-3xl lg:text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Como funciona na prática
            </motion.h2>
            <motion.p 
              className="text-lg leading-relaxed mb-12 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nosso processo é adaptável às necessidades de cada projeto.
            </motion.p>
            <div className="space-y-8 mt-12">
              {[
                { 
                  title: 'Etapa 1', 
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.' 
                },
                { 
                  title: 'Etapa 2', 
                  description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' 
                },
                { 
                  title: 'Etapa 3', 
                  description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' 
                },
                { 
                  title: 'Etapa 4', 
                  description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' 
                },
                { 
                  title: 'Etapa 5', 
                  description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.' 
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-sm font-medium text-muted-foreground shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="SEU TÍTULO DE CHAMADA AQUI"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        buttonText="Fale Conosco"
        buttonHref="/contato"
      />
    </div>
  );
}