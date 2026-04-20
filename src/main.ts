// Fit3 Landing Page — Main JavaScript
import './style.css';

const LOCALE_STORAGE_KEY = 'fit3-preferred-locale';
const SUPPORTED_LOCALES = new Set(['en', 'es', 'fr', 'it', 'de']);
const LOCALE_PATHS: Record<string, string> = {
  en: '/',
  es: '/es/',
  fr: '/fr/',
  it: '/it/',
  de: '/de/',
};

function normalizeLocale(locale: string | null | undefined): string | null {
  if (!locale) return null;

  const [language] = locale.toLowerCase().split(/[-_]/);
  return SUPPORTED_LOCALES.has(language) ? language : null;
}

function getPreferredDeviceLocale(): string | null {
  const browserLocales = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const locale of browserLocales) {
    const normalized = normalizeLocale(locale);
    if (normalized) {
      return normalized;
    }
  }

  return null;
}

function initLocalePreference(): void {
  const body = document.body;
  const currentLocale = normalizeLocale(body.dataset.locale) ?? 'en';
  const isAutoLocaleRoot = body.dataset.autoLocaleRoot === 'true';

  document.querySelectorAll<HTMLSelectElement>('.language-select').forEach((select) => {
    select.addEventListener('change', () => {
      const targetPath = select.value;
      const matchedLocale = Object.entries(LOCALE_PATHS).find(([, path]) => path === targetPath)?.[0];
      const locale = normalizeLocale(matchedLocale);

      if (locale) {
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      }

      if (targetPath && window.location.pathname !== targetPath) {
        window.location.assign(targetPath);
      }
    });
  });

  if (!isAutoLocaleRoot) {
    return;
  }

  const storedLocale = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
  const targetLocale = storedLocale ?? getPreferredDeviceLocale();

  if (!targetLocale || targetLocale === currentLocale) {
    return;
  }

  const targetPath = LOCALE_PATHS[targetLocale];
  if (!targetPath || window.location.pathname === targetPath) {
    return;
  }

  window.location.replace(targetPath);
}

// ============================================
// Intersection Observer — Reveal on Scroll
// ============================================
function initRevealAnimations(): void {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ============================================
// Animated Counters
// ============================================
function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-target]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || '0', 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el: HTMLElement, target: number): void {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current.toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ============================================
// Navbar — Scroll Effect
// ============================================
function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu(): void {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });
}

// ============================================
// Smooth Scroll for Anchors
// ============================================
function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        ) || 72;

        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// Parallax Effect on Hero
// ============================================
function initHeroParallax(): void {
  const heroBg = document.querySelector<HTMLElement>('.hero-bg-img');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
          heroBg.style.opacity = `${Math.max(0.1, 0.5 - scrolled * 0.0005)}`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// Init All
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initLocalePreference();
  initRevealAnimations();
  initCounters();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initHeroParallax();
});
