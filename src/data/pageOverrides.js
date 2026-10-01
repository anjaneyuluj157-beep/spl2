import DOMPurify from "dompurify";

export const PAGE_OVERRIDES_KEY = "spl-page-overrides";
export const PAGE_OVERRIDES_EVENT = "spl-page-overrides-change";
const PUBLISHED_OVERRIDES_URL = `${import.meta.env.BASE_URL}site-edits.json`;
let publishedOverrides = {};

export const EDITABLE_PAGES = [
  { id: "navbar", name: "Navbar links" },
  { id: "home", name: "Home page" },
  { id: "about", name: "About page" },
  { id: "services", name: "Services page" },
  { id: "arjun", name: "Arjun page" },
  { id: "service-detail", name: "Service detail template" },
  { id: "knowledge", name: "Knowledge Bank" },
  { id: "team-detail", name: "Team profile template" },
  { id: "contact", name: "Contact page" },
];

export function getPageOverrides() {
  try {
    const saved = window.localStorage.getItem(PAGE_OVERRIDES_KEY);
    return { ...publishedOverrides, ...(saved ? JSON.parse(saved) : {}) };
  } catch {
    return publishedOverrides;
  }
}

export async function loadPublishedPageOverrides() {
  try {
    const response = await fetch(PUBLISHED_OVERRIDES_URL, { cache: "no-store" });
    if (!response.ok) return false;
    const content = await response.json();
    if (!content || typeof content !== "object" || Array.isArray(content)) return false;
    publishedOverrides = content;
    window.dispatchEvent(new Event(PAGE_OVERRIDES_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function getPageOverride(pageId) {
  const override = getPageOverrides()[pageId];
  return override && typeof override.html === "string" ? override : null;
}

export function savePageOverride(pageId, content) {
  const overrides = getPageOverrides();
  overrides[pageId] = { html: content.html, css: content.css };

  try {
    window.localStorage.setItem(PAGE_OVERRIDES_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new Event(PAGE_OVERRIDES_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function removePageOverride(pageId) {
  const overrides = getPageOverrides();
  overrides[pageId] = null;

  try {
    window.localStorage.setItem(PAGE_OVERRIDES_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new Event(PAGE_OVERRIDES_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function sanitizePageHtml(html) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true, svg: true },
    FORBID_TAGS: ["style", "script", "iframe", "object", "embed"],
    FORBID_ATTR: ["style"],
  });
}

export function scopePageCss(css) {
  const safeCss = css
    .replace(/@import[^;]*;?/gi, "")
    .replace(/expression\s*\(/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/:root(?=\s*[,{])/gi, ":scope")
    .replace(/<\/style/gi, "\\3C /style");

  return safeCss.trim() ? `@scope (.custom-site-page) {\n${safeCss}\n}` : "";
}

export function updatePublishedPageOverrides(overrides) {
  publishedOverrides = overrides;
  window.dispatchEvent(new Event(PAGE_OVERRIDES_EVENT));
}