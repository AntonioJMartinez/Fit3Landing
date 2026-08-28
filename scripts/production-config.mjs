const BASE_REQUIRED_ENVIRONMENT = [
  'FIT3_SITE_URL',
  'FIT3_APP_STORE_ID',
  'FIT3_APP_STORE_URL',
];

const LEGAL_ENVIRONMENT = [
  'FIT3_SUPPORT_EMAIL',
  'FIT3_PRIVACY_URL',
  'FIT3_TERMS_URL',
];

const RESERVED_HOSTNAMES = new Set([
  'example.com',
  'example.org',
  'example.net',
  'localhost',
]);

function isReservedHostname(hostname) {
  const normalized = hostname.toLowerCase();

  return (
    RESERVED_HOSTNAMES.has(normalized) ||
    normalized.endsWith('.example.com') ||
    normalized.endsWith('.example.org') ||
    normalized.endsWith('.example.net') ||
    normalized.endsWith('.invalid') ||
    normalized.endsWith('.localhost') ||
    normalized.endsWith('.test')
  );
}

function readRequiredEnvironment(requiredNames) {
  const missing = requiredNames.filter((name) => !process.env[name]?.trim());

  if (missing.length > 0) {
    throw new Error(
      [
        'Missing required Fit3 production configuration:',
        ...missing.map((name) => `  - ${name}`),
        'Copy .env.production.example to .env.production.local and provide verified production values.',
      ].join('\n')
    );
  }

  return Object.fromEntries(
    requiredNames.map((name) => [name, process.env[name].trim()])
  );
}

function readBooleanEnvironment(name, defaultValue = false) {
  const rawValue = process.env[name]?.trim().toLowerCase();

  if (!rawValue) {
    return defaultValue;
  }

  if (!['true', 'false'].includes(rawValue)) {
    throw new Error(`${name} must be either true or false.`);
  }

  return rawValue === 'true';
}

function parseProductionHttpsUrl(name, value, { originOnly = false } = {}) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL.`);
  }

  if (url.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS.`);
  }

  if (url.username || url.password || isReservedHostname(url.hostname)) {
    throw new Error(`${name} must point to a verified public production URL.`);
  }

  if (originOnly && (url.pathname !== '/' || url.search || url.hash)) {
    throw new Error(`${name} must contain only the production origin, without a path, query, or hash.`);
  }

  return url;
}

function validateEmail(name, value) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const hostname = value.split('@').at(-1) ?? '';

  if (!isValid || isReservedHostname(hostname)) {
    throw new Error(`${name} must be a verified production email address.`);
  }

  return value;
}

const hideLegalLinks = readBooleanEnvironment('FIT3_HIDE_LEGAL_LINKS');
const requiredEnvironment = [
  ...BASE_REQUIRED_ENVIRONMENT,
  ...(hideLegalLinks ? [] : LEGAL_ENVIRONMENT),
];
const environment = readRequiredEnvironment(requiredEnvironment);

if (hideLegalLinks) {
  const providedLegalValues = LEGAL_ENVIRONMENT.filter((name) => process.env[name]?.trim());

  if (providedLegalValues.length > 0) {
    throw new Error(
      'FIT3_HIDE_LEGAL_LINKS=true requires FIT3_SUPPORT_EMAIL, FIT3_PRIVACY_URL, and FIT3_TERMS_URL to be omitted. Set the flag to false and provide all three values before the final public release.'
    );
  }
}

const siteUrl = parseProductionHttpsUrl('FIT3_SITE_URL', environment.FIT3_SITE_URL, {
  originOnly: true,
});
const appStoreUrl = parseProductionHttpsUrl(
  'FIT3_APP_STORE_URL',
  environment.FIT3_APP_STORE_URL
);
const appStoreId = environment.FIT3_APP_STORE_ID;

if (!/^\d{5,}$/.test(appStoreId)) {
  throw new Error('FIT3_APP_STORE_ID must contain the numeric Apple App Store ID.');
}

if (appStoreUrl.hostname !== 'apps.apple.com') {
  throw new Error('FIT3_APP_STORE_URL must use the official apps.apple.com host.');
}

if (!new RegExp(`/id${appStoreId}(?:[/]|$)`).test(appStoreUrl.pathname)) {
  throw new Error('FIT3_APP_STORE_URL must contain the configured FIT3_APP_STORE_ID.');
}

const appArgument = process.env.FIT3_APP_ARGUMENT?.trim() ?? '';

if (appArgument) {
  let parsedAppArgument;

  try {
    parsedAppArgument = new URL(appArgument);
  } catch {
    throw new Error('FIT3_APP_ARGUMENT must be an absolute URL when provided.');
  }

  if (
    !parsedAppArgument.protocol ||
    ['data:', 'file:', 'javascript:'].includes(parsedAppArgument.protocol)
  ) {
    throw new Error('FIT3_APP_ARGUMENT must use a safe URL scheme.');
  }
}

export const productionConfig = {
  siteUrl: siteUrl.origin,
  supportEmail: hideLegalLinks
    ? ''
    : validateEmail('FIT3_SUPPORT_EMAIL', environment.FIT3_SUPPORT_EMAIL),
  legal: {
    linksEnabled: !hideLegalLinks,
    privacyUrl: hideLegalLinks
      ? ''
      : parseProductionHttpsUrl('FIT3_PRIVACY_URL', environment.FIT3_PRIVACY_URL).toString(),
    termsUrl: hideLegalLinks
      ? ''
      : parseProductionHttpsUrl('FIT3_TERMS_URL', environment.FIT3_TERMS_URL).toString(),
  },
  app: {
    appStoreId,
    appStoreUrl: appStoreUrl.toString(),
    appArgument,
  },
};
