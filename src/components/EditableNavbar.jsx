import React, { useEffect, useState } from "react";
import {
  getPageOverride,
  PAGE_OVERRIDES_EVENT,
  sanitizePageHtml,
  scopePageCss,
} from "../data/pageOverrides";

export default function EditableNavbar({ className, onClick, children }) {
  const [override, setOverride] = useState(() => getPageOverride("navbar"));

  useEffect(() => {
    const refresh = () => setOverride(getPageOverride("navbar"));
    window.addEventListener(PAGE_OVERRIDES_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PAGE_OVERRIDES_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (!override) {
    return <nav className={className} onClick={onClick}>{children}</nav>;
  }

  const safeNavbarHtml = sanitizePageHtml(override.html);
  const arjunHrefPattern = /href\s*=\s*["']\/arjun(?:[/?#][^"']*)?["']/i;
  const hasArjunLink = arjunHrefPattern.test(safeNavbarHtml);
  const arjunWasDeclared = arjunHrefPattern.test(override.html);
  const navbarHtml = hasArjunLink || arjunWasDeclared
    ? safeNavbarHtml
    : `${safeNavbarHtml}<a href="/arjun">Arjun</a>`;

  return (
    <>
      {override.css && <style>{scopePageCss(override.css)}</style>}
      <nav className={`${className || ""} custom-site-page custom-site-navbar`} onClick={onClick} dangerouslySetInnerHTML={{ __html: navbarHtml }} />
    </>
  );
}
