import { Target, Lightbulb, Palette, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { ServicesSection } from '../components/blocks/services-section';
import { CTASection } from '../components/blocks/cta-section';

export default function Servicos() {
  const mainServices = [
    {
      icon: Target,
      title: 'Gestão de Marca',
      description: 'Marca não é um projeto pontual. É um sistema em operação.\n\nSua empresa estrutura a marca como um ativo estratégico, organizando posicionamento, linguagem e tomada de decisão ao longo do tempo.\n\nGarantimos consistência entre o que a marca diz, faz e entrega — sustentando valor, reconhecimento e crescimento de forma contínua.'
    },
    {
      icon: Lightbulb,
      title: 'Design Thinking',
      description: 'Usamos o design como método de pensamento — não como estética.\n\nInvestigamos contextos, revelamos problemas reais de marca e negócio e organizamos decisões com base em estratégia, não em suposições.\n\nTransformamos complexidade em clareza para construir soluções que funcionam no mundo real — não apenas em apresentações.'
    },
    {
      icon: Palette,
      title: 'Design Comercial',
      description: 'A marca precisa funcionar onde o negócio acontece.\n\nNo material de vendas, nas campanhas, no digital e em cada ponto de contato com o cliente, o design sustenta o posicionamento e orienta a decisão.\n\nLevamos a estratégia até a execução, garantindo consistência, clareza e impacto.'
    },
    {
      icon: Cpu,
      title: 'Produtos Digitais',
      description: 'Produtos digitais são pontos ativos da marca em operação.\n\nDesenvolvemos interfaces, plataformas e experiências que conectam estratégia, usabilidade e negócio — transformando interação em valor.\n\nCada produto é pensado para performar, escalar e reforçar a marca em todos os níveis de uso.'
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
              Branding não precisa ser complicado. Precisa ser bem feito. Oferecemos um conjunto integrado de soluções para organizar marca, posicionamento e comunicação de empresas que precisam crescer com clareza.
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
              Marca não é logo. É a leitura que o mercado faz do seu negócio.
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Se essa leitura está confusa, o problema não é de design — é de direção. E quando falta direção, sobra retrabalho, comunicação desconexa e oportunidade perdida.
            </motion.p>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                O trabalho da sua empresa é dar estrutura para que a marca:
              </p>
              <ul className="space-y-3 text-lg text-muted-foreground ml-6">
                <li>• diga o que precisa dizer, sem ruído</li>
                <li>• se mantenha coerente nos pontos de contato que importam</li>
                <li>• sustente o crescimento em vez de travar por falta de organização</li>
                <li>• ajude o negócio a tomar decisões melhores sobre comunicação, presença e experiência</li>
              </ul>
            </motion.div>

            <motion.p
              className="text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Nosso jeito de trabalhar não parte de fórmulas prontas. Parte do negócio como ele é — com suas limitações, seu contexto e seus objetivos reais. Isso muda tudo.
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
            <div className="space-y-8 mt-12">
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
        title="O mercado não espera a sua marca ficar pronta."
        description="Enquanto o negócio cresce, o público muda e a concorrência se movimenta, a marca ou acompanha ou atrasa. Sua empresa ajuda a manter isso organizado — com estratégia clara, design que funciona e aplicação que o negócio consegue sustentar."
        buttonText="Vamos conversar sobre a sua marca"
        buttonHref="/contato"
      />
    </div>
  );
}