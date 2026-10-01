import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { services, otherServices } from "../data/services";

const FORMSPREE_FORM_ID = "xppwjgar";

export default function EnquiryForm({ defaultService = "" }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
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

      <ValidationError prefix="Name" field="name" errors={state.errors} />
      <ValidationError prefix="Phone" field="phone" errors={state.errors} />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <ValidationError prefix="Service" field="service" errors={state.errors} />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button className="btn primary" type="submit" disabled={state.submitting}>
        {state.submitting ? "Sending..." : "Send Enquiry →"}
      </button>
    </form>
  );
}
