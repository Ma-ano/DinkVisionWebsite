"use client";
import { useState, useSyncExternalStore } from "react";
import { businessEmail } from "@/lib/site";
import { prepareDraft } from "./draft";

function subscribeToHydration() {
  return () => {};
}
export default function QuoteForm({ custom = false }: { custom?: boolean }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = prepareDraft(new FormData(event.currentTarget));
    setError(result.error);
    setDraft(result.url);
    if (result.url) window.location.href = result.url;
  }

  return (
    <form
      onSubmit={submit}
      onChange={() => {
        setDraft("");
        setError("");
      }}
      className="quote-form"
    >
      <h2>{custom ? "Discuss your idea" : "Request a quote"}</h2>
      <p>
        {custom
          ? "Tell us about your custom application project."
          : "Tell us about the courts you want to equip."}
      </p>
      <input
        type="hidden"
        name="inquiry"
        value={custom ? "custom-application" : "dinkvision"}
      />
      <fieldset disabled={!hydrated}>
        <div className="fields">
          <label className="wide">
            {custom ? "Company or organization (optional)" : "Venue name"}
            <input
              name="venue"
              autoComplete="organization"
              required={!custom}
              maxLength={120}
              placeholder={
                custom ? "Company or organization" : "Court or club name"
              }
            />
          </label>
          {!custom && (
            <>
              <label>
                City or province
                <input
                  name="city"
                  autoComplete="address-level2"
                  required
                  maxLength={120}
                  placeholder="Venue location"
                />
              </label>
              <label>
                Number of courts
                <input
                  name="courts"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  required
                  placeholder="Courts to equip"
                />
              </label>
            </>
          )}
          <label>
            Contact name
            <input
              name="contact"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="Your name"
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              autoComplete="email"
              type="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
          <label className="wide">
            {custom
              ? "What would you like to build?"
              : "Existing equipment or setup notes (optional)"}
            <textarea
              name="notes"
              rows={custom ? 5 : 2}
              required={custom}
              maxLength={1000}
              placeholder={
                custom
                  ? "Describe your idea, goals and workflows."
                  : "Tell us about any existing tablets or cameras."
              }
            />
          </label>
        </div>
        <button className="btn" type="submit">
          {custom ? "Email my project inquiry" : "Email my quote request"}{" "}
          <span aria-hidden>↗</span>
        </button>
      </fieldset>
      <div role="status">
        {error && <p className="error">{error}</p>}
        {draft && (
          <p>
            Send the draft from your email app to complete your request.{" "}
            <a href={draft}>Open draft again</a>.
          </p>
        )}
      </div>
      <small>
        Send the draft to{" "}
        <a href={"mailto:" + businessEmail}>{businessEmail}</a>.
      </small>
    </form>
  );
}
