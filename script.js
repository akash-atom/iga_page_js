(function () {
  var VIMEO_ID = '1176092719';
  var PLYR_VERSION = '3.7.8';
  var SWIPER_VERSION = '11';

  var PLYR_CSS = 'https://cdn.jsdelivr.net/npm/plyr@' + PLYR_VERSION + '/dist/plyr.css';
  var PLYR_JS = 'https://cdn.jsdelivr.net/npm/plyr@' + PLYR_VERSION + '/dist/plyr.min.js';
  var SWIPER_CSS = 'https://cdn.jsdelivr.net/npm/swiper@' + SWIPER_VERSION + '/swiper-bundle.min.css';
  var SWIPER_JS = 'https://cdn.jsdelivr.net/npm/swiper@' + SWIPER_VERSION + '/swiper-bundle.min.js';

  var STYLES =
    '.video_wrapper{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden}' +
    '@supports not (aspect-ratio:16/9){.video_wrapper::before{content:"";display:block;padding-top:56.25%}}' +
    '.video_wrapper .plyr{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 300ms ease}' +
    '.video_wrapper .plyr.is-ready{opacity:1}';

  function injectStyles() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(STYLES));
    document.head.appendChild(style);
  }

  function loadCss(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function initThumbPlayer() {
    var all = document.querySelectorAll('.plyr');
    var targets = [];
    for (var i = 0; i < all.length; i++) {
      if (!all[i].closest('.video_wrapper')) targets.push(all[i]);
    }
    if (!targets.length) return;

    var player = new window.Plyr(targets, {
      clickToPlay: false,
      controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen']
    });

    var thumb = document.getElementById('vid_thumb');
    if (!thumb) return;

    function setOpacity(v) { thumb.style.opacity = v; }
    setOpacity('1');

    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      if (player.playing) {
        player.pause();
        setOpacity('1');
      } else {
        player.play();
        setOpacity('0');
      }
    });

    player.on('play', function () { setOpacity('0'); });
    player.on('pause', function () { setOpacity('1'); });
    player.on('ended', function () { setOpacity('1'); });
  }

  function initHeroVideo() {
    var wrappers = document.querySelectorAll('.video_wrapper');
    for (var i = 0; i < wrappers.length; i++) {
      (function (wrapper) {
        if (wrapper.querySelector('.plyr')) return;

        var el = document.createElement('div');
        el.setAttribute('data-plyr-provider', 'vimeo');
        el.setAttribute('data-plyr-embed-id', VIMEO_ID);
        wrapper.appendChild(el);

        var player = new window.Plyr(el, {
          controls: ['play'],
          autoplay: true,
          muted: true,
          clickToPlay: true,
          loop: { active: true },
          vimeo: {
            background: true,
            byline: false,
            portrait: false,
            title: false,
            transparent: true,
            dnt: true
          }
        });

        function markReady() {
          var plyrEl = wrapper.querySelector('.plyr');
          if (plyrEl) plyrEl.classList.add('is-ready');
        }
        player.on('playing', markReady);
        player.on('ready', function () { setTimeout(markReady, 600); });
      })(wrappers[i]);
    }
  }

  function initFold1Swiper() {
    if (!document.querySelector('.fold_1')) return;
    new window.Swiper('.fold_1', {
      speed: 600,
      loop: false,
      autoHeight: false,
      centeredSlides: false,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: 8,
      rewind: false,
      mousewheel: { forceToAxis: true },
      keyboard: { enabled: true, onlyInViewport: true },
      breakpoints: {
        480: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: 1, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 24 }
      },
      navigation: {
        nextEl: '.swiper-next-fold-1',
        prevEl: '.swiper-prev-fold-1',
        disabledClass: 'fold_1_arr_disabled'
      }
    });
  }

  function initAll() {
    if (window.Plyr) {
      initThumbPlayer();
      initHeroVideo();
    }
    if (window.Swiper) {
      initFold1Swiper();
    }
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  injectStyles();
  loadCss(PLYR_CSS);
  loadCss(SWIPER_CSS);

  var pending = 2;
  function maybeBoot() {
    pending--;
    if (pending === 0) onReady(initAll);
  }
  loadScript(PLYR_JS, maybeBoot);
  loadScript(SWIPER_JS, maybeBoot);
})();
