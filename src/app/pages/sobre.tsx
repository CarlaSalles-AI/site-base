import { motion } from 'motion/react';
import { CTASection } from '../components/blocks/cta-section';

/* ============================================
   📖 SOBRE - PÁGINA INSTITUCIONAL
   ============================================
   
   CUSTOMIZAR:
   1. Título: Linha 30
   2. Textos principais: Parágrafos abaixo
   3. Estatísticas: Array de stats
   4. Seção "Para quem é": Bullet points
   5. Processo: Steps do "Como funciona"
   6. CTA final: Título, descrição e botão
   
   ============================================ */

export default function Sobre() {
  return (
    <div className="pt-20">
      <section className="section-spacing px-[0px] py-[120px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* ========== TÍTULO - CUSTOMIZAR AQUI ========== */}
          <div className="max-w-4xl">
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              SOBRE NÓS
            </motion.h1>
            
            {/* ========== TEXTOS PRINCIPAIS - CUSTOMIZAR AQUI ========== */}
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Primeiro parágrafo sobre sua empresa. Conte sua história, missão e valores principais. Seja claro e direto sobre o que você faz.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Segundo parágrafo detalhando sua metodologia, diferenciais e como você trabalha. Mostre credibilidade e experiência.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Terceiro parágrafo reforçando compromissos e resultados. Encerre com impacto e convicção.
              </motion.p>
            </div>

            {/* ========== ESTATÍSTICAS - CUSTOMIZAR AQUI ========== */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { value: '10+', label: 'Anos de experiência', delay: 0.4 },
                { value: '50+', label: 'Projetos entregues', delay: 0.5 },
                { value: '30+', label: 'Clientes satisfeitos', delay: 0.6 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                >
                  <h3 className="text-4xl font-light mb-2">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h2 
              className="text-3xl lg:text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Para quem é
            </motion.h2>
            <motion.p 
              className="text-lg leading-normal mb-12 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Se você se reconhece aqui, faz sentido a gente conversar:
            </motion.p>
            
            <div className="space-y-4">
              {[
                'Perfil de cliente ideal número um — descreva a dor ou situação',
                'Perfil de cliente ideal número dois — descreva a necessidade',
                'Perfil de cliente ideal número três — descreva o desafio',
                'Perfil de cliente ideal número quatro — descreva o objetivo',
                'Perfil de cliente ideal número cinco — descreva a oportunidade'
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-primary shrink-0 mt-2"></div>
                  <p className="text-base leading-normal text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-lg leading-normal text-muted-foreground mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nosso processo é flexível e adaptável às necessidades de cada projeto.
            </motion.p>
            
            <div className="space-y-8">
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
              ].map((step, index) => (
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
                    <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
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