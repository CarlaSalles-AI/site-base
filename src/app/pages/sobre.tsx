import { motion } from 'motion/react';
import { CTASection } from '../components/blocks/cta-section';

/* ============================================
   📖 SOBRE - PÁGINA INSTITUCIONAL
   ============================================
   
   CUSTOMIZAR:
   1. Título: Linha 19
   2. Textos principais: Linhas 29-49
   3. Estatísticas: Array stats (linhas 54-56)
   4. Seção "Para quem é": Linhas 85-95
   
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
                'A empresa cresceu, mas a marca não acompanhou — e isso já começou a custar negócio',
                'Você investe em comunicação, mas sente que a mensagem não chega do jeito certo',
                'Tem identidade visual, mas nunca parou para organizar o posicionamento por trás dela',
                'Precisa profissionalizar a marca sem perder o que construiu até aqui',
                'Toda decisão de comunicação ainda depende de improviso ou opinião pessoal'
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
              Trabalhamos principalmente com pequenas e médias empresas e negócios em expansão que chegaram num ponto onde crescer sem organizar a marca deixou de ser opção.
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
              Não é um processo rígido — é uma lógica que a gente refinou ao longo de anos, projeto a projeto. O ritmo e a profundidade mudam conforme o que o negócio precisa.
            </motion.p>
            
            <div className="space-y-8">
              {[
                { 
                  title: 'Diagnóstico', 
                  description: 'Olhamos para o momento real da marca: o que funciona, o que destoa, onde está o desalinhamento. Sem achismo.' 
                },
                { 
                  title: 'Direção', 
                  description: 'Definimos o que a marca precisa ser: posicionamento, mensagem central, diferenciação, critérios de coerência. O suficiente para orientar tudo que vem depois.' 
                },
                { 
                  title: 'Expressão', 
                  description: 'Traduzimos a estratégia em linguagem, design, presença — o que o mercado vai ver, ouvir e sentir.' 
                },
                { 
                  title: 'Aplicação', 
                  description: 'Desdobramos nos pontos de contato que mais importam para o negócio. Sem dispersar esforço.' 
                },
                { 
                  title: 'Evolução', 
                  description: 'Acompanhamos, medimos, ajustamos. Marca é organismo vivo — o trabalho não termina na entrega.' 
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
        title="O mercado não espera a sua marca ficar pronta."
        description="Enquanto o negócio cresce, o público muda e a concorrência se movimenta, a marca ou acompanha ou atrasa. Sua empresa ajuda a manter isso organizado — com estratégia clara, design que funciona e aplicação que o negócio consegue sustentar."
        buttonText="Vamos conversar sobre a sua marca"
        buttonHref="/contato"
      />
    </div>
  );
}