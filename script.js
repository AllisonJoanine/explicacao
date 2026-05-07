// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ===== MENU MOBILE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== COPIAR PIX =====
function copiarPix() {
  const chave = '52.966.571/0001-89';
  navigator.clipboard.writeText(chave).then(() => {
    mostrarToast();
    const btn = document.getElementById('btnCopy');
    if (btn) {
      btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
      btn.style.background = '#4CAF50';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-copy"></i> Copiar Chave';
        btn.style.background = '';
      }, 3000);
    }
  }).catch(() => {
    // Fallback para navegadores mais antigos
    const el = document.createElement('textarea');
    el.value = chave;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    mostrarToast();
  });
}

function mostrarToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== VOLTAR AO TOPO =====
function voltarTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FORMULÁRIO DE CONTATO =====
function enviarFormulario(e) {
  e.preventDefault();
  const form = document.getElementById('contatoForm');
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('button[type="submit"]');

  // Simular envio
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    btn.style.background = '#4CAF50';
    success.style.display = 'flex';
    form.reset();

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      btn.style.background = '';
      btn.disabled = false;
      success.style.display = 'none';
    }, 5000);
  }, 1500);
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.stat-card, .ong-card, .diretor-card, .sobre-card-destaque, .valor-item, .contato-item, .doe-info-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.background = '';
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      if (!link.classList.contains('nav-cta')) {
        link.style.background = 'rgba(33,150,243,0.1)';
        link.style.color = '#2196F3';
      }
    }
  });
});

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CONTADOR ANIMADO =====
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const duration = 2000;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(count) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(num => {
        const text = num.textContent;
        if (text === '15') animateCounter(num, 15);
        else if (text === '2023') animateCounter(num, 2023);
        else if (text === '100%') {
          let c = 0;
          const t = setInterval(() => {
            c += 2;
            if (c >= 100) { c = 100; clearInterval(t); }
            num.textContent = c + '%';
          }, 20);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);
