/* ==========================================================================
   ENTRE NÓS — Comportamentos do site
   1) Menu mobile    2) Links de WhatsApp/Instagram   3) Botão de compra
   4) Revelação ao rolar              5) Formulário -> WhatsApp
   ========================================================================== */

(function () {
  "use strict";
  var CFG = window.ENTRE_NOS || {};

  /* ---------- 1) Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav-principal");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var aberto = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!aberto));
      nav.setAttribute("data-aberto", String(!aberto));
    });
    function fechar() {
      toggle.setAttribute("aria-expanded", "false");
      nav.setAttribute("data-aberto", "false");
    }
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && window.innerWidth < 900) fechar();
    });
    /* Esc fecha o menu e devolve o foco ao botao. */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        fechar();
        toggle.focus();
      }
    });
    /* Toque fora do menu tambem fecha. */
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      fechar();
    });
  }

  /* ---------- 2) Monta links de WhatsApp ---------- */
  function linkWhats(chave) {
    var num = (CFG.whatsapp || "").replace(/\D/g, "");
    var msgs = CFG.mensagens || {};
    var texto = msgs[chave] || msgs.geral || "";
    if (!num) return null;
    return "https://wa.me/" + num + (texto ? "?text=" + encodeURIComponent(texto) : "");
  }

  document.querySelectorAll("[data-whats]").forEach(function (el) {
    var url = linkWhats(el.getAttribute("data-whats") || "geral");
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else {
      el.setAttribute("href", "#");
      el.setAttribute("title", "Configure o WhatsApp em assets/js/config.js");
    }
  });

  /* Instagram */
  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    if (CFG.instagram) {
      el.setAttribute("href", "https://instagram.com/" + CFG.instagram);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      if (el.hasAttribute("data-instagram-texto")) el.textContent = "@" + CFG.instagram;
    }
  });

  /* E-mail */
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (CFG.email) {
      el.setAttribute("href", "mailto:" + CFG.email);
      el.textContent = CFG.email;
      el.closest("[data-email-wrap]") && el.closest("[data-email-wrap]").removeAttribute("hidden");
    }
  });

  /* ---------- 3) Botão de compra do evento ---------- */
  document.querySelectorAll("[data-compra]").forEach(function (el) {
    if (CFG.linkCompraEvento) {
      el.setAttribute("href", CFG.linkCompraEvento);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else {
      var url = linkWhats("evento");
      el.setAttribute("href", url || "#");
      if (url) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      el.textContent = "Reservar pelo WhatsApp";
    }
  });

  /* ---------- 4) Revelação ao rolar ---------- */
  var alvos = document.querySelectorAll(".reveal");
  if (alvos.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (ent) {
        if (ent.isIntersecting) { ent.target.classList.add("is-visivel"); io.unobserve(ent.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    alvos.forEach(function (a) { io.observe(a); });
  } else {
    alvos.forEach(function (a) { a.classList.add("is-visivel"); });
  }

  /* ---------- 5) Formulários enviam para o WhatsApp ----------
     Sem backend: o formulário monta uma mensagem e abre a conversa.
     Quando houver backend/Formspree, troque este bloco pelo envio real.      */
  document.querySelectorAll("form[data-form-whats]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var num = (CFG.whatsapp || "").replace(/\D/g, "");
      if (!num) { alert("WhatsApp não configurado em assets/js/config.js"); return; }

      var titulo = form.getAttribute("data-form-titulo") || "Solicitação pelo site";
      var linhas = ["*" + titulo + "*", ""];
      new FormData(form).forEach(function (valor, campo) {
        if (String(valor).trim() === "") return;
        var label = form.querySelector('[name="' + campo + '"]');
        var nome = label && label.dataset.label ? label.dataset.label : campo;
        linhas.push(nome + ": " + valor);
      });
      linhas.push("", "— enviado pelo site Entre Nós");

      window.open(
        "https://wa.me/" + num + "?text=" + encodeURIComponent(linhas.join("\n")),
        "_blank", "noopener"
      );
    });
  });

  /* ---------- 6) Cabeçalho reage ao rolar ----------
     Uma classe de estado só: o CSS cuida da sombra e da altura.
     rAF para não recalcular layout a cada evento de scroll.             */
  var cabecalho = document.querySelector(".header");
  if (cabecalho) {
    var agendado = false;
    var marcar = function () {
      cabecalho.setAttribute("data-rolado", String(window.scrollY > 8));
      agendado = false;
    };
    window.addEventListener("scroll", function () {
      if (!agendado) { agendado = true; window.requestAnimationFrame(marcar); }
    }, { passive: true });
    marcar();
  }

  /* ---------- 7) Filtro de categorias do catálogo ----------
     Os botões do trilho filtram a grade de verdade. Sem JS a página
     continua mostrando todas as experiências, que é o estado correto. */
  var trilho = document.querySelector("[data-filtros]");
  if (trilho) {
    var itens = [].slice.call(document.querySelectorAll("[data-categoria]"));
    var contagem = document.querySelector("[data-contagem]");
    var vazio = document.querySelector("[data-vazio]");

    var aplicar = function (categoria) {
      var n = 0;
      itens.forEach(function (el) {
        var mostra = categoria === "todas" ||
                     el.getAttribute("data-categoria") === categoria;
        el.hidden = !mostra;
        if (mostra) n++;
      });
      if (contagem) {
        contagem.textContent = n === 1 ? "1 experiência" : n + " experiências";
      }
      if (vazio) vazio.hidden = n > 0;
    };

    trilho.addEventListener("click", function (e) {
      var botao = e.target.closest("[data-filtro]");
      if (!botao) return;
      trilho.querySelectorAll("[data-filtro]").forEach(function (outro) {
        outro.setAttribute("aria-pressed", String(outro === botao));
      });
      aplicar(botao.getAttribute("data-filtro"));
    });
  }

  /* ---------- Marca a página atual no menu ---------- */
  var atual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-principal a").forEach(function (a) {
    if (a.getAttribute("href") === atual) a.setAttribute("aria-current", "page");
  });
})();
