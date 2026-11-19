(function () {
  'use strict';

  // menu em tela cheia (celular)
  var menu = document.getElementById('menu');
  var abrir = document.querySelector('[data-menu-open]');
  var fechar = document.querySelector('[data-menu-close]');

  function setMenu(aberto) {
    if (!menu) return;
    menu.setAttribute('data-open', aberto ? 'true' : 'false');
    menu.setAttribute('aria-hidden', aberto ? 'false' : 'true');
    document.body.style.overflow = aberto ? 'hidden' : '';
    if (aberto) {
      var alvo = menu.querySelector('a');
      if (alvo) alvo.focus();
    } else if (abrir) {
      abrir.focus();
    }
  }

  if (abrir) abrir.addEventListener('click', function () { setMenu(true); });
  if (fechar) fechar.addEventListener('click', function () { setMenu(false); });
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.getAttribute('data-open') === 'true') setMenu(false);
  });

  // revelação ao rolar
  var alvos = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !alvos.length) {
    Array.prototype.forEach.call(alvos, function (el) { el.classList.add('is-in'); });
    return;
  }
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        obs.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  Array.prototype.forEach.call(alvos, function (el) { obs.observe(el); });
})();

/* ---------- visualizador de imagem ---------- */
(function () {
  'use strict';

  var figs = Array.prototype.slice.call(document.querySelectorAll('.gal figure'));
  if (!figs.length) return;

  // caixa do visualizador, criada uma vez
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('data-open', 'false');
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Imagem ampliada');
  lb.innerHTML =
    '<span class="lb__cont" data-lb-cont></span>' +
    '<button class="lb__x" data-lb-x aria-label="Fechar">&times;</button>' +
    '<button class="lb__prev" data-lb-prev aria-label="Imagem anterior">&#8592;</button>' +
    '<button class="lb__next" data-lb-next aria-label="Próxima imagem">&#8594;</button>' +
    '<figure class="lb__fig">' +
      '<img class="lb__img" data-lb-img alt="">' +
      '<figcaption class="lb__cap"><b data-lb-t></b><span data-lb-tipo></span></figcaption>' +
    '</figure>';
  document.body.appendChild(lb);

  var elImg = lb.querySelector('[data-lb-img]');
  var elT = lb.querySelector('[data-lb-t]');
  var elTipo = lb.querySelector('[data-lb-tipo]');
  var elCont = lb.querySelector('[data-lb-cont]');
  var atual = 0;
  var devolverFoco = null;

  function visiveis() {
    return figs.filter(function (f) { return !f.hidden; });
  }

  function mostrar(lista, i) {
    if (!lista.length) return;
    atual = (i + lista.length) % lista.length;
    var f = lista[atual];
    var img = f.querySelector('img');
    var t = f.querySelector('.gal__t');
    var tipo = f.querySelector('.gal__tipo');
    elImg.src = img.getAttribute('src');
    elImg.alt = img.getAttribute('alt') || '';
    elT.textContent = t ? t.textContent : '';
    elTipo.textContent = tipo ? tipo.textContent : '';
    elCont.textContent = (atual + 1) + ' / ' + lista.length;
  }

  var lista = [];

  function abrir(f, origem) {
    lista = visiveis();
    var i = lista.indexOf(f);
    if (i < 0) return;
    devolverFoco = origem || null;
    mostrar(lista, i);
    lb.setAttribute('data-open', 'true');
    document.body.setAttribute('data-lb', 'true');
    lb.querySelector('[data-lb-x]').focus();
  }

  function fechar() {
    lb.setAttribute('data-open', 'false');
    document.body.removeAttribute('data-lb');
    elImg.removeAttribute('src');
    if (devolverFoco) { devolverFoco.focus(); devolverFoco = null; }
  }

  function passar(d) { mostrar(lista, atual + d); }

  // botao de abrir em cada foto, sem perder o alt da imagem
  figs.forEach(function (f) {
    var caixa = f.querySelector('.gal__img');
    if (!caixa) return;
    var img = caixa.querySelector('img');
    var t = f.querySelector('.gal__t');
    var b = document.createElement('button');
    b.className = 'gal__btn';
    b.type = 'button';
    b.setAttribute('aria-label', 'Ampliar' + (t ? ': ' + t.textContent : ''));
    caixa.appendChild(b);
    b.addEventListener('click', function () { abrir(f, b); });
    if (img) img.setAttribute('draggable', 'false');
  });

  lb.querySelector('[data-lb-x]').addEventListener('click', fechar);
  lb.querySelector('[data-lb-prev]').addEventListener('click', function () { passar(-1); });
  lb.querySelector('[data-lb-next]').addEventListener('click', function () { passar(1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb__fig')) fechar();
  });

  document.addEventListener('keydown', function (e) {
    if (lb.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') { e.preventDefault(); fechar(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); passar(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); passar(1); }
    else if (e.key === 'Tab') {
      // mantem o foco dentro do visualizador
      var fc = lb.querySelectorAll('button');
      var pri = fc[0], ult = fc[fc.length - 1];
      if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
      else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
    }
  });
})();
