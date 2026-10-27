/**
 * F121 — Unified Search and Commands
 *
 * Implements role-safe global omni-search (Cmd+K) across clients, appointments,
 * clinical documents, studio settings, and command shortcuts.
 *
 * KEY INVARIANT (Basis: I; Ease of Use, WB F60):
 * Role-Safe Results & Snippet Privacy. Search never reveals a restricted note
 * or clinical diagnosis through its snippet to an unauthorized role. Booth renters
 * and staff cannot view isolated practitioner notes or restricted studio financial commands.
 */

export type SearchRole = 'owner' | 'manager' | 'practitioner' | 'booth_renter' | 'receptionist';

export type SearchCategory = 'client' | 'appointment' | 'document' | 'setting' | 'command';

export interface SearchableItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  snippet?: string;
  /** Clinical or financial sensitive text that must not leak to unauthorized roles */
  restrictedSnippet?: string;
  requiredRoles?: SearchRole[];
  /** Practitioner owner ID for practitioner/booth-renter isolation */
  practitionerId?: string;
  actionRoute: string;
  actionType: 'navigate' | 'modal' | 'command';
  keywords?: string[];
}

export interface SearchQueryContext {
  query: string;
  userRole: SearchRole;
  userId: string;
  /** Whether the user is an independent booth renter with strict isolation */
  isBoothRenter?: boolean;
}

export interface SearchResultEntry {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  displaySnippet: string;
  isSnippetRedacted: boolean;
  score: number;
  actionRoute: string;
  actionType: 'navigate' | 'modal' | 'command';
}

export interface UnifiedSearchResponse {
  query: string;
  totalMatches: number;
  resultsByCategory: Record<SearchCategory, SearchResultEntry[]>;
  topResults: SearchResultEntry[];
  executionTimeMs: number;
}

/**
 * Searches studio records and commands with strict role-based permission filters
 * and clinical snippet redaction.
 */
export function executeUnifiedSearch(
  items: SearchableItem[],
  context: SearchQueryContext
): UnifiedSearchResponse {
  const startTime = Date.now();
  const trimmed = context.query.trim().toLowerCase();

  const resultsByCategory: Record<SearchCategory, SearchResultEntry[]> = {
    client: [],
    appointment: [],
    document: [],
    setting: [],
    command: [],
  };

  const matches: SearchResultEntry[] = [];

  for (const item of items) {
    // 1. Role Authorization Check
    if (item.requiredRoles && item.requiredRoles.length > 0) {
      if (!item.requiredRoles.includes(context.userRole)) {
        continue; // Role lacks permission to even see this item or command
      }
    }

    // 2. Booth Renter & Independent Practitioner Privacy Firewall (WB F57)
    if (context.isBoothRenter && item.practitionerId && item.practitionerId !== context.userId) {
      continue; // Firewalled from viewing another practitioner's client or document
    }

    // 3. Relevance Match Scoring
    const titleLower = item.title.toLowerCase();
    const subLower = item.subtitle.toLowerCase();
    const snippetLower = (item.snippet || '').toLowerCase();
    const keywords = (item.keywords || []).map((k) => k.toLowerCase());

    let score = 0;

    if (!trimmed) {
      // Empty query returns default high-priority commands
      if (item.category === 'command') score = 50;
      else continue;
    } else if (titleLower === trimmed) {
      score = 100;
    } else if (titleLower.startsWith(trimmed)) {
      score = 80;
    } else if (titleLower.includes(trimmed)) {
      score = 60;
    } else if (subLower.includes(trimmed)) {
      score = 40;
    } else if (keywords.some((kw) => kw.includes(trimmed))) {
      score = 35;
    } else if (snippetLower.includes(trimmed)) {
      score = 20;
    } else {
      continue; // No match
    }

    // 4. Invariant: Snippet Privacy & Clinical Redaction
    // Receptionists and unauthorized staff must never see sensitive clinical notes in previews
    let displaySnippet = item.snippet || '';
    let isSnippetRedacted = false;

    if (item.restrictedSnippet) {
      const canViewClinical = context.userRole === 'owner' ||
        (context.userRole === 'practitioner' && (!item.practitionerId || item.practitionerId === context.userId));

      if (canViewClinical) {
        displaySnippet = item.restrictedSnippet;
      } else {
        displaySnippet = '[Restricted Clinical / Financial Record Redacted]';
        isSnippetRedacted = true;
      }
    }

    const entry: SearchResultEntry = {
      id: item.id,
      category: item.category,
      title: item.title,
      subtitle: item.subtitle,
      displaySnippet,
      isSnippetRedacted,
      score,
      actionRoute: item.actionRoute,
      actionType: item.actionType,
    };

    resultsByCategory[item.category].push(entry);
    matches.push(entry);
  }

  // Sort descending by score
  matches.sort((a, b) => b.score - a.score);

  return {
    query: context.query,
    totalMatches: matches.length,
    resultsByCategory,
    topResults: matches.slice(0, 10),
    executionTimeMs: Math.max(1, Date.now() - startTime),
  };
}
