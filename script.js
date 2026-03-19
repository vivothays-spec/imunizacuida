// ─── SCROLL SUAVE PARA LINKS DA NAV ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── DESTAQUE DO LINK ATIVO NA NAV AO ROLAR ───
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('ativo');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observer.observe(sec));

// ─── ANIMAÇÃO DE ENTRADA AO ROLAR (FADE IN) ───
const fadeEls = document.querySelectorAll(
  '.campanha-card, .step, .fn-card, .doenca-chip, .stat-card'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.classList.add('fade-init');
  fadeObserver.observe(el);
});

// ─── CONTADOR ANIMADO NAS ESTATÍSTICAS DO HERO ───
function animarContador(el, fim, sufixo = '') {
  const duracao = 1800;
  const inicio = performance.now();
  const inicioNum = 0;

  function tick(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const easeOut = 1 - Math.pow(1 - progresso, 3);
    const atual = Math.floor(easeOut * fim);
    el.textContent = atual + sufixo;
    if (progresso < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Observa o hero para disparar contadores apenas uma vez
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  let contadoresDisparados = false;

  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !contadoresDisparados) {
      contadoresDisparados = true;

      const statNums = document.querySelectorAll('.stat-num');
      const dados = [
        { valor: 5, sufixo: '+' },
        { valor: 95, sufixo: '%' },
        { valor: 19, sufixo: '+' },
        { valor: null, texto: 'SUS' }
      ];

      statNums.forEach((el, i) => {
        const d = dados[i];
        if (d && d.valor !== null) {
          animarContador(el, d.valor, d.sufixo);
        }
      });
    }
  }, { threshold: 0.5 });

  heroObserver.observe(heroStats);
}

// ─── BOTÃO "VOLTAR AO TOPO" ───
const btnTopo = document.createElement('button');
btnTopo.id = 'btn-topo';
btnTopo.textContent = '↑';
btnTopo.setAttribute('title', 'Voltar ao topo');
document.body.appendChild(btnTopo);

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  btnTopo.style.opacity = window.scrollY > 400 ? '1' : '0';
  btnTopo.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
});
