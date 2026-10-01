export const SITE_LAYOUT_KEY = "spl-site-layout";
export const SITE_LAYOUT_EVENT = "spl-site-layout-change";
export const DEFAULT_SITE_LAYOUT = "balanced";

export const SITE_LAYOUTS = [
  {
    id: "balanced",
    name: "Balanced split",
    description: "The current two-column hero with a spacious service panel.",
  },
  {
    id: "centered",
    name: "Centered focus",
    description: "Center the headline and calls to action for a bold welcome.",
  },
  {
    id: "compact",
    name: "Compact overview",
    description: "Reduce the hero height and tighten the content spacing.",
  },
];

export function getSiteLayout() {
  try {
    const savedLayout = window.localStorage.getItem(SITE_LAYOUT_KEY);
    return SITE_LAYOUTS.some(({ id }) => id === savedLayout)
      ? savedLayout
      : DEFAULT_SITE_LAYOUT;
  } catch {
    return DEFAULT_SITE_LAYOUT;
  }
}

export function saveSiteLayout(layout) {
  if (!SITE_LAYOUTS.some(({ id }) => id === layout)) return;

  try {
    window.localStorage.setItem(SITE_LAYOUT_KEY, layout);
    window.dispatchEvent(new Event(SITE_LAYOUT_EVENT));
  } catch {
    // Keep the app usable if browser storage is unavailable.
  }
}