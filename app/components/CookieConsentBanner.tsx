"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) setVisible(true);
  }, []);

  function save(prefs: CookiePreferences) {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setVisible(false);
  }

  function acceptAll() {
    save({ essential: true, analytics: true, marketing: true });
  }

  function rejectNonEssential() {
    save({ essential: true, analytics: false, marketing: false });
  }

  function savePreferences() {
    save(preferences);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
        >
          <div className="mx-auto max-w-6xl px-5 py-6 xl:px-8">
            <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
              This website uses cookies to provide our services and improve your
              experience. Read more in our{" "}
              <Link
                href="/privacy"
                className="underline hover:text-[var(--color-text)]"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="rounded border border-[var(--color-text)] bg-[var(--color-text)] px-4 py-2 text-[12px] tracking-[0.12em] text-[var(--color-bg)] transition hover:opacity-80"
              >
                ACCEPT ALL COOKIES
              </button>
              <button
                onClick={rejectNonEssential}
                className="rounded border border-[var(--color-border-strong)] px-4 py-2 text-[12px] tracking-[0.12em] text-[var(--color-text)] transition hover:bg-[var(--color-input-bg)]"
              >
                REJECT NON-ESSENTIAL
              </button>
              <button
                onClick={() => setShowChoices((v) => !v)}
                className="rounded border border-[var(--color-border-strong)] px-4 py-2 text-[12px] tracking-[0.12em] text-[var(--color-text)] transition hover:bg-[var(--color-input-bg)]"
              >
                YOUR PRIVACY CHOICES
              </button>
            </div>

            <AnimatePresence>
              {showChoices && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-4 border-t border-[var(--color-border)] pt-5">
                    <Toggle
                      label="Essential Cookies"
                      description="Required for the website to function. Cannot be disabled."
                      checked={true}
                      disabled
                    />
                    <Toggle
                      label="Analytics Cookies"
                      description="Help us understand how visitors interact with our website."
                      checked={preferences.analytics}
                      onChange={(v) =>
                        setPreferences((p) => ({ ...p, analytics: v }))
                      }
                    />
                    <Toggle
                      label="Marketing Cookies"
                      description="Used to deliver relevant advertisements and track campaigns."
                      checked={preferences.marketing}
                      onChange={(v) =>
                        setPreferences((p) => ({ ...p, marketing: v }))
                      }
                    />

                    <button
                      onClick={savePreferences}
                      className="mt-2 rounded border border-[var(--color-text)] bg-[var(--color-text)] px-4 py-2 text-[12px] tracking-[0.12em] text-[var(--color-bg)] transition hover:opacity-80"
                    >
                      SAVE PREFERENCES
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[13px] font-medium text-[var(--color-text)]">
          {label}
        </p>
        <p className="text-[12px] text-[var(--color-text-subtle)]">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        } ${checked ? "bg-[var(--color-text)]" : "bg-[var(--color-border-strong)]"}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-[var(--color-bg)] transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
