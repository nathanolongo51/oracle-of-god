// Skeleton
window.addEventListener('load', () => {
  const skeleton = document.getElementById('skeleton');
  if (skeleton) {
    setTimeout(() => skeleton.classList.add('hidden'), 600);
  }
});

// Header scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active nav on scroll (page d'accueil uniquement)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const path = window.location.pathname;
const isHome = path.endsWith('index.html') || path.endsWith('/') || path === '';

if (sections.length && isHome) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 90) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes('#')) {
        link.classList.toggle('active', href.endsWith('#' + current));
      }
    });
  });
}

// ===== Formulaire → WhatsApp =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Numéro WhatsApp (sans + ni espaces)
const WHATSAPP_NUMBER = '243853073430';

/**
 * Mettre la première lettre d'une chaîne en majuscule
 */
function capitaliser(chaine) {
  if (!chaine) return '';
  return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Anti-spam honeypot
    const hp = (document.getElementById('website')?.value || '').trim();
    if (hp) {
      return; // bot detected, silently ignore
    }

    // Récupération et nettoyage des saisies
    const rawNom = (document.getElementById('nom')?.value || '').trim();
    const rawPostnom = (document.getElementById('postnom')?.value || '').trim();
    const rawPrenom = (document.getElementById('prenom')?.value || '').trim();
    const email = (document.getElementById('email')?.value || '').trim();
    const telephone = (document.getElementById('telephone')?.value || '').trim();
    const message = (document.getElementById('message')?.value || '').trim();

    // Validation
    if (!rawNom || rawNom.length < 2) {
      alert('Veuillez indiquer un nom valide (au moins 2 caractères).');
      document.getElementById('nom')?.focus();
      return;
    }
    if (!rawPostnom || rawPostnom.length < 2) {
      alert('Veuillez indiquer un post-nom valide (au moins 2 caractères).');
      document.getElementById('postnom')?.focus();
      return;
    }
    if (!rawPrenom || rawPrenom.length < 2) {
      alert('Veuillez indiquer un prénom valide (au moins 2 caractères).');
      document.getElementById('prenom')?.focus();
      return;
    }
    if (!telephone || telephone.replace(/\D/g, '').length < 9) {
      alert('Veuillez indiquer un numéro de téléphone valide.');
      document.getElementById('telephone')?.focus();
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Veuillez indiquer une adresse e-mail valide ou laisser le champ vide.');
      document.getElementById('email')?.focus();
      return;
    }
    if (!message || message.length < 10) {
      alert('Veuillez écrire un message d’au moins 10 caractères.');
      document.getElementById('message')?.focus();
      return;
    }

    // Formatage : NTUMBA MBIYA Michée
    const nomComplet = `${rawNom.toUpperCase()} ${rawPostnom.toUpperCase()} ${capitaliser(rawPrenom)}`;

    // Construction du message avec le nom complet sur une seule ligne
    let texteBrut = `*Message venant du site web d'Oracle of God*\n\n` +
      `Identité : ${nomComplet}\n` +
      `Téléphone : ${telephone}\n`;

    if (email) {
      texteBrut += `Email : ${email}\n`;
    }

    texteBrut += `\n${message}`;

    // Encodage complet pour WhatsApp (lien côté client, pas d’API exposée)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texteBrut)}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Ouverture WhatsApp…';
    btn.disabled = true;

    window.open(url, '_blank');

    setTimeout(() => {
      if (formSuccess) formSuccess.hidden = false;
      contactForm.reset();
      btn.textContent = original;
      btn.disabled = false;
      
      if (formSuccess) {
        setTimeout(() => {
          formSuccess.hidden = true;
        }, 4500);
      }
    }, 600);
  });
}
// Bouton retour en haut
const btnTop = document.getElementById('btn-top');
if (btnTop) {
  window.addEventListener('scroll', () => {
    btnTop.classList.toggle('visible', window.scrollY > 100);
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}