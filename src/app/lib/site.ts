/**
 * Canonical site origin — one definition, used by every metadata producer.
 *
 * This was previously copy-pasted into seven files, half of which read the env
 * var and half of which hardcoded the domain. That drift is how canonical tags
 * and hreflang alternates end up disagreeing with each other.
 *
 * No trailing slash: every consumer builds `${SITE_URL}/path`.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profinancesolutions.az'
).replace(/\/+$/, '');
