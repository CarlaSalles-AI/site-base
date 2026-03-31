import { useState } from 'react';

export default function DesignSystem() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  const isDark = mode === 'dark';
  const primaryColor = isDark ? '#FF6B35' : '#2C5FED';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#F5F5F7] text-[#1A1A1A]'}`}>
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute top-8 left-8 flex gap-3 z-10">
          <button
            onClick={() => setMode('dark')}
            className={`px-5 py-2 text-xs font-medium tracking-wide transition-all border ${
              isDark 
                ? 'bg-[#FF6B35] text-white border-[#FF6B35]' 
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            DARK
          </button>
          <button
            onClick={() => setMode('light')}
            className={`px-5 py-2 text-xs font-medium tracking-wide transition-all border ${
              !isDark 
                ? 'bg-[#2C5FED] text-white border-[#2C5FED]' 
                : 'bg-[#0F0F0F] text-gray-600 border-gray-800'
            }`}
          >
            LIGHT
          </button>
        </div>

        <div className="max-w-6xl">
          <h1 className="text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-none tracking-tighter mb-12 uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            POSICIONAMENTO CLARO.
            <br />
            COMUNICAÇÃO FORTE.
            <br />
            <span style={{ color: primaryColor }}>IMPACTO REAL.</span>
          </h1>

          <div className="max-w-md ml-auto">
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sistema visual premium que equilibra presença editorial forte com clareza comercial estratégica.
            </p>
            <div className={`h-px mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
            <div className={`flex gap-4 text-xs tracking-wider ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
              <span>DARK MODE</span>
              <span>•</span>
              <span>LIGHT MODE</span>
              <span>•</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILOSOFIA VISUAL */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <p className={`text-xs tracking-widest mb-4 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                  001 — ESSÊNCIA
                </p>
                <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                  Filosofia
                  <br />
                  Visual
                </h2>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-16">
              
              {/* Dark Mode */}
              <div className={`border p-10 ${isDark ? 'bg-[#0F0F0F] border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h3 className="text-2xl font-light">Dark Mode</h3>
                </div>
                <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p>
                    Base preta profunda (#0A0A0A) com laranja vibrante (#FF6B35) como destaque principal.
                  </p>
                  <p>
                    Inspirado na presença editorial do Won J You Studio — tipografia monumental, respiro generoso, assimetria controlada.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <span className={`px-4 py-2 text-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>Premium</span>
                    <span className={`px-4 py-2 text-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>Marcante</span>
                    <span className={`px-4 py-2 text-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>Editorial</span>
                  </div>
                </div>
              </div>

              {/* Light Mode */}
              <div className={`border p-10 ${isDark ? 'bg-[#0F0F0F] border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <h3 className="text-2xl font-light">Light Mode</h3>
                </div>
                <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p>
                    Base cinza claro (#F5F5F7) com azul royal (#2C5FED) transmitindo confiança e estratégia.
                  </p>
                  <p>
                    Inspirado na clareza do Yellow Magpie — organização estruturada, hierarquia clara, credibilidade comercial.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <span className={`px-4 py-2 text-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>Estratégico</span>
                    <span className={`px-4 py-2 text-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>Confiável</span>
                    <span className={`px-4 py-2 text-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>Claro</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PALETA DE CORES */}
      <section className={`px-6 py-32 ${isDark ? 'bg-[#0F0F0F]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20">
            <p className={`text-xs tracking-widest mb-4 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
              002 — PALETA
            </p>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-6">
              Sistema de Cores
            </h2>
            <p className={`text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Paleta construída para contraste, legibilidade e impacto visual controlado.
            </p>
          </div>

          {/* Primary Color */}
          <div className="mb-16">
            <h3 className="text-xl mb-8" style={{ color: primaryColor }}>
              Primary — {isDark ? 'Laranja' : 'Azul Royal'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-4">
              {(isDark ? [
                { label: '50', value: '#FFF4F0' },
                { label: '100', value: '#FFE6DC' },
                { label: '200', value: '#FFCDB9' },
                { label: '300', value: '#FFB396' },
                { label: '400', value: '#FF8A5C' },
                { label: '500', value: '#FF6B35' },
                { label: '600', value: '#E6512A' },
                { label: '700', value: '#B33D20' },
                { label: '900', value: '#661F11' },
              ] : [
                { label: '50', value: '#F0F4FF' },
                { label: '100', value: '#DCE7FF' },
                { label: '200', value: '#B9D0FF' },
                { label: '300', value: '#96B9FF' },
                { label: '400', value: '#5C8BFF' },
                { label: '500', value: '#2C5FED' },
                { label: '600', value: '#2047D6' },
                { label: '700', value: '#1837A8' },
                { label: '900', value: '#0D1F61' },
              ]).map(color => (
                <div key={color.label}>
                  <div 
                    className={`aspect-square rounded-sm mb-3 border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-xs font-medium mb-1">{color.label}</p>
                  <p className={`text-xs font-mono ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                    {color.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TIPOGRAFIA */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20">
            <p className={`text-xs tracking-widest mb-4 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
              003 — TYPE
            </p>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">
              Tipografia
            </h2>
          </div>

          <div className="space-y-16">
            
            <div className={`border-b pb-16 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="grid lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <h1 className="text-7xl lg:text-8xl font-light tracking-tight leading-none">
                    Design que
                    <br />
                    transforma
                  </h1>
                </div>
                <div className="lg:col-span-4">
                  <p className={`text-sm font-mono mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Display</p>
                  <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                    72-96px / Light (300) / -0.03em / 1.0
                  </p>
                </div>
              </div>
            </div>

            <div className={`border-b pb-16 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="grid lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <h2 className="text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                    Marcas que conectam e convertem
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  <p className={`text-sm font-mono mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Heading 1</p>
                  <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                    48-60px / Light (300) / -0.02em / 1.1
                  </p>
                </div>
              </div>
            </div>

            <div className={`border-b pb-16 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="grid lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <h3 className="text-3xl lg:text-4xl font-light tracking-tight">
                    Estratégia, design e resultado
                  </h3>
                </div>
                <div className="lg:col-span-4">
                  <p className={`text-sm font-mono mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Heading 2</p>
                  <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
                    32-36px / Light (300) / -0.01em / 1.2
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPONENTES */}
      <section className={`px-6 py-32 ${isDark ? 'bg-[#0F0F0F]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20">
            <p className={`text-xs tracking-widest mb-4 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
              004 — COMPONENTES
            </p>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-6">
              Design System
            </h2>
          </div>

          {/* Buttons */}
          <div className="mb-20">
            <h3 className="text-2xl font-light mb-8">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-8 py-4 text-sm font-medium tracking-wide transition-all hover:opacity-90 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Primary Action
              </button>
              <button
                className="px-8 py-4 text-sm font-medium tracking-wide border transition-all hover:opacity-80"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Secondary Action
              </button>
              <button
                className={`px-8 py-4 text-sm font-medium tracking-wide transition-all hover:opacity-80 ${
                  isDark ? 'bg-[#1A1A1A]' : 'bg-gray-200'
                }`}
              >
                Ghost Button
              </button>
            </div>
          </div>

          {/* Service Cards */}
          <div className="mb-20">
            <h3 className="text-2xl font-light mb-8">Service Cards</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {[
                { number: '01', title: 'Branding Estratégico', description: 'Construímos marcas autênticas que comunicam propósito.' },
                { number: '02', title: 'Design Digital', description: 'Interfaces elegantes que transformam visitantes em clientes.' },
                { number: '03', title: 'Consultoria Visual', description: 'Análise estratégica para marcas que buscam evolução.' }
              ].map((service, i) => (
                <div 
                  key={i}
                  className={`p-8 border transition-all ${isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-[#F5F5F7] border-gray-200'}`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-mono tracking-widest" style={{ color: primaryColor }}>
                      {service.number}
                    </span>
                    <div className={`h-px flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
                  </div>
                  <h4 className="text-xl font-light mb-4 tracking-tight">{service.title}</h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight leading-tight">
            Design System
            <br />
            Completo
          </h2>
          <p className={`text-lg mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Sistema visual premium pronto para aplicação.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="px-10 py-4 text-sm font-medium tracking-wide transition-all hover:opacity-90 text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Aprovar e Aplicar
            </button>
            <button
              className="px-10 py-4 text-sm font-medium tracking-wide border transition-all hover:opacity-80"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Solicitar Ajustes
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}