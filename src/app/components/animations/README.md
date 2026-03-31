# Animações Premium - Template

Biblioteca de animações inspiradas em sites premium como wonjyou.studio.

## Componentes Disponíveis

### 1. RevealSection
Animação de "cortina" que revela o conteúdo usando clip-path.

```tsx
import { RevealSection } from './animations/reveal-section';

<RevealSection className="my-section">
  <div>Conteúdo que será revelado ao scroll</div>
</RevealSection>
```

**Efeito**: O conteúdo aparece gradualmente de cima para baixo conforme o usuário faz scroll.

---

### 2. SkewSection
Cria efeito de "elasticidade" com skew baseado na velocidade do scroll.

```tsx
import { SkewSection } from './animations/reveal-section';

<SkewSection className="my-section">
  <div>Conteúdo com efeito elástico</div>
</SkewSection>
```

**Efeito**: O elemento inclina suavemente durante o scroll, criando sensação de movimento físico.

---

### 3. MassiveScaleSection
Zoom explosivo - ideal para transições dramáticas.

```tsx
import { MassiveScaleSection } from './animations/reveal-section';

<MassiveScaleSection className="my-section">
  <div>Elemento que crescerá 120x</div>
</MassiveScaleSection>
```

**Efeito**: O elemento cresce de scale 1 até 120, criando transição cinematográfica.

---

### 4. PinParallaxSection
Mantém elemento fixo enquanto o scroll acontece.

```tsx
import { PinParallaxSection } from './animations/reveal-section';

<PinParallaxSection duration={2}>
  <div>Conteúdo que fica "colado" na tela</div>
</PinParallaxSection>
```

**Props**:
- `duration`: Número de telas de altura (padrão: 2)

**Efeito**: O conteúdo permanece visível enquanto usuário scrolla várias telas.

---

### 5. MagneticElement
Elemento que segue o cursor com efeito magnético.

```tsx
import { MagneticElement } from './animations/reveal-section';

<MagneticElement strength={0.3}>
  <button>Hover aqui</button>
</MagneticElement>
```

**Props**:
- `strength`: Intensidade do efeito (padrão: 0.3)

**Efeito**: O elemento se move sutilmente em direção ao cursor.

---

### 6. TextRevealByLine
Revela texto linha por linha.

```tsx
import { TextRevealByLine } from './animations/reveal-section';

<TextRevealByLine 
  text="Linha 1\nLinha 2\nLinha 3"
  delay={0.2}
/>
```

**Props**:
- `text`: String com quebras de linha (\n)
- `delay`: Delay inicial (padrão: 0)

**Efeito**: Cada linha aparece sequencialmente com clip-path.

---

## Exemplos de Uso

### Hero Section com Reveal
```tsx
<RevealSection className="min-h-screen bg-primary">
  <div className="container mx-auto">
    <h1>Hero Title</h1>
    <p>Subtítulo revelado ao scroll</p>
  </div>
</RevealSection>
```

### Quote Section Premium
```tsx
<RevealSection className="section-spacing border-y">
  <motion.blockquote 
    className="text-5xl font-light"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    "Quote impactante aqui"
  </motion.blockquote>
</RevealSection>
```

### Cards com Hover Magnético
```tsx
<div className="grid grid-cols-3">
  {items.map(item => (
    <MagneticElement strength={0.2} key={item.id}>
      <Card>{item.content}</Card>
    </MagneticElement>
  ))}
</div>
```

---

## Tecnologias

- **Motion (Framer Motion)**: Biblioteca de animações React
- **useScroll**: Hook para scroll-triggered animations
- **useTransform**: Mapeia valores de scroll para propriedades CSS
- **useSpring**: Adiciona física realista às animações

---

## Performance

✅ **Todas as animações usam GPU acceleration** (transform, opacity)  
✅ **viewport={{ once: true }}** para animações que rodam apenas 1x  
✅ **will-change** aplicado automaticamente pelo Motion  

---

## Inspiração

Baseado em sites premium como:
- wonjyou.studio (ClipPath reveals, Skew effects)
- awwwards.com winners (Parallax, Magnetic hover)
- Apple.com (Smooth scroll animations)