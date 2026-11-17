if ('scrollRestoration' in history && !window.location.hash) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Remove 'no-js' imediatamente para o layout assumir o modo interativo sem salto de altura
  document.documentElement.classList.remove('no-js');
  const googleFontsLink = document.getElementById('google-fonts');
  if (googleFontsLink) {
    googleFontsLink.media = 'all';
  }

  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // 2. Inicializa os módulos com o cabeçalho já na sua dimensão real
  initHeaderHeightObserver();
  initAnimacoes();
  initMenuMobile();
  initNavegacaoSuave();
  initFAQAnimation();

  // 3. Libera as transições CSS do menu mobile apenas após a pintura inicial da tela
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('js-pronto');
    });
  });
});

function initHeaderHeightObserver() {
  const header = document.querySelector('.header');
  if (!header) return;

  const atualizarAlturaHeader = () => {
    const altura = Math.ceil(header.getBoundingClientRect().height);
    if (altura > 0) {
      document.documentElement.style.setProperty('--header-height', `${altura}px`);
    }
  };

  atualizarAlturaHeader();

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(atualizarAlturaHeader);
    resizeObserver.observe(header);
  } else {
    window.addEventListener('resize', atualizarAlturaHeader);
  }
}

function initAnimacoes() {
  document.documentElement.classList.add('js-animacoes-ativas');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  const elementosParaAnimar = document.querySelectorAll(
   '.secao-conteudo > h2, .secao-conteudo > p, .card-diferencial, .card-tratamento, .item-faq, .secao-sobre p'
  );

  elementosParaAnimar.forEach((el) => {
    el.classList.add('revela-elemento');
    observer.observe(el);
  });
}

let fecharMenuMobileGlobal = null;

function initMenuMobile() {
  const btnMenuMobile = document.querySelector('.btn-menu-mobile');
  const btnFecharMenu = document.querySelector('.btn-fechar-menu');
  const navPrincipal = document.querySelector('.nav-principal');
  const desktopBreakpoint = window.matchMedia('(min-width: 992px)');
  const links = navPrincipal ? navPrincipal.querySelectorAll('a') : [];

  if (!btnMenuMobile || !navPrincipal) return;

  const sincronizarModoTela = () => {
    if (desktopBreakpoint.matches) {
      navPrincipal.classList.remove('is-open');
      navPrincipal.removeAttribute('aria-hidden');
      navPrincipal.style.pointerEvents = '';
      btnMenuMobile.setAttribute('aria-expanded', 'false');
      btnMenuMobile.setAttribute('aria-label', 'Abrir menu de navegação');
    } else {
      const estaAberto = navPrincipal.classList.contains('is-open');
      navPrincipal.setAttribute('aria-hidden', estaAberto ? 'false' : 'true');
      navPrincipal.style.pointerEvents = estaAberto ? 'auto' : 'none';
    }
  };

  const toggleMenu = (open, shouldFocusFirst = false, returnFocus = false) => {
    if (desktopBreakpoint.matches) {
      sincronizarModoTela();
      return;
    }

    navPrincipal.classList.toggle('is-open', open);
    btnMenuMobile.setAttribute('aria-expanded', open ? 'true' : 'false');
    btnMenuMobile.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    navPrincipal.setAttribute('aria-hidden', open ? 'false' : 'true');
    navPrincipal.style.pointerEvents = open ? 'auto' : 'none';

    if (open && shouldFocusFirst) {
      const firstLink = navPrincipal.querySelector('a');
      if (firstLink) firstLink.focus();
    } else if (!open && returnFocus) {
      btnMenuMobile.focus();
    }
  };

  fecharMenuMobileGlobal = () => toggleMenu(false, false, false);

  sincronizarModoTela();

  btnMenuMobile.addEventListener('click', (e) => {
    const isOpen = navPrincipal.classList.contains('is-open');
    const isKeyboard = e.detail === 0;
    toggleMenu(!isOpen, isKeyboard, !isOpen);
  });

  if (btnFecharMenu) {
    btnFecharMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false, false, true);
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false, false, false));
  });

  document.addEventListener('click', (e) => {
    if (
      !desktopBreakpoint.matches &&
      navPrincipal.classList.contains('is-open') &&
      !navPrincipal.contains(e.target) &&
      !btnMenuMobile.contains(e.target)
    ) {
      toggleMenu(false, false, false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!desktopBreakpoint.matches && e.key === 'Escape' && navPrincipal.classList.contains('is-open')) {
      toggleMenu(false, false, true);
    }
  });

  desktopBreakpoint.addEventListener('change', sincronizarModoTela);
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

function smoothScrollAnimado(posicaoAlvo, duracao) {
  const posicaoInicial = window.pageYOffset;
  const distancia = posicaoAlvo - posicaoInicial;
  let tempoInicio = null;

  function animacaoScroll(tempoAtual) {
    if (tempoInicio === null) tempoInicio = tempoAtual;
    const tempoDecorrido = tempoAtual - tempoInicio;
    const deslocamento = easeInOutCubic(tempoDecorrido, posicaoInicial, distancia, duracao);
    window.scrollTo(0, deslocamento);
    if (tempoDecorrido < duracao) {
      requestAnimationFrame(animacaoScroll);
    }
  }

  requestAnimationFrame(animacaoScroll);
}

function initNavegacaoSuave() {
  const linksInternos = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('.header');

  linksInternos.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      e.preventDefault();

      let posicaoAlvo = 0;
      if (href !== '#' && href !== '#topo') {
        const alvo = document.querySelector(href);
        if (!alvo) return;

        const elementosOcultos = alvo.querySelectorAll('.revela-elemento');
        elementosOcultos.forEach((el) => el.classList.add('is-visible'));

        const alturaHeader = header ? Math.ceil(header.getBoundingClientRect().height) : 120;
        const offsetHeader = alturaHeader + 16;
        posicaoAlvo = Math.max(0, alvo.getBoundingClientRect().top + window.pageYOffset - offsetHeader);
      }

      const navPrincipal = document.querySelector('.nav-principal');
      let menuFechadoAgora = false;

      if (navPrincipal && navPrincipal.classList.contains('is-open')) {
        if (typeof fecharMenuMobileGlobal === 'function') {
          fecharMenuMobileGlobal();
        }
        menuFechadoAgora = true;
      }

      setTimeout(() => {
        smoothScrollAnimado(posicaoAlvo, 1000);
      }, menuFechadoAgora ? 500 : 0);
    });
  });
}

function initFAQAnimation() {
  const faqItems = document.querySelectorAll('.item-faq');

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary');
    if (!summary) return;

    let closeTimer = null;

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        closeTimer = setTimeout(() => {
          if (!item.classList.contains('is-open')) {
            item.removeAttribute('open');
          }
          closeTimer = null;
        }, 580);
      } else {
        item.setAttribute('open', '');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.add('is-open');
          });
        });
      }
    });
  });
}
