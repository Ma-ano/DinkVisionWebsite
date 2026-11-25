"use client";
import { useRef, useState } from "react";
import { businessEmail } from "@/lib/site";
import { prepareDraft } from "./action";
export default function QuoteForm({ custom = false }: { custom?: boolean }) {
  const [pending, setPending] = useState(false),
    [error, setError] = useState(""),
    [draft, setDraft] = useState("");
  const locked = useRef(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (locked.current) return;
    const data = new FormData(e.currentTarget);
    locked.current = true;
    setPending(true);
    setError("");
    setDraft("");
    try {
      const result = await prepareDraft(data);
      if (result.error) setError(result.error);
      else {
        setDraft(result.url);
        window.location.href = result.url;
      }
    } catch {
      setError(
        "Your draft could not be prepared. Try again or email WrenLabs directly.",
      );
    } finally {
      locked.current = false;
      setPending(false);
    }
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
      <fieldset disabled={pending}>
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
          {pending ? "Preparing draft…" : custom ? "Email my project inquiry" : "Email my quote request"}{" "}
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
