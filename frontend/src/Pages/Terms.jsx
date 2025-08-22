import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradent-to-br from-[#FCE3F1] via-[#E0D4FD] to-[#D0ECFC] px-6 py-20">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl animate-pulse delay-300"></div>

        {/* Content */}
        <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text mb-8">
          Terms of Service – Iconiq
        </h1>

        <p className="text-gray-700 text-base leading-relaxed mb-6">
          By using our website and services, you agree to the rules outlined in
          these Terms of Service.
        </p>

        <Section title="1. Services Offered">
          <p>Iconiq provides creative and technical solutions, including:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm text-gray-600">
            <li>Digital Branding & Visual Identity</li>
            <li>Web Design and Front-End Development</li>
            <li>Full-Stack Web Development</li>
            <li>Custom Poster & Promotional Design</li>
          </ul>
        </Section>

        <Section title="2. User Responsibilities">
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm text-gray-600">
            <li>Provide accurate information when requesting services</li>
            <li>Respect intellectual property rights</li>
            <li>Do not misuse or disrupt our digital platforms</li>
          </ul>
        </Section>

        <Section title="3. Intellectual Property">
          <p>
            All content, graphics, and code created by Iconiq are the property
            of the company unless agreed otherwise. Clients may use delivered
            work as per license or contract terms.
          </p>
        </Section>

        <Section title="4. Payments and Refunds">
          <p>
            Payments must be made in accordance with agreed project milestones
            or packages. Refunds are available only under specific conditions
            outlined in client agreements.
          </p>
        </Section>

        <Section title="5. Termination">
          <p>
            Iconiq reserves the right to terminate or suspend access to services
            if any terms are violated. Unused services at termination may not be
            refundable.
          </p>
        </Section>

        <Section title="6. Liability">
          <p>
            Iconiq is not liable for indirect damages, service interruptions, or
            loss of data unless caused by proven negligence.
          </p>
        </Section>

        <Section title="7. Changes to Terms">
          <p>
            We may update these Terms from time to time. Continued use of our
            services after changes implies acceptance.
          </p>
        </Section>

        <p className="mt-10 text-sm text-gray-500">
          For questions about our terms, contact us at{" "}
          <a
            href="mailto:iconiqnp@gmail.com"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            iconiqnp@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

// Reusable Section component for structure
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-purple-800 border-l-4 border-purple-400 pl-4 mb-2">
        {title}
      </h2>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
