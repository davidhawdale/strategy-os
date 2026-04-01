import type {
  RegisterMetadata,
  BusinessMode,
  BuildMethod,
  SystemMode,
  ParseWarning,
} from '../model/types';

export function parseMetadata(text: string): { metadata: RegisterMetadata; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];

  const created = extractSimple(text, /^Created:\s*(.+)/m);
  const lastReviewed = extractSimple(text, /^Last Reviewed:\s*(.+)/m);

  const businessModeRaw = extractSimple(text, /^Business Mode:\s*(\w+)/m);
  const businessMode = parseBusinessMode(businessModeRaw);

  const buildMethodRaw = extractSimple(text, /^Build Method:\s*(.+)/m);
  const buildMethod = parseBuildMethod(buildMethodRaw);

  const systemModeRaw = extractSimple(text, /^System Mode:\s*(\w+)/m);
  const systemMode = parseSystemMode(systemModeRaw);

  const sellReadyRaw = extractSimple(text, /^Sell Ready:\s*(yes|no|true|false)/mi);
  const sellReady = sellReadyRaw?.toLowerCase() === 'yes' || sellReadyRaw?.toLowerCase() === 'true';

  const scaleReadyRaw = extractSimple(text, /^Scale Ready:\s*(yes|no|true|false)/mi);
  const scaleReady = scaleReadyRaw?.toLowerCase() === 'yes' || scaleReadyRaw?.toLowerCase() === 'true';

  const registerVersionRaw = extractSimple(text, /^Register Version:\s*(\d+)/m);
  const registerVersion = registerVersionRaw ? parseInt(registerVersionRaw, 10) : undefined;

  // Legacy field support
  const sellGrowReadyRaw = extractSimple(text, /^Sell & Grow Ready:\s*(yes|no)/mi);
  const legacySellReady = sellGrowReadyRaw?.toLowerCase() === 'yes';

  const metadata: RegisterMetadata = {
    created,
    lastReviewed,
    businessMode,
    buildMethod,
    systemMode,
    sellReady: sellReady || legacySellReady,
    scaleReady,
    registerVersion,
  };

  return { metadata, warnings };
}

function extractSimple(text: string, pattern: RegExp): string | undefined {
  const match = text.match(pattern);
  return match ? match[1].trim() : undefined;
}

function parseBusinessMode(raw: string | undefined): BusinessMode | undefined {
  if (!raw) return undefined;
  const upper = raw.toUpperCase();
  if (upper === 'VENTURE') return 'VENTURE';
  if (upper === 'BOOTSTRAP') return 'BOOTSTRAP';
  if (upper === 'HYBRID') return 'HYBRID';
  return undefined;
}

function parseBuildMethod(raw: string | undefined): BuildMethod | undefined {
  if (!raw) return undefined;
  const upper = raw.toUpperCase().replace(/\s+/g, '_');
  if (upper === 'AUTONOMOUS') return 'AUTONOMOUS';
  if (upper === 'GOVERNOR_AUTHORED') return 'GOVERNOR_AUTHORED';
  if (upper === 'MIXED') return 'MIXED';
  return undefined;
}

function parseSystemMode(raw: string | undefined): SystemMode | undefined {
  if (!raw) return undefined;
  const upper = raw.toUpperCase();
  if (upper === 'BUILD') return 'BUILD';
  if (upper === 'CHALLENGE') return 'CHALLENGE';
  if (upper === 'REVIEW') return 'REVIEW';
  return undefined;
}
