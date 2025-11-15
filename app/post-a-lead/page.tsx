
import Link from "next/link";
/ app/post-a-lead/page.tsx
"use client";

import React, { useState } from "react";

export const metadata = {
  title: "Post a Lead | TakeaChefHome",
};

export default function PostALeadPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | { type: "ok" | "error"; text: string }>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      budgetMin: Number(formData.get("budgetMin") || 0),
      budgetMax: Number(formData.get("budgetMax") || 0),
      city: formData.get("city"),
      state: formData.get("state"),
      eventType: formData.get("eventType"),
      eventDate: formData.get("eventDate"),
      guestCount: Number(formData.get("guestCount") || 0),
      contactName: formData.get("contactName"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      notes: formData.get("notes"),
      serviceType: formData.get("serviceType"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessage({ type: "ok", text: "Lead posted. We’ll review and follow up shortly." });
      e.currentTarget.reset();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Could not submit your lead. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tch-page-shell">
      <div className="tch-page-inner">
        <header className="tch-page-header">
          <h1>Post a Lead</h1>
          <p>
            Drop your event details once. We’ll route it to the right chefs, caterers, or HoneyPott team
            and get you a fast response.
          </p>
        </header>

        <main className="tch-card">
          <div className="tch-card-title">Tell us what you need</div>

          {message && (
            <div
              className={
                "tch-alert " +
                (message.type === "ok" ? "tch-alert-success" : "tch-alert-error")
              }
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="tch-grid">
            {/* LEFT COLUMN */}
            <div className="tch-column">
              <div className="tch-field">
                <label htmlFor="title">Headline</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Chef for birthday dinner in Atlanta"
                  required
                />
              </div>

              <div className="tch-field">
                <label htmlFor="description">What’s the vision?</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Tell us about the event, food style, dietary needs, and any must-haves."
                  required
                />
              </div>

              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="eventType">Event type</label>
                  <input id="eventType" name="eventType" placeholder="Birthday, retreat, wedding…" />
                </div>
                <div className="tch-field">
                  <label htmlFor="eventDate">Event date</label>
                  <input id="eventDate" name="eventDate" type="date" />
                </div>
              </div>

              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" placeholder="City" required />
                </div>
                <div className="tch-field">
                  <label htmlFor="state">State</label>
                  <input id="state" name="state" placeholder="State" />
                </div>
              </div>

              <div className="tch-field">
                <label htmlFor="guestCount">Guest count</label>
                <input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min={1}
                  placeholder="e.g. 25"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="tch-column">
              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="budgetMin">Budget min (USD)</label>
                  <input id="budgetMin" name="budgetMin" type="number" min={0} />
                </div>
                <div className="tch-field">
                  <label htmlFor="budgetMax">Budget max (USD)</label>
                  <input id="budgetMax" name="budgetMax" type="number" min={0} />
                </div>
              </div>

              <div className="tch-field">
                <label htmlFor="serviceType">Service type</label>
                <select id="serviceType" name="serviceType" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Drop-off">Drop-off only</option>
                  <option value="Full Service">Full-service event</option>
                  <option value="Private Chef">Private chef in-home</option>
                  <option value="Other">Other / Not sure</option>
                </select>
              </div>

              <div className="tch-field">
                <label htmlFor="notes">Extra notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Parking, kitchen access, multiple days, contracts, etc."
                />
              </div>

              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="contactName">Contact name</label>
                  <input id="contactName" name="contactName" placeholder="Your name" required />
                </div>
                <div className="tch-field">
                  <label htmlFor="contactPhone">Phone</label>
                  <input id="contactPhone" name="contactPhone" placeholder="Best number" />
                </div>
              </div>

              <div className="tch-field">
                <label htmlFor="contactEmail">Email</label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <div className="tch-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Posting lead…" : "Post Lead to Marketplace"}
                </button>
                <p className="tch-small">
                  We’ll never sell your info. Leads are reviewed before going live to keep the marketplace clean.
                </p>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
