import React, { useEffect, useState } from "react";
import {
  getPageOverride,
  PAGE_OVERRIDES_EVENT,
  sanitizePageHtml,
  scopePageCss,
} from "../data/pageOverrides";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function EditablePage({ pageId, children }) {
  const [override, setOverride] = useState(() => getPageOverride(pageId));

  useEffect(() => {
    const refresh = () => setOverride(getPageOverride(pageId));
    window.addEventListener(PAGE_OVERRIDES_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PAGE_OVERRIDES_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [pageId]);

  async function handleCustomFormSubmit(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();

    let status = form.querySelector(".form-note, .form-status");
    if (!status) {
      status = document.createElement("p");
      form.append(status);
    }
    status.className = "form-note form-status";

    if (!WEB3FORMS_ACCESS_KEY) {
      status.textContent = "The enquiry form is not configured yet. Please contact us by phone or email.";
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    status.textContent = "Sending your enquiry…";

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New enquiry — SPL Corporate Services");
    formData.append("from_name", "SPL Corporate Services Website");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "We couldn't send your enquiry. Please try again.");
      }
      status.textContent = "Thank you for reaching out. Your enquiry was submitted successfully.";
      status.setAttribute("role", "status");
    } catch (submissionError) {
      status.textContent = submissionError instanceof TypeError
        ? "We couldn't connect to the enquiry service. Check your connection and try again."
        : submissionError.message;
      status.setAttribute("role", "alert");
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  }

  if (!override) return children;

  return (
    <div className="custom-site-page" onSubmit={handleCustomFormSubmit}>
      {override.css && <style>{scopePageCss(override.css)}</style>}
      <div dangerouslySetInnerHTML={{ __html: sanitizePageHtml(override.html) }} />
    </div>
  );
}