// app/post-a-lead/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      clientName: formData.get("clientName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventType: formData.get("eventType") as string,
      eventDate: formData.get("eventDate") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      guestCount: formData.get("guestCount") as string,
      budgetMin: formData.get("budgetMin") as string,
      budgetMax: formData.get("budgetMax") as string,
      serviceType: formData.get("serviceType") as string,
      notes: formData.get("notes") as string,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("Your event has been submitted. A chef will contact you soon.");
      (e.target as HTMLFormElement).reset();

      // Optional: redirect back home after a short delay
      // setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to submit lead");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400/80">
            Post an Event
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Tell us about your event.
          </h1>
          <p className="text-sm text-slate-300">
            Fill this out once. We’ll match you with available chefs in your area.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium mb-1">Your Name *</label>
              <input
                required
                name="clientName"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Email *</label>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Phone</label>
              <input
                name="phone"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Event Type *</label>
              <input
                required
                name="eventType"
                placeholder="Birthday dinner, wedding, brunch, retreat..."
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Event Date *</label>
              <input
                required
                type="date"
                name="eventDate"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">City *</label>
              <input
                required
                name="city"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">State</label>
              <input
                name="state"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Guest Count *</label>
              <input
                required
                type="number"
                min={1}
                name="guestCount"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-xs font-medium mb-1">Budget Min ($)</label>
              <input
                type="number"
                name="budgetMin"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Budget Max ($)</label>
              <input
                type="number"
                name="budgetMax"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Service Type *</label>
              <select
                required
                name="serviceType"
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Drop-off Catering">Drop-off Catering</option>
                <option value="Full Service Catering">Full Service Catering</option>
                <option value="Private Chef Dinner">Private Chef Dinner</option>
                <option value="Meal Prep / Weekly Chef">Meal Prep / Weekly Chef</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Tell us about the vibe, cuisine, or any dietary needs
            </label>
            <textarea
              name="notes"
              rows={4}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm"
            />
          </div>

          {message && (
            <p className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-700 rounded-lg px-3 py-2">
              {message}
            </p>
          )}
          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-700 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Submitting..." : "Submit Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
