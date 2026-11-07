/*!
 * Barra de acessibilidade autônoma para sites HTML.
 * Acessibilidade Fácil v1.0.0
 * Autor: BARU-LAB Criações e Inovações
 * Site: https://barulab.com.br
 * Instalação: <script src="acessibilidade.js" defer></script>
 * Licença: MIT
 */
(function () {
  'use strict';

  if (window.__acessibilidadeFacil) return;
  window.__acessibilidadeFacil = true;

  var script = document.currentScript ||
    document.querySelector('script[src*="acessibilidade"]') || document.createElement('script');

  function attr(name, fallback) {
    var v = script.getAttribute('data-' + name);
    return v === null || v === '' ? fallback : v;
  }

  var STORAGE_KEY = 'acessibilidade-facil';
  var FONT_MIN = -3, FONT_MAX = 6, FONT_STEP = 0.1;

  var I18N = {
    'pt-BR': {
      open: 'Abrir acessibilidade BARU-LAB',
      title: 'Acessibilidade BARU-LAB',
      close: 'Fechar',
      fontUp: 'Aumentar texto',
      fontDown: 'Diminuir texto',
      grayscale: 'Escala de cinza',
      highContrast: 'Alto contraste',
      negative: 'Contraste negativo',
      light: 'Fundo claro',
      links: 'Sublinhar links',
      readable: 'Fonte legível',
      animations: 'Pausar animações',
      focus: 'Destacar foco',
      reset: 'Redefinir',
      sitemap: 'Mapa do site',
      help: 'Ajuda',
      feedback: 'Fale conosco',
      skip: 'Pular para o conteúdo',
      on: 'ativado',
      off: 'desativado',
      fontSize: 'Tamanho do texto: {n}%',
      resetDone: 'Configurações de acessibilidade redefinidas'
    },
    'en': {
      open: 'Open accessibility tools',
      title: 'Accessibility tools',
      close: 'Close',
      fontUp: 'Increase text',
      fontDown: 'Decrease text',
      grayscale: 'Grayscale',
      highContrast: 'High contrast',
      negative: 'Negative contrast',
      light: 'Light background',
      links: 'Underline links',
      readable: 'Readable font',
      animations: 'Pause animations',
      focus: 'Highlight focus',
      reset: 'Reset',
      sitemap: 'Sitemap',
      help: 'Help',
      feedback: 'Feedback',
      skip: 'Skip to content',
      on: 'on',
      off: 'off',
      fontSize: 'Text size: {n}%',
      resetDone: 'Accessibility settings reset'
    },
    'es': {
      open: 'Abrir herramientas de accesibilidad',
      title: 'Herramientas de accesibilidad',
      close: 'Cerrar',
      fontUp: 'Aumentar texto',
      fontDown: 'Disminuir texto',
      grayscale: 'Escala de grises',
      highContrast: 'Alto contraste',
      negative: 'Contraste negativo',
      light: 'Fondo claro',
      links: 'Subrayar enlaces',
      readable: 'Fuente legible',
      animations: 'Pausar animaciones',
      focus: 'Resaltar foco',
      reset: 'Restablecer',
      sitemap: 'Mapa del sitio',
      help: 'Ayuda',
      feedback: 'Contacto',
      skip: 'Saltar al contenido',
      on: 'activado',
      off: 'desactivado',
      fontSize: 'Tamaño del texto: {n}%',
      resetDone: 'Configuración de accesibilidad restablecida'
    }
  };

  var langAttr = attr('lang', 'pt-BR');
  var t = I18N[langAttr] || I18N[langAttr.split('-')[0].toLowerCase()] || I18N['pt-BR'];

  var config = {
    position: attr('position', 'bottom-right'),
    color: attr('color', '#1a56db'),
    skipTarget: attr('skip-target', ''),
    skipLink: attr('skip-link', 'true') !== 'false',
    sitemap: attr('sitemap', ''),
    help: attr('help', ''),
    feedback: attr('feedback', '')
  };
  if (!/^#[0-9a-f]{3,8}$|^[a-z]+$|^rgb/i.test(config.color)) config.color = '#1a56db';

  // ---------- Estado ----------
  var DEFAULTS = {
    font: 0,
    grayscale: false,
    contrast: '', // '' | 'high' | 'negative' | 'light'
    links: false,
    readable: false,
    animations: false,
    focus: false
  };

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { s = {}; }
    var out = {};
    for (var k in DEFAULTS) out[k] = k in s ? s[k] : DEFAULTS[k];
    out.font = Math.max(FONT_MIN, Math.min(FONT_MAX, parseInt(out.font, 10) || 0));
    return out;
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* sem armazenamento */ }
  }

  var state = load();
  var root = document.documentElement;
  var HOST_ID = 'acessibilidade-facil';

  // ---------- CSS aplicado à página ----------
  var EXCL = ':not(#' + HOST_ID + ')';
  var pageCss = [
    'html.acf-links a' + EXCL + '{text-decoration:underline!important;}',

    'html.acf-readable body,html.acf-readable body *' + EXCL +
      ':not([class*="icon"]):not([class*="fa-"]):not(.fa):not(.material-icons):not(i)' +
      '{font-family:Arial,Helvetica,"Segoe UI",sans-serif!important;letter-spacing:.01em;}',

    'html.acf-negative,html.acf-negative body,html.acf-negative body *' + EXCL +
      '{background-color:#000!important;color:#fff!important;border-color:#fff!important;box-shadow:none!important;text-shadow:none!important;}',
    'html.acf-negative a' + EXCL + ',html.acf-negative a' + EXCL + ' *{color:#ff0!important;}',
    'html.acf-negative button' + EXCL + ',html.acf-negative input,html.acf-negative select,html.acf-negative textarea' +
      '{border:1px solid #fff!important;}',

    'html.acf-light,html.acf-light body,html.acf-light body *' + EXCL +
      '{background-color:#fff!important;color:#000!important;text-shadow:none!important;}',
    'html.acf-light a' + EXCL + ',html.acf-light a' + EXCL + ' *{color:#0000c8!important;}',

    'html.acf-animations *,html.acf-animations *::before,html.acf-animations *::after' +
      '{animation-duration:0s!important;animation-iteration-count:1!important;transition:none!important;scroll-behavior:auto!important;}',

    'html.acf-focus *:focus{outline:3px solid ' + config.color + '!important;outline-offset:3px!important;box-shadow:0 0 0 6px #fff!important;}',

    // Link "pular para o conteúdo"
    '.acf-skip{position:fixed!important;top:-100px;left:12px;z-index:2147483647;padding:12px 18px;' +
      'background:#000;color:#fff!important;font:600 16px/1.2 Arial,sans-serif;border-radius:0 0 6px 6px;' +
      'text-decoration:underline;outline:3px solid #ff0;}',
    '.acf-skip:focus{top:0;}',
    '.acf-skip-target:focus{outline:3px dashed ' + config.color + ';outline-offset:4px;}'
  ].join('\n');

  // ---------- Tamanho do texto ----------
  var SKIP_TAGS = /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|SVG|PATH|IMG|VIDEO|AUDIO|CANVAS|IFRAME|OBJECT|BR|HR|META|LINK|HEAD|TITLE)$/;
  var fontOriginals = null; // [{el, px, inline}]

  function captureFonts() {
    fontOriginals = [];
    var all = document.body.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.id === HOST_ID || SKIP_TAGS.test(el.tagName.toUpperCase())) continue;
      if (el.closest && el.closest('#' + HOST_ID)) continue;
      var px = parseFloat(getComputedStyle(el).fontSize);
      if (!px) continue;
      fontOriginals.push({ el: el, px: px, inline: el.style.getPropertyValue('font-size'), prio: el.style.getPropertyPriority('font-size') });
    }
  }

  function applyFont() {
    if (state.font === 0) {
      if (fontOriginals) {
        fontOriginals.forEach(function (o) {
          if (o.inline) o.el.style.setProperty('font-size', o.inline, o.prio);
          else o.el.style.removeProperty('font-size');
        });
        fontOriginals = null;
      }
      return;
    }
    if (!fontOriginals) captureFonts();
    var scale = 1 + state.font * FONT_STEP;
    fontOriginals.forEach(function (o) {
      o.el.style.setProperty('font-size', (o.px * scale).toFixed(2) + 'px', 'important');
    });
  }

  // ---------- Aplicar estado ----------
  function applyAll() {
    var cl = root.classList;
    cl.toggle('acf-links', !!state.links);
    cl.toggle('acf-readable', !!state.readable);
    cl.toggle('acf-negative', state.contrast === 'negative');
    cl.toggle('acf-light', state.contrast === 'light');
    cl.toggle('acf-animations', !!state.animations);
    cl.toggle('acf-focus', !!state.focus);

    var filters = [];
    if (state.grayscale) filters.push('grayscale(100%)');
    if (state.contrast === 'high') filters.push('contrast(150%)');
    root.style.filter = filters.join(' ');

    applyFont();
    updateButtons();
  }

  // ---------- Ícones (SVG próprios) ----------
  var ICONS = {
    person: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="4" r="2.2"/><path d="M4 7.5c2.6.7 5.3 1 8 1s5.4-.3 8-1l.5 1.9c-2.1.6-4.3.9-6.5 1.1V14l2.2 7.4-1.9.6L12 15.5 9.7 22l-1.9-.6L10 14v-3.5c-2.2-.2-4.4-.5-6.5-1.1z"/></svg>',
    fontUp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 19 8 5h2l5 14h-2.2l-1.3-3.8H6.5L5.2 19zm4.2-5.8h3.6L9 7.8zM18 6h2v3h3v2h-3v3h-2v-3h-3V9h3z"/></svg>',
    fontDown: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 19 8 5h2l5 14h-2.2l-1.3-3.8H6.5L5.2 19zm4.2-5.8h3.6L9 7.8zM15 9h8v2h-8z"/></svg>',
    grayscale: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2v16a8 8 0 0 1 0-16z"/></svg>',
    highContrast: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2v6a3 3 0 0 1 0-6zM11 1h2v3h-2zm0 19h2v3h-2zM1 11h3v2H1zm19 0h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4zM4.2 18.4l2.1-2.1 1.4 1.4-2.1 2.1zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1z"/></svg>',
    negative: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 3h18v18H3zm2 2v14h7V5z"/></svg>',
    light: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 21h6v-1H9zm3-19a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2zm2.9 11.1-.9.6V16h-4v-2.3l-.9-.6a5 5 0 1 1 5.8 0z"/></svg>',
    links: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a1 1 0 1 1 1.4 1.4L12 13.4a1 1 0 0 1-1.4 0zM8.5 17.5a3 3 0 0 1-4.2-4.2l2.8-2.8 1.4 1.4-2.8 2.8a1 1 0 0 0 1.4 1.4l2.8-2.8 1.4 1.4zm8.4-5.6-1.4-1.4 2.8-2.8a1 1 0 0 0-1.4-1.4l-2.8 2.8-1.4-1.4 2.8-2.8a3 3 0 0 1 4.2 4.2zM3 20h18v2H3z"/></svg>',
    readable: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 4h14v3h-2V6h-4v12h2v2H9v-2h2V6H7v1H5z"/></svg>',
    animations: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM9 8h2v8H9zm4 0h2v8h-2z"/></svg>',
    focus: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 3h6v2H5v4H3zm12 0h6v6h-2V5h-4zM3 15h2v4h4v2H3zm16 0h2v6h-6v-2h4zM9 9h6v6H9z"/></svg>',
    reset: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4a8 8 0 1 1-7.7 10h2.1A6 6 0 1 0 12 6v3L7 5l5-4z"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg>'
  };

  // ---------- Widget ----------
  var pos = config.position.toLowerCase();
  var vertical = pos.indexOf('top') === 0 ? 'top' : (pos === 'left' || pos === 'right' ? 'middle' : 'bottom');
  var side = pos.indexOf('left') !== -1 ? 'left' : 'right';

//  var hostPos = side + ':16px;' + (vertical === 'middle' ? 'top:50%;transform:translateY(-50%);' : vertical + ':16px;');
  var hostPos = side + ':6px;' + (vertical === 'middle' ? 'top: calc(58vh - 20px);' : vertical + ':16px;');
  var panelPos = side + ':0;' + (vertical === 'top' ? 'top:64px;' : vertical === 'middle' ? 'top:50%;transform:translateY(-50%);' + side + ':64px;' : 'bottom:64px;');

  var widgetCss = [
    ':host{all:initial;}',
    '*{box-sizing:border-box;}',
    '.wrap{font:400 15px/1.35 Arial,Helvetica,sans-serif;color:#1f2328;}',
    '.toggle{width:44px;height:44px;border-radius:50%;border:3px solid #fff;background:' + config.color + ';color:#fff;' +
      'cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.35);padding:0;}',
    '.toggle svg{width:30px;height:30px;fill:currentColor;}',
    '.toggle:hover{filter:brightness(1.1);}',
    'button:focus-visible,a:focus-visible{outline:3px solid #ffbf00;outline-offset:2px;}',
    '.panel{position:absolute;' + panelPos + 'width:min(300px,calc(100vw - 32px));max-height:calc(100vh - 100px);overflow:auto;' +
      'background:#fff;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.35);border:1px solid #d0d7de;}',
    '.panel[hidden]{display:none;}',
    '.head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 14px;background:' + config.color + ';color:#fff;border-radius:10px 10px 0 0;}',
    '.head h2{margin:0;font-size:16px;font-weight:700;}',
    '.close{background:transparent;border:0;color:#fff;cursor:pointer;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:6px;padding:0;}',
    '.close svg{width:22px;height:22px;fill:currentColor;}',
    'ul{list-style:none;margin:0;padding:8px;}',
    'li{margin:0;}',
    '.opt{display:flex;align-items:center;gap:12px;width:100%;padding:10px 12px;border:2px solid transparent;border-radius:8px;' +
      'background:transparent;color:#1f2328;font:inherit;text-align:left;cursor:pointer;}',
    '.opt svg{width:22px;height:22px;flex:none;fill:currentColor;}',
    '.opt:hover{background:#f0f3f6;}',
    '.opt[aria-pressed="true"]{background:' + config.color + ';color:#fff;}',
    '.opt .lbl{flex:1;}',
    '.opt .val{font-size:13px;font-weight:700;}',
    '.sep{height:1px;background:#d0d7de;margin:6px 4px;}',
    '.links{display:flex;flex-wrap:wrap;gap:4px 14px;padding:4px 14px 14px;}',
    '.links a{color:#0b4cc0;font-size:14px;}',
    '.sr{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;}',
    '@media (prefers-reduced-motion:no-preference){.panel{animation:acf-in .15s ease-out;}@keyframes acf-in{from{opacity:0;}to{opacity:1;}}}'
  ].join('\n');

  var OPTIONS = [
    { id: 'fontUp', type: 'action' },
    { id: 'fontDown', type: 'action' },
    { id: 'grayscale', type: 'toggle', key: 'grayscale' },
    { id: 'highContrast', type: 'contrast', value: 'high' },
    { id: 'negative', type: 'contrast', value: 'negative' },
    { id: 'light', type: 'contrast', value: 'light' },
    { id: 'links', type: 'toggle', key: 'links' },
    { id: 'readable', type: 'toggle', key: 'readable' },
    { id: 'animations', type: 'toggle', key: 'animations' },
    { id: 'focus', type: 'toggle', key: 'focus' },
    { sep: true },
    { id: 'reset', type: 'action' }
  ];

  var shadow, toggleBtn, panel, live, buttons = {};

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function build() {
    var style = document.createElement('style');
    style.id = 'acessibilidade-facil-css';
    style.textContent = pageCss;
    (document.head || root).appendChild(style);

    var host = document.createElement('div');
    host.id = HOST_ID;
    host.setAttribute('style', 'position:fixed;' + hostPos + 'z-index:2147483646;');
    shadow = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

    var items = OPTIONS.map(function (o) {
      if (o.sep) return '<li role="none" class="sep"></li>';
      var pressed = o.type === 'action' ? '' : ' aria-pressed="false"';
      return '<li><button type="button" class="opt" data-opt="' + o.id + '"' + pressed + '>' +
        ICONS[o.id] + '<span class="lbl">' + esc(t[o.id]) + '</span></button></li>';
    }).join('');

    var extra = ['sitemap', 'help', 'feedback'].filter(function (k) { return config[k]; }).map(function (k) {
      return '<a href="' + esc(config[k]) + '">' + esc(t[k]) + '</a>';
    }).join('');

    shadow.innerHTML = '<style>' + widgetCss + '</style>' +
      '<div class="wrap">' +
      '<button type="button" class="toggle" aria-expanded="false" aria-controls="acf-panel" aria-label="' + esc(t.open) + '" title="' + esc(t.title) + '">' + ICONS.person + '</button>' +
      '<div class="panel" id="acf-panel" role="dialog" aria-modal="false" aria-labelledby="acf-title" hidden>' +
      '<div class="head"><h2 id="acf-title">' + esc(t.title) + '</h2>' +
      '<button type="button" class="close" aria-label="' + esc(t.close) + '">' + ICONS.close + '</button></div>' +
      '<ul role="list">' + items + '</ul>' +
      (extra ? '<div class="sep"></div><div class="links">' + extra + '</div>' : '') +
      '</div>' +
      '<div class="sr" role="status" aria-live="polite"></div>' +
      '</div>';

    document.body.appendChild(host);

    toggleBtn = shadow.querySelector('.toggle');
    panel = shadow.querySelector('.panel');
    live = shadow.querySelector('[role="status"]');
    Array.prototype.forEach.call(shadow.querySelectorAll('.opt'), function (b) {
      buttons[b.getAttribute('data-opt')] = b;
    });

    toggleBtn.addEventListener('click', function () { setOpen(panel.hidden); });
    shadow.querySelector('.close').addEventListener('click', function () { setOpen(false); });
    panel.addEventListener('click', onOption);
    panel.addEventListener('keydown', onKeydown);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && e.target !== host && !host.contains(e.target)) setOpen(false, true);
    });
  }

  function setOpen(open, keepFocus) {
    panel.hidden = !open;
    toggleBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      var first = panel.querySelector('.opt');
      if (first) first.focus();
    } else if (!keepFocus) {
      toggleBtn.focus();
    }
  }

  // Navegação com setas entre as opções
  function onKeydown(e) {
    var opts = Array.prototype.slice.call(panel.querySelectorAll('.opt'));
    var idx = opts.indexOf(shadow.activeElement);
    if (idx === -1) return;
    var next = null;
    if (e.key === 'ArrowDown') next = opts[(idx + 1) % opts.length];
    else if (e.key === 'ArrowUp') next = opts[(idx - 1 + opts.length) % opts.length];
    else if (e.key === 'Home') next = opts[0];
    else if (e.key === 'End') next = opts[opts.length - 1];
    if (next) { e.preventDefault(); next.focus(); }
  }

  function announce(msg) {
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 50);
  }

  function onOption(e) {
    var btn = e.target.closest ? e.target.closest('.opt') : null;
    if (!btn) return;
    var id = btn.getAttribute('data-opt');
    var opt = OPTIONS.filter(function (o) { return o.id === id; })[0];
    var msg = '';

    if (id === 'fontUp' || id === 'fontDown') {
      state.font = Math.max(FONT_MIN, Math.min(FONT_MAX, state.font + (id === 'fontUp' ? 1 : -1)));
      msg = t.fontSize.replace('{n}', Math.round((1 + state.font * FONT_STEP) * 100));
    } else if (id === 'reset') {
      for (var k in DEFAULTS) state[k] = DEFAULTS[k];
      msg = t.resetDone;
    } else if (opt.type === 'toggle') {
      state[opt.key] = !state[opt.key];
      msg = t[id] + ': ' + (state[opt.key] ? t.on : t.off);
    } else if (opt.type === 'contrast') {
      state.contrast = state.contrast === opt.value ? '' : opt.value;
      msg = t[id] + ': ' + (state.contrast === opt.value ? t.on : t.off);
    }

    applyAll();
    save();
    announce(msg);
  }

  function updateButtons() {
    if (!toggleBtn) return;
    OPTIONS.forEach(function (o) {
      var b = buttons[o.id];
      if (!b) return;
      if (o.type === 'toggle') b.setAttribute('aria-pressed', String(!!state[o.key]));
      if (o.type === 'contrast') b.setAttribute('aria-pressed', String(state.contrast === o.value));
    });
    buttons.fontUp.disabled = state.font >= FONT_MAX;
    buttons.fontDown.disabled = state.font <= FONT_MIN;
    buttons.fontUp.setAttribute('aria-disabled', String(state.font >= FONT_MAX));
    buttons.fontDown.setAttribute('aria-disabled', String(state.font <= FONT_MIN));
  }

  // ---------- Pular para o conteúdo ----------
  function findMain() {
    var sels = config.skipTarget ? [config.skipTarget] : [];
    sels = sels.concat(['main', '[role="main"]', '#main', '#content', '#conteudo', '.main', '.content', 'article', 'h1']);
    for (var i = 0; i < sels.length; i++) {
      try {
        var el = document.querySelector(sels[i]);
        if (el) return el;
      } catch (e) { /* seletor inválido */ }
    }
    return null;
  }

  function addSkipLink() {
    if (!config.skipLink) return;
    var target = findMain();
    if (!target) return;
    if (!target.id) target.id = 'acf-conteudo';
    var a = document.createElement('a');
    a.className = 'acf-skip';
    a.href = '#' + target.id;
    a.textContent = t.skip;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.classList.add('acf-skip-target');
      target.focus();
      target.scrollIntoView();
    });
    document.body.insertBefore(a, document.body.firstChild);
  }

  function init() {
    build();
    addSkipLink();
    applyAll();
  }

  // Aplica classes de contraste cedo para evitar "piscar" a página
  applyEarly();
  function applyEarly() {
    var cl = root.classList;
    if (state.contrast === 'negative') cl.add('acf-negative');
    if (state.contrast === 'light') cl.add('acf-light');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // API pública mínima
  window.AcessibilidadeFacil = {
    reset: function () { for (var k in DEFAULTS) state[k] = DEFAULTS[k]; applyAll(); save(); },
    open: function () { setOpen(true); },
    close: function () { setOpen(false); }
  };
})();
