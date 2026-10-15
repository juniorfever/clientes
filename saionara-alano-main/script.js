/* Saionara Alano | kit Escalada do Comer
   Ano do rodapé, revelação ao rolar, barra de compra no celular e FAQ. */

(function () {
  'use strict';

  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // o conteúdo só nasce escondido se o JS estiver vivo para revelá-lo
  if (!reduz && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-rv');
  }

  // ano automático no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

  // revelação suave das seções
  var alvos = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduz) {
    Array.prototype.forEach.call(alvos, function (el) { el.classList.add('is-in'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(alvos, function (el) { obs.observe(el); });
  }

  // barra de compra: aparece depois do hero, sai quando o card de oferta está na tela
  var barra = document.getElementById('buybar');
  var hero = document.getElementById('topo');
  var oferta = document.getElementById('oferta');

  if (barra && hero && 'IntersectionObserver' in window) {
    var passouHero = false;
    var vendoOferta = false;

    var pintar = function () {
      barra.classList.toggle('is-on', passouHero && !vendoOferta);
    };

    new IntersectionObserver(function (entradas) {
      passouHero = !entradas[0].isIntersecting;
      pintar();
    }, { threshold: 0, rootMargin: '-40% 0px 0px 0px' }).observe(hero);

    if (oferta) {
      new IntersectionObserver(function (entradas) {
        vendoOferta = entradas[0].isIntersecting;
        pintar();
      }, { threshold: 0.25 }).observe(oferta);
    }
  }

  // FAQ: só uma pergunta aberta por vez
  var itens = document.querySelectorAll('.faq-item');
  Array.prototype.forEach.call(itens, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(itens, function (outro) {
        if (outro !== item) outro.open = false;
      });
    });
  });
})();
