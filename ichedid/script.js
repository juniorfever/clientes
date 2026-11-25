// Regra desta pagina: nada aparece POR CAUSA do JS.
// Todo estado final e o padrao no CSS; o JS acrescenta movimento e a galeria.
// Sem JS, com JS quebrado ou com movimento reduzido, o site continua inteiro.

(function () {
  'use strict';

  var doc = document;
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temIO = 'IntersectionObserver' in window;

  /* ====== GALERIA EM SLIDE ============================================ */
  var gatilhos = [].slice.call(doc.querySelectorAll('.cena[data-abre]'));
  var caixa = doc.getElementById('slide');

  if (caixa && gatilhos.length) {
    var fig = caixa.querySelector('.slide-palco img');
    var conta = caixa.querySelector('.slide-conta b');
    var total = caixa.querySelector('.slide-conta u');
    var fecha = caixa.querySelector('.slide-fecha');
    var ant = caixa.querySelector('.slide-nav.ant');
    var prox = caixa.querySelector('.slide-nav.prox');
    var atual = 0, quemAbriu = null;

    var acervo = gatilhos.map(function (b) {
      var im = b.querySelector('img');
      return { src: im.getAttribute('src'), alt: im.getAttribute('alt') || '' };
    });
    if (total) total.textContent = acervo.length;

    var mostrar = function (i) {
      atual = (i + acervo.length) % acervo.length;
      fig.classList.add('trocando');
      window.setTimeout(function () {
        fig.src = acervo[atual].src;
        fig.alt = acervo[atual].alt;
        fig.classList.remove('trocando');
      }, quieto ? 0 : 180);
      if (conta) conta.textContent = atual + 1;
    };

    var teclado = function (e) {
      if (e.key === 'Escape') fechar();
      else if (e.key === 'ArrowRight') mostrar(atual + 1);
      else if (e.key === 'ArrowLeft') mostrar(atual - 1);
      else if (e.key === 'Tab') {
        var foco = [fecha, ant, prox];
        var i = foco.indexOf(doc.activeElement);
        e.preventDefault();
        foco[(i + (e.shiftKey ? -1 : 1) + foco.length) % foco.length].focus();
      }
    };

    var abrir = function (i, origem) {
      quemAbriu = origem || null;
      caixa.hidden = false;
      mostrar(i);
      requestAnimationFrame(function () { caixa.classList.add('aberto'); });
      doc.body.style.overflow = 'hidden';
      fecha.focus();
      doc.addEventListener('keydown', teclado);
    };

    var fechar = function () {
      caixa.classList.remove('aberto');
      doc.body.style.overflow = '';
      doc.removeEventListener('keydown', teclado);
      window.setTimeout(function () { caixa.hidden = true; }, 320);
      if (quemAbriu) quemAbriu.focus();
    };

    gatilhos.forEach(function (b, i) {
      b.addEventListener('click', function () { abrir(i, b); });
    });
    fecha.addEventListener('click', fechar);
    ant.addEventListener('click', function () { mostrar(atual - 1); });
    prox.addEventListener('click', function () { mostrar(atual + 1); });
    caixa.addEventListener('click', function (e) { if (e.target === caixa) fechar(); });

    // arrastar no celular
    var x0 = null;
    caixa.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    caixa.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 48) mostrar(atual + (d < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* ====== eco do menu ================================================= */
  doc.querySelectorAll('.nav a em').forEach(function (s) {
    s.setAttribute('data-eco', s.textContent);
  });

  if (quieto) return;

  /* ====== entrada unica do portal ===================================== */
  var portal = doc.querySelector('.portal');
  if (portal) {
    portal.setAttribute('data-entrar', '');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        portal.removeAttribute('data-entrar');
        portal.setAttribute('data-entrou', '');
      });
    });
  }

  /* ====== linha do tempo e fio que se tracam ========================== */
  if (temIO) {
    var ob = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target.classList.contains('trilha') ? 'corre' : 'tracado');
        ob.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0.08 });
    doc.querySelectorAll('.trilha, .fio').forEach(function (t) { ob.observe(t); });
  }

  /* ====== topo e parallax ============================================= */
  var topo = doc.getElementById('topo');
  var barra = doc.querySelector('.progresso i');
  var ultimo = window.scrollY;

  // no celular o parallax treme junto com a rolagem por toque: fica so no desktop
  var cenas = window.innerWidth < 900 ? [] : [].slice.call(doc.querySelectorAll('.cena[data-par]'));
  var alvo = [];

  function medir() {
    var vh = window.innerHeight;
    cenas.forEach(function (c, i) {
      var r = c.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) { alvo[i] = null; return; }
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      var forca = parseFloat(c.getAttribute('data-par')) || 0.12;
      // teto baixo: deslocamento grande faz imagens vizinhas parecerem passar
      // uma por cima da outra, mesmo sem encostar
      alvo[i] = Math.max(-5, Math.min(5, p * forca * 100));
    });
  }

  function pintar() {
    cenas.forEach(function (c, i) {
      if (alvo[i] === null || alvo[i] === undefined) return;
      var m = c.firstElementChild;
      if (m) m.style.transform = 'translate3d(0,calc(-50% + ' + alvo[i].toFixed(2) + '%),0)';
    });
  }

  var pedido = false;
  function aoRolar() {
    var y = window.scrollY;
    if (topo) {
      topo.classList.toggle('vestido', y > 24);
      topo.classList.toggle('recolhido', y > 320 && y > ultimo);
      ultimo = y;
    }
    if (barra) {
      var t = doc.documentElement.scrollHeight - window.innerHeight;
      barra.style.width = (t > 0 ? (y / t) * 100 : 0) + '%';
    }
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(function () { medir(); pintar(); pedido = false; });
  }

  medir(); pintar(); aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', function () { medir(); pintar(); }, { passive: true });

  /* ====== particulas ================================================== */
  var tela = doc.querySelector('.particulas');
  if (!tela) return;

  var ctx = tela.getContext('2d');
  var pontos = [], larg = 0, alt = 0, vivo = true;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function dimensionar() {
    var r = tela.getBoundingClientRect();
    larg = r.width; alt = r.height;
    tela.width = Math.round(larg * dpr);
    tela.height = Math.round(alt * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var quantos = Math.round(Math.min(78, (larg * alt) / 16000));
    pontos = [];
    for (var i = 0; i < quantos; i++) {
      pontos.push({
        x: Math.random() * larg, y: Math.random() * alt,
        r: 0.6 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.13,
        vy: -0.05 - Math.random() * 0.14,
        o: 0.1 + Math.random() * 0.3
      });
    }
  }

  function quadro() {
    if (!vivo) return;
    ctx.clearRect(0, 0, larg, alt);
    for (var i = 0; i < pontos.length; i++) {
      var p = pontos[i];
      p.x += p.vx; p.y += p.vy;
      if (p.y < -8) { p.y = alt + 8; p.x = Math.random() * larg; }
      if (p.x < -8) p.x = larg + 8;
      if (p.x > larg + 8) p.x = -8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(111,189,181,' + p.o + ')';
      ctx.fill();
    }
    requestAnimationFrame(quadro);
  }

  dimensionar();
  window.addEventListener('resize', dimensionar, { passive: true });
  quadro();

  if (temIO && portal) {
    new IntersectionObserver(function (es) {
      var dentro = es[0].isIntersecting;
      if (dentro && !vivo) { vivo = true; quadro(); }
      else if (!dentro) { vivo = false; }
    }, { threshold: 0 }).observe(portal);
  }
})();
