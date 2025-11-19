
"use client";

import React, { useState } from "react";

export default function PostALeadPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const res = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      setSuccess("Lead sent successfully!");
      setForm({ name: "", email: "", phone: "", details: "" });
    } else {
      setSuccess("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h1>Post a Lead</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Event details"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit Lead"}
        </button>
      </form>

      {success && <p>{success}</p>}
    </div>
  );
}

