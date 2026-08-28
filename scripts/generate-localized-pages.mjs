import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getStatsForLocale, languageOrder, locales, siteConfig } from './site-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function absoluteUrl(pathname) {
  return new URL(pathname, siteConfig.siteUrl).toString();
}

function joinClasses(...parts) {
  return parts.filter(Boolean).join(' ');
}

function getAlternateLinks(currentLocale) {
  const links = languageOrder
    .map((code) => {
      const locale = locales[code];
      return `<link rel="alternate" hreflang="${locale.lang}" href="${absoluteUrl(locale.path)}" />`;
    })
    .join('\n  ');

  return `${links}\n  <link rel="alternate" hreflang="x-default" href="${absoluteUrl(locales[siteConfig.defaultLocale].path)}" />\n  <link rel="canonical" href="${absoluteUrl(currentLocale.path)}" />`;
}

function renderJsonLd(locale) {
  const downloadUrl =
    siteConfig.app.appStoreUrl !== '#' ? siteConfig.app.appStoreUrl : absoluteUrl(locale.path);

  const organization = {
    '@type': 'Organization',
    '@id': `${absoluteUrl(locale.path)}#organization`,
    name: siteConfig.brandName,
    url: absoluteUrl(locale.path),
  };

  if (siteConfig.supportEmail) {
    organization.email = siteConfig.supportEmail;
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${absoluteUrl(locale.path)}#website`,
        url: absoluteUrl(locale.path),
        name: siteConfig.brandName,
        inLanguage: locale.lang,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${absoluteUrl(locale.path)}#app`,
        name: siteConfig.brandName,
        applicationCategory: locale.schema.appCategory,
        operatingSystem: locale.schema.operatingSystem,
        description: locale.description,
        downloadUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return JSON.stringify(graph, null, 2);
}

function renderLanguageSelect(currentCode, label) {
  const options = languageOrder
    .map((code) => {
      const locale = locales[code];
      return `<option value="${locale.path}" lang="${locale.lang}" ${currentCode === code ? 'selected' : ''}>${escapeHtml(locale.nativeLabel)}</option>`;
    })
    .join('');

  return `
            <label class="footer-locale-label" for="locale-select-${currentCode}">${escapeHtml(label)}</label>
            <select id="locale-select-${currentCode}" class="language-select" aria-label="${escapeHtml(label)}">
              ${options}
            </select>`;
}

function renderBrandMark() {
  return `<img class="brand-icon" src="${siteConfig.assets.brandIconPath}" alt="" width="32" height="32" />`;
}

function renderFeatures(locale) {
  return locale.features
    .map(
      (feature) => `
          <div class="bento-card bento-large reveal">
            <div class="bento-content">
              <div class="bento-icon">${escapeHtml(feature.icon)}</div>
              <h3 class="bento-title">${escapeHtml(feature.title)}</h3>
              <p class="bento-desc">${escapeHtml(feature.description)}</p>
            </div>
            <div class="bento-screenshot">
              <div class="phone-frame">
                <img src="${feature.image}" alt="${escapeHtml(feature.alt)}" loading="lazy" />
              </div>
            </div>
          </div>`
    )
    .join('\n');
}

function renderSteps(locale) {
  return locale.steps
    .map((step, index) => {
      const card = `
          <div class="step-card reveal">
            <div class="step-number">${escapeHtml(step.number)}</div>
            <div class="step-icon">${escapeHtml(step.icon)}</div>
            <h3 class="step-title">${escapeHtml(step.title)}</h3>
            <p class="step-desc">${escapeHtml(step.description)}</p>
          </div>`;

      if (index === locale.steps.length - 1) {
        return card;
      }

      return `${card}

          <div class="step-connector reveal" aria-hidden="true">
            <svg viewBox="0 0 60 24" fill="none"><path d="M0 12h50m-8-8l8 8-8 8" stroke="#C8FF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>`;
    })
    .join('\n');
}

function renderBenefits(locale) {
  return locale.benefits
    .map(
      ([icon, title, description]) => `
          <div class="benefit-card reveal">
            <div class="benefit-icon">${escapeHtml(icon)}</div>
            <h3 class="benefit-title">${escapeHtml(title)}</h3>
            <p class="benefit-desc">${escapeHtml(description)}</p>
          </div>`
    )
    .join('\n');
}

function renderStats(localeCode) {
  const stats = getStatsForLocale(localeCode);

  return stats
    .map(
      (stat, index) => `
          <div class="hero-stat">
            <span class="hero-stat-number" data-target="${stat.target}">0</span>${escapeHtml(stat.suffix)}
            <span class="hero-stat-label">${escapeHtml(stat.label)}</span>
          </div>${index < stats.length - 1 ? '\n          <div class="hero-stat-divider"></div>' : ''}`
    )
    .join('\n');
}

function renderPage(code) {
  const locale = locales[code];
  const isDefaultLocale = code === siteConfig.defaultLocale;
  const ogImage = absoluteUrl(siteConfig.seo.ogImagePath);
  const appBannerMeta = siteConfig.app.appStoreId
    ? `<meta name="apple-itunes-app" content="app-id=${siteConfig.app.appStoreId}${
        siteConfig.app.appArgument ? `, app-argument=${siteConfig.app.appArgument}` : ''
      }" />`
    : '';
  const hasAppStoreUrl = siteConfig.app.appStoreUrl !== '#';
  const appStoreHref = hasAppStoreUrl ? siteConfig.app.appStoreUrl : '#download';
  const footerLinks = siteConfig.legal.linksEnabled
    ? `<div class="footer-links">
            <a href="${siteConfig.legal.privacyUrl}" class="footer-link">${escapeHtml(locale.footer.privacy)}</a>
            <a href="${siteConfig.legal.termsUrl}" class="footer-link">${escapeHtml(locale.footer.terms)}</a>
            <a href="${siteConfig.legal.contactUrl}" class="footer-link">${escapeHtml(locale.footer.contact)}</a>
          </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="${locale.lang}" dir="${locale.dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(locale.title)}</title>
  <meta name="description" content="${escapeHtml(locale.description)}" />
  <meta name="keywords" content="${escapeHtml(siteConfig.seo.keywords[code])}" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <meta name="theme-color" content="#0C0E0D" />
  <meta property="og:title" content="${escapeHtml(locale.title)}" />
  <meta property="og:description" content="${escapeHtml(locale.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(siteConfig.brandName)}" />
  <meta property="og:url" content="${absoluteUrl(locale.path)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:locale" content="${locale.localeTag}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(locale.title)}" />
  <meta name="twitter:description" content="${escapeHtml(locale.description)}" />
  <meta name="twitter:image" content="${ogImage}" />
  ${getAlternateLinks(locale)}
  ${appBannerMeta}
  <link rel="icon" type="image/png" href="${siteConfig.assets.faviconPath}" />
  <link rel="apple-touch-icon" href="${siteConfig.assets.appleTouchIconPath}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/style.css" />
  <script type="application/ld+json">
${renderJsonLd(locale)}
  </script>
</head>
<body data-locale="${locale.code}" data-default-locale="${siteConfig.defaultLocale}" ${isDefaultLocale ? 'data-auto-locale-root="true"' : ''}>
  <nav id="navbar" class="navbar">
    <div class="nav-container">
      <a href="${locale.path}" class="nav-logo" aria-label="${escapeHtml(siteConfig.brandName)}">
        ${renderBrandMark()}
        <span class="logo-text">${escapeHtml(siteConfig.brandName)}</span>
      </a>
      <div class="nav-links">
        <a href="#features" class="nav-link">${escapeHtml(locale.nav.features)}</a>
        <a href="#how-it-works" class="nav-link">${escapeHtml(locale.nav.howItWorks)}</a>
        <a href="#benefits" class="nav-link">${escapeHtml(locale.nav.benefits)}</a>
        <a href="#download" class="nav-cta">${escapeHtml(locale.nav.download)}</a>
      </div>
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      <a href="#features" class="mobile-link">${escapeHtml(locale.nav.features)}</a>
      <a href="#how-it-works" class="mobile-link">${escapeHtml(locale.nav.howItWorks)}</a>
      <a href="#benefits" class="mobile-link">${escapeHtml(locale.nav.benefits)}</a>
      <a href="#download" class="mobile-link cta">${escapeHtml(locale.nav.download)}</a>
    </div>
  </nav>

  <main>
    <section id="hero" class="hero">
      <div class="hero-bg">
        <img src="/images/hero-bg.png" alt="" class="hero-bg-img" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content reveal">
        <div class="hero-badge">${escapeHtml(locale.hero.badge)}</div>
        <h1 class="hero-title">
          ${escapeHtml(locale.hero.titleTop)}
          <br />
          <span class="text-accent">${escapeHtml(locale.hero.titleAccent)}</span>
        </h1>
        <p class="hero-subtitle">${escapeHtml(locale.hero.subtitle)}</p>
        <div class="hero-ctas">
          <a href="${appStoreHref}" class="btn btn-primary btn-lg" ${hasAppStoreUrl ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            <svg class="apple-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            ${escapeHtml(locale.hero.cta)}
          </a>
        </div>
        <div class="hero-stats">
${renderStats(code)}
        </div>
      </div>
    </section>

    <section id="features" class="section features">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">${escapeHtml(locale.sections.featuresTag)}</span>
          <h2 class="section-title">${escapeHtml(locale.sections.featuresTitle)} <span class="text-accent">${escapeHtml(locale.sections.featuresAccent)}</span></h2>
          <p class="section-subtitle">${escapeHtml(locale.sections.featuresSubtitle)}</p>
        </div>

        <div class="bento-grid">
${renderFeatures(locale)}
        </div>
      </div>
    </section>

    <section id="how-it-works" class="section how-it-works">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">${escapeHtml(locale.sections.howTag)}</span>
          <h2 class="section-title">${escapeHtml(locale.sections.howTitle)} <span class="text-accent">${escapeHtml(locale.sections.howAccent)}</span></h2>
          <p class="section-subtitle">${escapeHtml(locale.sections.howSubtitle)}</p>
        </div>

        <div class="steps-grid">
${renderSteps(locale)}
        </div>
      </div>
    </section>

    <section id="benefits" class="section benefits">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">${escapeHtml(locale.sections.benefitsTag)}</span>
          <h2 class="section-title">${escapeHtml(locale.sections.benefitsTitle)} <span class="text-accent">${escapeHtml(locale.sections.benefitsAccent)}</span></h2>
          <p class="section-subtitle">${escapeHtml(locale.sections.benefitsSubtitle)}</p>
        </div>

        <div class="benefits-grid">
${renderBenefits(locale)}
        </div>
      </div>
    </section>

    <section id="download" class="section cta-section">
      <div class="container">
        <div class="cta-card reveal">
          <div class="cta-glow"></div>
          <h2 class="cta-title">${escapeHtml(locale.sections.ctaTitle)}</h2>
          <p class="cta-subtitle">${escapeHtml(locale.sections.ctaSubtitle)}</p>
          <a href="${appStoreHref}" class="btn btn-primary btn-lg" ${hasAppStoreUrl ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            <svg class="apple-icon" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            ${escapeHtml(locale.hero.cta)}
          </a>
          <p class="cta-note">${escapeHtml(locale.sections.ctaNote)}</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          ${renderBrandMark()}
          <span class="logo-text">${escapeHtml(siteConfig.brandName)}</span>
        </div>
        <div class="footer-meta">
${footerLinks}
          <div class="footer-locale" aria-label="${escapeHtml(locale.nav.languageLabel)}">
${renderLanguageSelect(code, locale.nav.languageLabel)}
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>${escapeHtml(locale.footer.copyright)}</p>
      </div>
    </div>
  </footer>

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
`;
}

function renderSitemap() {
  const urls = languageOrder
    .map((code) => {
      const locale = locales[code];
      return `  <url>\n    <loc>${absoluteUrl(locale.path)}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
}

async function writePageForLocale(code) {
  const locale = locales[code];
  const relativePath = locale.path === '/' ? 'index.html' : path.join(locale.path, 'index.html');
  const outputPath = path.join(rootDir, relativePath);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, renderPage(code), 'utf8');
}

async function main() {
  await Promise.all(languageOrder.map(writePageForLocale));
  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), renderSitemap(), 'utf8');
  await fs.writeFile(path.join(publicDir, 'robots.txt'), renderRobots(), 'utf8');
}

await main();
