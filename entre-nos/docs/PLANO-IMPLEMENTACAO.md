# Plano de implementação — Entre Nós

Modelo escolhido: **site com vendas e inscrições online**, pagamento integral,
endereço gratuito, WhatsApp como canal de dúvidas e reservas assistidas,
menor custo possível.

---

## Decisão de arquitetura

Em vez de montar o site em um construtor com mensalidade, este projeto é
**código próprio e estático** — você desenvolve no VS Code e hospeda de graça.
O checkout fica com uma plataforma de ingressos, que já resolve pagamento,
emissão e controle de vagas sem mensalidade.

```
  Instagram (bio)
        ↓
  Site estático (GitHub Pages / Netlify — R$ 0)
        ↓
  ┌─────────────┴─────────────┐
  Sympla (checkout)      WhatsApp (dúvidas,
  Pix e cartão            reservas assistidas,
  controle de vagas       propostas personalizadas)
```

**Custo fixo: R$ 0.** O único custo é variável, por venda, na plataforma de
ingressos. Domínio próprio é opcional e pode vir depois (~R$ 40/ano em `.com.br`).

> Confirme no painel da plataforma, antes de publicar, a taxa de serviço, a taxa
> de processamento por forma de pagamento e **quanto você recebe líquido** por
> ingresso de R$ 99,90. Verifique também se a taxa é repassada à participante.

---

## Etapa 1 — Preparar a identidade
- [ ] Separar o arquivo **original** do logo Entre Nós (não recriar)
- [ ] Selecionar 8 a 12 fotos reais: taças, materiais, mesa preparada, mãos, pessoas
- [ ] Otimizar as fotos (1200–1600px de largura, `.webp` ou `.jpg`, até ~300 KB)
- [ ] Definir WhatsApp comercial e @ do Instagram

## Etapa 2 — Montar o site
- [ ] Abrir o projeto no VS Code
- [ ] Preencher `assets/js/config.js` (WhatsApp, Instagram)
- [ ] Trocar `logo-placeholder.svg` pelo logo original
- [ ] Trocar as fotos de `assets/img/referencia/` pelas fotos reais
      (mesmos nomes de arquivo; a tabela está no README, seção 2.3)
- [ ] Revisar textos de cada uma das 5 páginas
- [ ] Testar no DevTools em 390px de largura

## Etapa 3 — Cadastrar o primeiro evento
- [ ] Criar conta de organizadora na plataforma de ingressos
- [ ] Cadastrar "Pintura de Taças — Uma experiência Entre Nós"
- [ ] Data 07/11/2026, 16h–19h, Seletto Garden, Sapucaia do Sul/RS
- [ ] Ingresso R$ 99,90, limite de 20 vagas
- [ ] Ativar Pix e cartão; conferir o valor líquido por ingresso
- [ ] Preencher os dados bancários para repasse
- [ ] Escrever a política de cancelamento no cadastro do evento

## Etapa 4 — Conectar
- [ ] Copiar o link público do evento
- [ ] Colar em `linkCompraEvento` no `config.js`
- [ ] Conferir que o botão "Reservar minha vaga" leva ao checkout
- [ ] Conferir o botão flutuante do WhatsApp em todas as páginas

## Etapa 5 — Publicar
- [ ] Subir o projeto para o GitHub
- [ ] Ativar GitHub Pages (Settings → Pages → branch `main` / root)
- [ ] Abrir o endereço gratuito no celular e navegar por tudo
- [ ] Colocar o link na bio do Instagram

## Etapa 6 — Testar antes de divulgar
- [ ] Fazer uma compra-teste (ou simulação) de ponta a ponta
- [ ] Confirmar que o e-mail/ingresso chega para a participante
- [ ] Confirmar que a inscrição aparece no seu painel
- [ ] Testar cada formulário (deve abrir o WhatsApp preenchido)
- [ ] Checar a página em 3G simulado (tempo de carregamento)
- [ ] Conferir textos, preço, data, local e horário uma última vez

---

## Checklist de lançamento (o resumo)

- [ ] Logo original no site
- [ ] Fotos reais no lugar das fotos de banco de imagens
- [ ] WhatsApp e Instagram preenchidos no `config.js`
- [ ] Evento cadastrado com 20 vagas e pagamento integral
- [ ] Link real de compra conectado ao botão
- [ ] Taxas conferidas e valor líquido conhecido
- [ ] Política de cancelamento publicada
- [ ] Testado no celular, de verdade
- [ ] Link na bio do Instagram

---

## Depois do primeiro evento

- Medir: visitas do site → cliques em reservar → vendas concluídas.
- Se os eventos virarem rotina, avaliar domínio próprio e, mais adiante,
  checkout próprio (Mercado Pago / Stripe) para reduzir a taxa por venda.
- Transformar a Lista VIP em lista real (planilha ou e-mail marketing gratuito).
- Criar as páginas "Sobre nós" e "Presentes" (vouchers) quando houver demanda.

---

## Pendências que dependem de você

| Item | Onde entra |
|---|---|
| Arquivo original do logo | `assets/img/logo.svg` |
| Fotos reais das experiências | `assets/img/` |
| WhatsApp comercial | `assets/js/config.js` |
| @ do Instagram | `assets/js/config.js` |
| Link do evento na plataforma | `assets/js/config.js` |
| Política de cancelamento | `evento-pintura-tacas.html` + cadastro do evento |
