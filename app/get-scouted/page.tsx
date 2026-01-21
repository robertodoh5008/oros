"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  country: string;
  discipline: string;
  links: string;
  statement: string;
};

export default function GetScouted() {
  const [accepted, setAccepted] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    country: "",
    discipline: "",
    links: "",
    statement: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const disciplines = useMemo(
    () => ["Models", "Artists & Musicians", "Photographers", "Videographers", "Creators", "Performers"],
    []
  );

  const isFormEnabled = accepted && confirm;
  const isFormValid =
    isFormEnabled &&
    form.name &&
    form.email &&
    form.country &&
    form.discipline;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/get-scouted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        country: "",
        discipline: "",
        links: "",
        statement: "",
      });
      setAccepted(false);
      setConfirm(false);
    }
  }

  return (
    <main className="relative z-10 min-h-screen bg-black pt-28">
      <div className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
        <div className="mb-2 text-[11px] tracking-[0.28em] text-white/55">APPLICATION</div>

        <h1 className="font-serif text-[40px] leading-[1.06] md:text-[54px]">
          Get scouted for The House of OROS Institute
        </h1>

        <div className="mt-6 space-y-4 text-[15px] leading-[1.9] text-white/70">
          <p>
            Applying to The House of OROS Institute is an expression of interest in professional development,
            strategic guidance, and long-term growth.
          </p>
          <p>
            Applying does not guarantee acceptance or representation. Each application is reviewed with care
            and discernment.
          </p>
          <p>
            Selected applicants may be invited to a consultation to explore alignment and next steps.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="font-serif text-[22px]">Begin Application</div>

          {/* Required acceptance */}
          <div className="mt-6 space-y-3 text-sm text-white/75">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-white"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                I accept the{" "}
                <a className="underline hover:text-white" href="/privacy">Privacy Policy</a> and{" "}
                <a className="underline hover:text-white" href="/terms">Terms & Conditions</a>.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-white"
                checked={confirm}
                onChange={(e) => setConfirm(e.target.checked)}
              />
              <span>I understand that submission does not guarantee acceptance.</span>
            </label>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <Field
              label="Full Name"
              placeholder="Your full name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              disabled={!isFormEnabled}
            />

            <Field
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              disabled={!isFormEnabled}
            />

            <Field
              label="Country of Residence"
              placeholder="Country"
              value={form.country}
              onChange={(v) => setForm({ ...form, country: v })}
              disabled={!isFormEnabled}
            />

            <div>
              <div className="mb-2 text-[11px] tracking-[0.22em] text-white/55">
                PRIMARY DISCIPLINE
              </div>
              <select
                value={form.discipline}
                onChange={(e) => setForm({ ...form, discipline: e.target.value })}
                disabled={!isFormEnabled}
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-40"
              >
                <option value="">Select</option>
                {disciplines.map((d) => (
                  <option key={d} value={d} className="bg-black">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <Field
              label="Portfolio / Website / Social Links"
              placeholder="Links (comma separated)"
              value={form.links}
              onChange={(v) => setForm({ ...form, links: v })}
              disabled={!isFormEnabled}
            />

            <div>
              <div className="mb-2 text-[11px] tracking-[0.22em] text-white/55">
                WHY ARE YOU APPLYING?
              </div>
              <textarea
                value={form.statement}
                onChange={(e) => setForm({ ...form, statement: e.target.value })}
                disabled={!isFormEnabled}
                rows={5}
                className="w-full resize-none rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-40"
                placeholder="Short statement..."
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="mt-2 inline-flex w-fit rounded-full border border-white/25 px-6 py-3 text-[12px] tracking-[0.22em] text-white disabled:opacity-40"
            >
              {loading ? "SUBMITTING…" : "SUBMIT APPLICATION"}
            </button>

            {success && (
              <p className="mt-4 text-sm text-white/70">
                Application received. Our team will review and respond if aligned.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  disabled,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[11px] tracking-[0.22em] text-white/55">
        {label.toUpperCase()}
      </div>
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-40"
        placeholder={placeholder}
      />
    </div>
  );
}
