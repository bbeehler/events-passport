// Event Passport — connection settings.
// The publishable key is safe to expose in the browser: all data access is
// locked down by row-level security and the database functions.
window.PASSPORT_CONFIG = {
  SUPABASE_URL: "https://gqmiernpykoeuzoowerl.supabase.co",
  SUPABASE_KEY: "sb_publishable_ur32fTjNooqxMAoRHD5RFA_dy5_7FqM",
  // Default look before an event's own colours load (AIA Canada)
  DEFAULT_BRAND: "#003B71",
  DEFAULT_ACCENT: "#E4002B",
  ORG_NAME: "AIA Canada",
  // AIA Canada logo shown across the app (attendee header, admin, big screen, printouts).
  // Put the file at this path in the repo. A full-colour logo works best — it sits on a white chip.
  ORG_LOGO: "assets/aia-canada-logo.png",
};
