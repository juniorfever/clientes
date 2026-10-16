# Identidade visual — Entre Nós

Consolidado do projeto. Os valores vivem em código em `assets/css/tokens.css`.

## Posicionamento

**Entre Nós — experiências que aproximam.**
Marca de experiências presenciais criativas: oficinas, encontros temáticos e
celebrações para grupos. A promessa não é "participar de um evento", é
**viver um momento especial e levar uma lembrança para casa**.

Assinatura curta: *Você reúne as suas. Nós criamos o momento.*

Tom de voz: acolhedor, elegante, direto. Fala com a pessoa ("você"), convida
sem pressionar, evita jargão de marketing e exclamações em excesso.

## Paleta

| Papel | Nome | Hex | Variável CSS |
|---|---|---|---|
| Fundo principal | Creme | `#FBF7F1` | `--cor-creme` |
| Fundo alternado | Creme 2 | `#F5EDE2` | `--cor-creme-2` |
| Cards / bordas suaves | Bege | `#EFE3D4` | `--cor-bege` |
| Divisores | Bege escuro | `#DCC9B2` | `--cor-bege-escuro` |
| Títulos e texto | Marrom | `#4A3429` | `--cor-marrom` |
| Texto secundário | Marrom claro | `#6B4A38` | `--cor-marrom-claro` |
| Legendas / meta | Marrom suave | `#8A6B57` | `--cor-marrom-suave` |
| Detalhes e filetes | Dourado | `#C9A15C` | `--cor-dourado` |
| Hover do dourado | Dourado escuro | `#A9823F` | `--cor-dourado-escuro` |
| Destaques delicados | Rosa blush | `#E5C1BE` | `--cor-rosa-blush` |
| CTA secundário | Rosa escuro | `#C98E8A` | `--cor-rosa-escuro` |

### Como usar
- **Creme** é o fundo padrão de quase tudo. Bege entra em cards e seções alternadas.
- **Marrom** é a cor do texto e do botão principal. Nunca use dourado para texto corrido.
- **Dourado** é detalhe: filetes, ícones, botão de destaque. Em pouca quantidade, vale mais.
- **Rosa blush** é acento afetivo: selos, flores decorativas, nunca texto pequeno.

### Contraste (acessibilidade)
Combinações validadas:
- Marrom `#4A3429` sobre creme `#FBF7F1` → ~11:1 ✅
- Marrom claro `#6B4A38` sobre creme → ~7:1 ✅
- Marrom suave `#8A6B57` sobre creme → ~4,6:1 ✅ (só para texto ≥16px)
- Dourado `#C9A15C` sobre creme → ~2:1 ❌ — use apenas em filetes, ícones e fundos,
  nunca em texto. Para texto dourado, use `--cor-dourado-escuro` em tamanho grande.
- Creme sobre marrom (botão primário e faixa) → ~11:1 ✅

## Tipografia

**Família única: Outfit** (sem serifa geométrica), no Google Fonts, gratuita para
uso comercial. Carregada no `<head>` de cada página, pesos 300 a 700.
`--fonte-titulo` e `--fonte-corpo` apontam para ela.

| Uso | Peso |
|---|---|
| "ENTRE NÓS" no hero | 600, caixa alta, `letter-spacing: .09em` |
| Títulos de seção (h2, h3) | 500 |
| h1 das páginas internas | 600 |
| Corpo, menus, botões | 400 |
| Subtítulo do hero e citação da faixa | 300 |
| Preços | 600 |

> **Outfit não tem itálico.** Pedir `font-style: italic` faz o navegador inclinar
> a fonte artificialmente, e fica torto. Onde antes havia itálico (subtítulo do
> hero e faixa de citação) a diferença agora vem do **peso 300**. Nunca
> reintroduza itálico sem trocar a família.

Regras:
- Títulos com line-height 1,20 e `letter-spacing` zero — a geométrica já é aberta.
- A escala de corpo é menor que a da serifada anterior: uma sem serifa ocupa mais
  no mesmo tamanho. Os valores estão em `tokens.css`; não aumente sem olhar.
- Eyebrows: caixa alta com `letter-spacing: .20em`.
- Corpo em Outfit 400, 17px, line-height 1,58, largura máxima de 62 caracteres.
- Botões: caixa alta, `letter-spacing: .06em`, altura mínima de 48px.
  Os botões menores dentro dos cards, no celular, usam 44px — que é o piso de
  alvo de toque. **Não descer de 44px** para ganhar altura de página.

## Logo

- Usar **sempre o arquivo original** da marca. Não redesenhar, não recriar,
  não alterar proporções ou cores.
- No repositório: `assets/img/logo.svg` (ou `.png` com fundo transparente).
- Altura no header: 34px no celular. Área de respiro mínima: metade da altura do logo.
- Sobre fundo escuro, usar a versão clara do logo (se existir) ou o fundo creme atrás.
- `assets/img/logo-placeholder.svg` é **apenas um marcador temporário** do projeto
  para o layout não quebrar. Deve ser removido antes de publicar.

## Elementos gráficos

- **Flores delicadas** e ramos finos, em rosa blush ou bege, com opacidade baixa
  (15–55%), nunca competindo com a foto ou o texto.
- **Filete dourado** (`.filete`) como separador abaixo dos títulos: 56px, 1px,
  degradê que nasce e morre em transparente.
- Cantos arredondados suaves: 14px em cards, pílula completa em botões.
- Sombras discretas e marrons, nunca cinza-azulado.

## Fotografia

- Fotos reais dos encontros: taças sendo pintadas, materiais na mesa, mesa
  preparada, mãos trabalhando, pessoas em conversa.
- Luz natural, tons quentes, fundo limpo. Evitar flash direto.
- Proporções: 4:3 para cards, 16:10 para hero e topo de evento.
- Nos heros com texto branco por cima, o CSS já aplica um véu marrom
  (45–62%) para garantir leitura.
- Não usar bancos de imagem de outras marcas ou fotos de concorrentes.

> **Exceção temporária (em vigor agora).** O site está no ar com fotos de
> banco de imagens em `assets/img/referencia/`, a pedido, para a cliente
> enxergar o layout antes de fotografar os encontros. Elas servem também de
> referência de enquadramento, luz e tom. A regra acima continua valendo para
> a publicação: essas fotos saem antes de o site ir ao ar.

## Componentes

| Componente | Classe | Observação |
|---|---|---|
| Botão principal | `.btn .btn--primario` | marrom, ação principal da página |
| Botão de destaque | `.btn .btn--dourado` | CTA de conversão (reservar, Lista VIP) |
| Botão secundário | `.btn .btn--contorno` | ações alternativas |
| Card de experiência | `.card` | imagem 4:3 + título + descrição + botão |
| Card de evento | `.evento` | selo, lista de dados, preço, botões |
| Faixa de citação | `.faixa` | fundo marrom, frase em itálico |
| WhatsApp flutuante | `.whats-float` | fixo, canto inferior direito |
| Filete | `.filete` | separador dourado |
| Eyebrow | `.eyebrow` | rótulo caixa-alta acima do título |

## Grid e respiro

- Largura máxima de conteúdo: 1120px.
- Respiro lateral: 20px no celular, 32px a partir de 768px.
- Escala de espaçamento de 4px (`--e-1` a `--e-9`).
- Breakpoints: 560px (botões em linha), 640px (2 colunas), 900px (menu
  horizontal / 3 colunas), 1100px (display maior).
