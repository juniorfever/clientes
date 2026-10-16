# Entre Nós — site mobile-first

Projeto estático (HTML + CSS + JS puro), sem build e sem dependências.
Abra no VS Code e comece a editar.

---

## 1. Rodar localmente

Abrir `index.html` direto no navegador já funciona. Para um servidor local:

**Opção A — extensão Live Server (VS Code)**
Instale "Live Server" → clique com o botão direito em `index.html` → *Open with Live Server*.

**Opção B — terminal**
```bash
python3 -m http.server 5173
# depois abra http://localhost:5173
```

Teste sempre no modo celular do DevTools (F12 → ícone de celular → iPhone SE / 390px).

---

## 2. Os 4 ajustes obrigatórios antes de publicar

### 2.1 — WhatsApp, Instagram e link de compra
Tudo em **um arquivo só**: `assets/js/config.js`

```js
whatsapp: "5551999999999",   // 55 + DDD + número, só dígitos
instagram: "entrenos",        // sem @
linkCompraEvento: "",         // cole aqui o link real do Sympla
```

Enquanto `linkCompraEvento` estiver vazio, o botão "Reservar minha vaga"
vira automaticamente um botão de WhatsApp. Nada de link fictício no ar.

### 2.2 — Logo original
Coloque o arquivo **original** do logo em `assets/img/logo.svg` (ou `logo.png`)
e troque as referências a `logo-placeholder.svg`:

```bash
grep -rn "logo-placeholder" *.html
```

Não recrie o logo. O placeholder é só para o site não ficar quebrado.

### 2.3 — Fotos reais
**Hoje o site está com fotos de banco de imagens** (Unsplash), em
`assets/img/referencia/`. Elas existem só para a cliente enxergar o
layout antes de ter as fotos dos encontros — e para você saber que enquadramento
pedir. **Não publique o site com elas.**

**Como trocar pelas fotos reais:** mantenha os mesmos nomes de arquivo e
substitua dentro de `assets/img/referencia/` — nenhum HTML precisa mudar.

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| `hero.jpg` | topo da home | 16:10 (1600×1000) |
| `faixa.jpg` | fundo da frase da marca | 16:10 |
| `evento-tacas.jpg` | agenda e página do evento | 16:10 |
| `exp-pintura-tacas.jpg` | experiência em destaque | 4:3 (1200×900) |
| `exp-ceramica.jpg` | card + bloco "Muito mais do que um evento" | 4:3 |
| `exp-telas.jpg` | card de pintura em telas | 4:3 |
| `exp-encontros.jpg` | card de encontros temáticos | 4:3 |
| `exp-personalizado.jpg` | card de grupos + "vai até você" | 4:3 |
| `exp-empresas.jpg` | card de empresas | 4:3 |
| `og-image.jpg` | miniatura ao compartilhar | 1200×630 |

Formato: `.webp` ou `.jpg`, até ~300 KB cada. As atuais ficam
entre 86 e 292 KB — use isso como teto.

Os SVGs antigos continuam em `assets/img/` como reserva; nenhuma página
aponta mais para eles.

### 2.4 — Textos sensíveis
As duas páginas de documentos já estão escritas, mas têm lacunas marcadas que
dependem de você. Procure por elas assim:

```bash
grep -rn "PENDENTE\|A definir\|A conferir\|A completar" *.html
```

- `politica-privacidade.html` — identificar o controlador (nome
  ou razão social, CNPJ/CPF e endereço de contato). A LGPD exige isso.
- `politica-cancelamento.html` — definir os prazos [X] e [Y], os
  percentuais de devolução e o prazo de reembolso. Precisam ser **idênticos**
  aos cadastrados na plataforma de ingressos.
- Taxas da plataforma: confira no painel o valor líquido por ingresso e se a
  taxa de serviço é devolvida em cancelamento pela participante.
- Cidade/local e horários em `agenda.html` e `evento-pintura-tacas.html`.

---

## 3. Estrutura de arquivos

```
entre-nos-site/
├── index.html                   Início
├── agenda.html                  Agenda e inscrições
├── evento-pintura-tacas.html    Página do primeiro evento
├── experiencias.html            Nossas experiências
├── leve-entre-nos.html          Experiências personalizadas (formulário)
├── contato.html                 Contato e Lista VIP (formulário)
├── politica-cancelamento.html   Cancelamento e remarcação
├── politica-privacidade.html    Privacidade / LGPD
├── assets/
│   ├── css/tokens.css           ← paleta, tipografia, espaçamento
│   ├── css/styles.css           ← componentes e layout
│   ├── js/config.js             ← WhatsApp / Instagram / link de compra
│   ├── js/main.js               ← menu, links, formulários, animações
│   └── img/                     placeholders em SVG
└── docs/
    ├── IDENTIDADE-VISUAL.md     paleta, tipografia, regras de uso
    ├── CONTEUDO.md              todos os textos da marca em markdown
    └── PLANO-IMPLEMENTACAO.md   checklist de lançamento
```

---

## 4. Adicionar um novo evento

1. Abra `agenda.html`.
2. Copie o bloco `<article class="evento"> … </article>` do primeiro evento.
3. Troque imagem, título, data, horário, local, vagas e preço.
4. Evento esgotado:
   ```html
   <span class="evento__selo evento__selo--esgotado">Esgotado</span>
   ...
   <span class="btn btn--contorno btn--bloco" aria-disabled="true">Indisponível</span>
   ```
5. Para uma página própria, duplique `evento-pintura-tacas.html`.

---

## 5. Formulários

Site estático não envia e-mail. Os formulários montam uma mensagem e abrem o
WhatsApp já preenchido (`data-form-whats` em `main.js`).

Quer receber por e-mail depois? Troque o `<form>` por um serviço gratuito:
- **Formspree** — `action="https://formspree.io/f/SEU_ID" method="POST"`
- **Google Forms** embutido em `<iframe>`

Nenhum dado é armazenado neste site hoje.

---

## 6. Publicar de graça

| Opção | Como |
|---|---|
| **GitHub Pages** | suba o repositório → Settings → Pages → branch `main` / root |
| **Netlify Drop** | arraste a pasta em app.netlify.com/drop |
| **Cloudflare Pages** | conecte o repositório, sem comando de build |

Todas dão um endereço gratuito. Domínio próprio pode vir depois.

---

## 7. O que este projeto **não** inclui

- Checkout próprio: o pagamento acontece na plataforma de ingressos (Sympla),
  via o link em `config.js`.
- Controle de vagas: é a plataforma de ingressos que controla.
- Backend, banco de dados ou login.
