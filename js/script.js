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

    // Récupération et nettoyage des saisies
    const rawNom = (document.getElementById('nom')?.value || '').trim();
    const rawPostnom = (document.getElementById('postnom')?.value || '').trim();
    const rawPrenom = (document.getElementById('prenom')?.value || '').trim();
    const email = (document.getElementById('email')?.value || '').trim();
    const telephone = (document.getElementById('telephone')?.value || '').trim();
    const message = (document.getElementById('message')?.value || '').trim();

    if (!rawNom || !rawPostnom || !rawPrenom || !telephone || !message) {
      alert('Veuillez remplir tous les champs obligatoires.');
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

    // Encodage complet pour WhatsApp
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texteBrut)}`;

    // Animation du bouton
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Ouverture WhatsApp…';
    btn.disabled = true;

    // Ouverture de WhatsApp
    window.open(url, '_blank');

    // Réinitialisation du formulaire
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