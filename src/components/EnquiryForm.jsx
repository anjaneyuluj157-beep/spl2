import React, { useState } from "react";
import { services, otherServices } from "../data/services";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function EnquiryForm({ defaultService = "" }) {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    if (!WEB3FORMS_ACCESS_KEY) {
      setError("The enquiry form is not configured yet. Please contact us by phone or email.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New enquiry — SPL Corporate Services");
    formData.append("from_name", "SPL Corporate Services Website");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "We couldn't send your enquiry. Please try again.");
      }

      setSucceeded(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof TypeError
          ? "We couldn't connect to the enquiry service. Check your internet connection and try again."
          : submissionError.message,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (succeeded) {
    return (
      <div className="success-box" role="status" aria-live="polite">
        <div className="success-icon">✓</div>
        <h3>Enquiry submitted successfully</h3>
        <p>
          Thank you for reaching out. Our team will review your enquiry and get
          back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>

        <label>
          Phone
          <input
            name="phone"
            type="tel"
            required
            placeholder="Your phone number"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Service
          <select name="service" defaultValue={defaultService} required>
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            {otherServices.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="full">
          Message
          <textarea
            name="message"
            required
            placeholder="Tell us what you need help with..."
          />
        </label>
      </div>

      {error && <p className="form-note" role="alert">{error}</p>}

      <button className="btn primary" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Enquiry →"}
      </button>
    </form>
  );
}
