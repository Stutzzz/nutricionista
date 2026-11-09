# Design — Ana Carla Mascarenhas · Nutricionista

Landing page em **HTML + CSS + JavaScript puro**, com animações em **GSAP** (ScrollTrigger + SplitText).
Pronta para subir no GitHub e publicar na Vercel (site estático, sem build).

- **Design (fonte da verdade para layout, cores e fontes):** Figma › `Nutricionista` › frame `Layout Nutri` (node `228:1055`, 1920 × 7942)
  https://www.figma.com/design/FhQqbprXr2kOo3MFFwSzrY/Nutricionista?node-id=228-1055
- **Referência de animações:** site atual em WordPress/Elementor — https://anacarlanutri.com.br/

---

## 1. Cores

| Token | Valor | Uso |
|---|---|---|
| `--green-900` | `#5A6C51` | Destaque de palavra no hero ("dietas radicais") |
| `--green-700` | `#738967` | Ícones, FAQ aberto, borda do selo de garantia |
| `--green-300` | `#C1CCBB` | Destaque de palavras nos títulos, barrinhas dos rótulos, blobs de fundo (60%) |
| `--green-100` | `#DDDBCA` | Cards "pode fazer sentido para você" |
| `--bg-grad-from` → `--bg-grad-to` | `#7A8369` → `#9BA689` | Fundo verde da página (gradiente horizontal, 92°) |
| `--cream` | `#F8F0E3` | Painéis claros (conteúdo) |
| `--sand` | `#E9DFC9` | Card de contato |
| `--orange` | `#E3783C` | Botão principal, números 01/02/03, barras laterais |
| `--orange-dark` | `#A14817` | Fim do gradiente do bloco atrás do bowl |
| `--ink` | `#2F2E2A` | Botão escuro |
| `--ink-90` | `rgba(47,46,42,.9)` | Texto padrão (variável `preto 90` do Figma) |
| `--ink-80` | `rgba(47,46,42,.8)` | Títulos grandes |
| `--ink-cool` | `rgba(17,23,34,.8)` | Texto dos depoimentos (variável `preto` do Figma) |
| `--white-80/90` | `rgba(255,255,255,.8/.9)` | Texto sobre o verde |
| `--star` | `#EB9A2A` | Estrelas das avaliações |

## 2. Tipografia

Fontes do Google Fonts: **Sora** (títulos, rótulos, perguntas do FAQ) e **Inter** (texto corrido e botões).

| Estilo | Figma (1920) | Fonte / peso | Altura de linha | CSS (fluido) |
|---|---|---|---|---|
| Display (hero, CTA) | 72px | Sora 600 | 1.1–1.2 | `clamp(40px, 2rem + 2.5vw, 72px)` |
| H2 seção | 60–64px | Sora 400 | 1.2 | `clamp(34px, 1.6rem + 2.2vw, 64px)` |
| H2 menor ("E se eu tiver medo…") | 52px | Sora 400 | 1.1 | `clamp(30px, 1.4rem + 1.7vw, 52px)` |
| H3 banner ("Escolha o seu formato") | 48px | Sora 600 | 1.2 | `clamp(28px, 1.2rem + 1.4vw, 48px)` |
| H3 card | 34–36px | Sora 400 | 1.2 | `clamp(22px, 1rem + 0.9vw, 36px)` |
| Corpo grande | 24px | Inter 300 | 1.4 | `clamp(17px, .9rem + .4vw, 24px)` |
| Corpo | 20–22px | Inter 300 | 1.4–1.5 | `clamp(16px, .85rem + .3vw, 22px)` |
| Corpo pequeno | 18px | Inter 300/400 | 1.5 | `clamp(15px, .85rem + .15vw, 18px)` |
| Rótulo (eyebrow) | 18px | Sora 400, CAIXA ALTA | 1.2 | `clamp(12px, .6rem + .3vw, 18px)` |
| Pergunta FAQ | 26px | Sora 300 | 1.25 | `clamp(17px, .9rem + .45vw, 26px)` |
| Botão | 20–26px | Inter 400 | 1.4 | por variante |

## 3. Layout e espaçamento

- **Canvas:** 1920px. **Conteúdo:** 1720px (100px de margem lateral) → `--container: min(1720px, 100% - 2 * var(--gutter))`.
- **Painéis creme:** 30px de recuo das bordas (1860px), raio de 50px, ficam "por cima" do fundo verde.
  - Painel 1: serviços → por que eu → "E se eu tiver medo". Sobe 56px por cima do hero.
  - Painel 2: FAQ → prova social. O card de contato "vaza" 81px para fora da base do painel.
- **Espaço entre seções** (dentro do painel): ~150px no desktop → `clamp(72px, 8vw, 150px)`.
- **Raios:** 20px (botões, chips), 24px (cards de perfil), 30px (cards, FAQ), 40px (card "medo"), 50px (painéis, foto FAQ), 60px (banner de formatos, contato), 999px (pílulas de destaque).
- **Sombras:** em camadas e bem suaves (estilo "smooth shadow" do Figma), ex.: `0 6px 8px rgba(0,0,0,.1)` nos cards de etapas.

### Breakpoints

| Nome | Largura | O que muda |
|---|---|---|
| Desktop XL | ≥ 1440px | Layout do Figma 1:1 |
| Desktop | 1200–1439px | Mesmo layout, tudo fluido |
| Tablet | 768–1199px | Colunas viram pilha (hero, etapas, sobre, FAQ); cards de perfil em 2 colunas |
| Mobile | < 768px | Tudo em 1 coluna, painéis com recuo de 12px e raio de 32px, depoimentos em carrossel com scroll-snap |

## 4. Componentes

- **Rótulo (eyebrow):** barrinha vertical 6×32px `--green-300` + texto em caixa alta.
- **Destaque de palavra (`.hl`):** pílula atrás de uma ou duas palavras do título (`--green-300`; no hero `--green-900`). Feito com `<span>` + `background` + `box-decoration-break: clone`, para quebrar linha corretamente.
- **Botões**
  - `btn--primary`: laranja, texto branco, sombra laranja difusa (hero).
  - `btn--dark`: `--ink`, texto branco 90%.
  - `btn--glass`: branco 50%, texto escuro (banner de formatos).
  - `btn--outline-light`: borda branca 60% + fundo preto 10% (CTA desconto).
  - `btn--outline-dark`: borda `--ink-90` (contato).
  - Hover: sobe 2px, sombra mais forte e um brilho atravessando o botão.
- **Barra de vidro do hero:** branco 15%, borda branca 60%, `backdrop-filter: blur(7.5px)`, 3 itens (ícone 64px + texto).
- **Card de etapa (01/02/03):** branco, raio 30px, número em Sora 700 68px laranja.
- **Card de perfil:** `--green-100`, raio 24px, ícone 90×90 (quadrado verde com ícone creme), texto Inter 300.
- **Banner de formatos:** gradiente verde, blob claro à direita, painel de vidro com 2 opções (Online / Presencial) e foto de alimentos girada −30°.
- **Item com barra laranja:** barra 4×120px laranja + título Sora 36px + texto.
- **Card "Quem é":** branco, raio 30px, foto 560×500 à esquerda.
- **Selo de garantia:** verde 20% + borda 2px `--green-700`.
- **FAQ (acordeão):** item fechado `rgba(47,46,42,.1)`, hover verde 40%, aberto `--green-700` com texto branco; ícone + / −.
- **Depoimento:** branco, borda 1px preta, raio 30px, avatar 69px, logo do Google, 5 estrelas.
- **Card de contato:** `--sand`, raio 60px, ícones em "folha" verde, divisória laranja 2×160px e ilustração de mesa em traço.

## 5. Seções (ordem da página)

1. **Hero** (verde) — rótulo, H1 "Transforme sua saúde e o seu corpo sem **dietas radicais**", texto, botão laranja, barra de vidro com 3 diferenciais, foto da Ana Carla à direita, logo circular no canto.
2. **Etapas** (painel 1) — "Um cuidado completo, do diagnóstico ao **acompanhamento**" + 3 cards 01/02/03.
3. **Para quem é** — "Este **acompanhamento** pode fazer sentido para você se…" + 4 cards com ícones.
4. **Formatos** — banner "Escolha o Seu Formato de Atendimento" + Online / Presencial + WhatsApp.
5. **Por que comigo** — rótulo "Ana Carla Nutricionista", "Por que fazer seu acompanhamento **comigo?**", 2 diferenciais, card "Quem é Ana Carla", experiência profissional e botão escuro.
6. **Garantia** — "E se eu tiver medo de o tratamento não **funcionar?**", texto e selo, salada saindo do card.
7. **CTA desconto** (verde) — "Dê o primeiro passo com 10% de desconto".
8. **FAQ** (painel 2) — 4 perguntas + foto no consultório.
9. **Prova social** — "O impacto de uma nutrição sem **julgamentos**", bowl sobre bloco laranja, 3 depoimentos.
10. **Contato + rodapé** — e-mail, Instagram, telefone, nome, CRN, botão e ilustração; copyright.

> Observação: os textos foram copiados do Figma. Corrigi apenas os erros de digitação óbvios ("com comigo" → "comigo", "na funcionar" → "não funcionar"). Os 3 depoimentos do Figma são iguais ("Andre Vieira") e servem de modelo: trocar pelos depoimentos reais.

## 6. Links

- Todos os botões "Agendar minha avaliação nutricional" e "Falar com a Equipe no WhatsApp" → `https://wa.me/5567981427713` (mesmo link do site atual), abrindo em nova aba.
- E-mail → `mailto:anacarlarg@hotmail.com` · Instagram → `https://instagram.com/anacarlanutri` · Telefone → `tel:+5567981427713`.

## 7. Animações (GSAP 3.13 + ScrollTrigger + SplitText)

Baseadas no site atual, com alguns extras no mesmo estilo:

| Onde | Animação | Origem |
|---|---|---|
| Títulos (`[data-split]`) | Letras entram de baixo (y 40), com desfoque 20px → 0, opacidade 0 → 1, 1s, `power3.out`, stagger 0.02 em ordem aleatória, dispara em `top 80%` | **Igual ao WP** (`.textoAnimado`) |
| Barrinhas dos rótulos e barras laranjas (`[data-bar]`) | Crescem de baixo para cima (`scaleY 0 → 1`), 0.8s, curva `expo.out` | **Igual ao WP** (`.custom-border-left`) |
| Cards 01/02/03 | Deslizam na horizontal conforme o scroll (scrub), cada um numa velocidade (2, 4, 6) | **Igual ao WP** (Motion Effects → translateX) |
| FAQ | Abre/fecha com altura animada, um aberto por vez, ícone + / − | **Igual ao WP** |
| Destaque de palavra (`.hl`) | A pílula "pinta" da esquerda para a direita logo depois do texto | Extra |
| Hero (ao carregar) | Sequência: rótulo → título → texto → botão → barra de vidro (stagger) → foto sobe com fade → logo gira entrando | Extra |
| Blocos (`[data-reveal]`) | Fade + subida de 40px, em stagger quando são grupos (cards) | Extra |
| Fotos (`[data-parallax]`) | Leve parallax vertical no scroll (foto de alimentos, salada, bowl) | Extra |
| Bowl da prova social | Gira devagar conforme o scroll | Extra |
| Blobs de fundo | Parallax sutil | Extra |

Regras:
- **`prefers-reduced-motion: reduce`** → nenhuma animação, tudo visível.
- Se o GSAP não carregar, o conteúdo aparece normalmente (a classe `.js-anim` só é aplicada quando o GSAP existe).
- Animar apenas `transform`, `opacity` e `filter` (performance).
- Libs via CDN jsDelivr com versão fixa (`gsap@3.13.0`).

## 8. Assets

Exportados do Figma e otimizados (PNG → WebP, redimensionados para o tamanho de exibição em telas retina — de ~16 MB para ~570 KB):

```
assets/
  img/   ana-carla-hero.webp, ana-carla-sobre.webp, ana-carla-consultorio.webp,
         formatos-alimentos.webp, salada-mao.webp, bowl-salada.webp,
         avatar-andre.webp, google.webp, logo-ana-carla.svg, ilustracao-mesa.svg,
         blob-1.svg … blob-6.svg (formas de fundo dos painéis), blob-formatos.svg,
         favicon.svg, og-image.jpg (imagem de compartilhamento 1200×630)
  icons/ hero-heart.svg, hero-leaf.svg, hero-broccoli.svg, beef-off.svg, battery-charging.svg,
         heart.svg, chart.svg, telenutricao.svg, presencial.svg, stars.svg, contato-*.svg
figma-export/   PNGs originais exportados do Figma (fora do Git e da Vercel)
```

Os blobs de fundo foram separados em arquivos individuais (em vez de um SVG gigante por painel) para não distorcerem quando a altura da página muda no responsivo.

## 9. Estrutura de arquivos e deploy

```
index.html
css/style.css
js/main.js
assets/…
design.md
vercel.json      (cache longo para /assets)
```

**Ver localmente:** `python3 -m http.server 5173` dentro da pasta e abrir http://127.0.0.1:5173 (ou abrir o `index.html` direto no navegador).

**Deploy:** criar o repositório no GitHub, subir a pasta e importar na Vercel (Framework preset: *Other*, sem build command, output = raiz). Depois de publicar, trocar `og:image` no `<head>` pela URL completa (ex.: `https://seudominio.com.br/assets/img/og-image.jpg`).

## 10. Acessibilidade e SEO

- HTML semântico (`header`, `main`, `section` com `aria-labelledby`, `footer`), um único `h1`.
- `alt` descritivo nas fotos; ícones decorativos com `alt=""`.
- FAQ com `<button aria-expanded>` + `aria-controls`.
- SplitText com `aria: "auto"` (leitores de tela leem a frase inteira).
- Contraste: texto escuro 90% sobre creme; branco 80–90% sobre verde.
- `<title>`, `meta description`, Open Graph e `lang="pt-BR"`.
