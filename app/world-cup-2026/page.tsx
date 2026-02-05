export default function WorldCupPage() {
  return (
    <main className="min-h-screen bg-white pt-24 text-black">
      <div className="mx-auto max-w-4xl px-6 py-16 leading-relaxed">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight">
          International Protocol & Hospitality Office — World Cup 2026
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Operated by OROS — Designated Operating and Coordination Entity
        </p>

        {/* Mandate */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Mandate Statement</h2>
          <p className="mt-4">
            The International Protocol & Hospitality Office — World Cup 2026 (the “Office”) operates as a dedicated coordination and protocol-aligned access body for royal households, sovereign principals, and ultra-high-net-worth families attending the FIFA World Cup 2026.
          </p>

          <p className="mt-4">
            OROS serves as the designated operating entity under mandate from a private equity multi-family office, entrusted with the execution, coordination, and oversight of protocol-sensitive attendance, movement, and hospitality requirements.
          </p>

          <p className="mt-4">
            The Office functions in alignment with FIFA, host city committees, and relevant local authorities, and does not operate in competition with official FIFA hospitality programs.
          </p>
        </section>

        {/* Scope */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Scope of Coordination</h2>

          <p className="mt-4">
            Engagements are structured to ensure discretion, continuity, and cultural respect. Depending on mandate level and protocol requirements, coordination may include:
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2">
            <li>Protocol-aligned access planning and liaison</li>
            <li>Aviation coordination (shared or chartered solutions)</li>
            <li>Maritime hospitality coordination (Miami, Los Angeles, New York)</li>
            <li>Secured private residences and hospitality suites</li>
            <li>Curated private dinners and cultural engagements</li>
            <li>Host city, venue, and authority liaison</li>
            <li>Optional and controlled media coordination, subject to client preference</li>
          </ul>

          <p className="mt-4">
            All services are modular and deployed based on duration, exclusivity requirements, and cultural considerations.
          </p>
        </section>

        {/* Client Eligibility */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Client Eligibility</h2>

          <p className="mt-4">
            Engagements are conducted strictly by referral or institutional introduction.
          </p>

          <p className="mt-4">The Office serves:</p>

          <ul className="mt-4 list-disc pl-6 space-y-2">
            <li>Royal and traditional sovereign households</li>
            <li>Sovereign wealth and state-connected principals</li>
            <li>Ultra-high-net-worth family offices</li>
          </ul>

          <p className="mt-4">
            The Office does not engage in public offerings or open enrollment.
          </p>
        </section>

        {/* Cultural Considerations */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Cultural & Diplomatic Considerations</h2>

          <p className="mt-4">
            The Office recognizes traditional governance, cultural lineage, ceremonial authority, and diplomatic sensitivity as integral components of protocol.
          </p>

          <p className="mt-4">All engagements are designed to respect:</p>

          <ul className="mt-4 list-disc pl-6 space-y-2">
            <li>Cultural and religious observances</li>
            <li>Family privacy and visibility preferences</li>
            <li>Security postures specific to region and household</li>
          </ul>
        </section>

        {/* Confidentiality */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Confidentiality Notice</h2>

          <p className="mt-4">
            All information contained herein is confidential and intended solely for its recipient.
          </p>

          <p className="mt-4">
            Distribution, reproduction, or disclosure without prior authorization is prohibited. Engagements are subject to formal confidentiality agreements and operate on a strict need-to-know basis.
          </p>

          <p className="mt-4">
            For authorized inquiries, access is provided through direct introduction only.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8 text-sm text-gray-600">
          <p className="font-medium">OROS Institute</p>
          <p className="mt-1">&copy; OROS Institute. All rights reserved.</p>
          <p className="mt-1">Confidential — Access by referral only.</p>

          {/* Legal */}
          <div className="mt-6 space-y-4">
            <details>
              <summary className="cursor-pointer font-medium">
                OROS Legal Entity
              </summary>
              <p className="mt-2 text-gray-700">
                OROS Institute is the designated operating and coordination entity for the International Protocol & Hospitality Office — World Cup 2026, operating under institutional mandate.
                OROS Institute conducts protocol-aligned coordination, strategic operations, and institutional engagements in accordance with applicable laws and governing frameworks.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">
                Confidentiality Notice
              </summary>
              <p className="mt-2 text-gray-700">
                The information presented on this page is confidential and intended solely for its authorized recipient. Unauthorized distribution, reproduction, or disclosure is prohibited. All engagements operate under strict confidentiality agreements.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium">
                Access by Referral Only
              </summary>
              <p className="mt-2 text-gray-700">
                Access to the International Protocol & Hospitality Office — World Cup 2026 is extended exclusively through institutional referral or diplomatic introduction. The Office does not accept public inquiries or unsolicited requests.
              </p>
            </details>
          </div>
        </footer>

      </div>
    </main>
  );
}