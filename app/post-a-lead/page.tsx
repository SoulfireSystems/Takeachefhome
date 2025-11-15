"use client";

import { FormEvent, useState } from "react";

type LeadFormState = {
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  state: string;
  guestCount: string;
  budgetMin: string;
  budgetMax: string;
  serviceType: string;
  notes: string;
};

const initialForm: LeadFormState = {
  title: "",
  description: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  city: "",
  state: "",
  guestCount: "",
  budgetMin: "",
  budgetMax: "",
  serviceType: "Full Service",
  notes: "",
};

export default function PostALeadPage() {
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(
    null
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const payload = {
        title: form.title || `${form.eventType || "Event"} in ${form.city || ""}`,
        description: form.description,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        eventDate: form.eventDate ? new Date(form.eventDate).toISOString() : null,
        city: form.city,
        state: form.state,
        guestCount: form.guestCount ? Number(form.guestCount) : null,
        budgetMin: form.budgetMin ? Number(form.budgetMin) : null,
        budgetMax: form.budgetMax ? Number(form.budgetMax) : null,
        serviceType: form.serviceType,
        notes: form.notes,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({ ok: true, message: "Your lead was posted successfully." });
      setForm(initialForm);
    } catch (err: any) {
      setStatus({
        ok: false,
        message: err.message || "Could not submit your lead.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="tch-page-shell">
      <div className="tch-page-inner">
        <header className="tch-page-header">
          <h1>Post a Catering Lead</h1>
          <p>
            Tell us about your event and we’ll connect you with serious chefs,
            not random inbox noise.
          </p>
        </header>

        <section className="tch-card">
          <h2 className="tch-card-title">Event & Contact Details</h2>

          {status && (
            <div
              className={
                status.ok ? "tch-alert tch-alert-success" : "tch-alert tch-alert-error"
              }
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="tch-grid">
            {/* Left column */}
            <div className="tch-column">
              <div className="tch-field">
                <label htmlFor="title">Event Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Thanksgiving Dinner in El Paso"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="tch-field">
                <label htmlFor="eventType">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an event type</option>
                  <option value="Private Dinner">Private Dinner</option>
                  <option value="Holiday Catering">Holiday Catering</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Wedding / Reception">Wedding / Reception</option>
                  <option value="Meal Prep / Weekly Chef">
                    Meal Prep / Weekly Chef
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="eventDate">Event Date</label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="tch-field">
                  <label htmlFor="guestCount">Guest Count</label>
                  <input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    min={1}
                    placeholder="e.g. 40"
                    value={form.guestCount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="El Paso"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="tch-field">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="TX"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="tch-field">
                <label htmlFor="serviceType">Service Type</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                >
                  <option value="Drop-Off">Drop-Off</option>
                  <option value="Full Service">Full Service</option>
                  <option value="Private Chef">Private Chef</option>
                  <option value="Meal Prep">Meal Prep</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="budgetMin">Budget (Min)</label>
                  <input
                    id="budgetMin"
                    name="budgetMin"
                    type="number"
                    placeholder="e.g. 750"
                    value={form.budgetMin}
                    onChange={handleChange}
                  />
                </div>

                <div className="tch-field">
                  <label htmlFor="budgetMax">Budget (Max)</label>
                  <input
                    id="budgetMax"
                    name="budgetMax"
                    type="number"
                    placeholder="e.g. 1500"
                    value={form.budgetMax}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="tch-column">
              <div className="tch-inline">
                <div className="tch-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="tch-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="tch-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="tch-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="tch-field">
                <label htmlFor="description">What do you need?</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Tell us the vibe, menu ideas, dietary needs, and anything a chef should know."
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="tch-field">
                <label htmlFor="notes">Extra Notes (optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Parking, building access, preferred times, etc."
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="tch-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Posting your lead..." : "Post Lead"}
                </button>
                <p className="tch-small">
                  You’ll get replies directly by email or phone. Keep an eye on your
                  inbox.
                </p>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
