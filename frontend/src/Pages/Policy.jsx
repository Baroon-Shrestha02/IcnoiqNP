import React from "react";

export default function Policy() {
  return (
    <div className="min-h-screen px-6 py-[8rem]">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          Privacy Policy – Iconiq
        </h1>
        <p className="mb-4 text-gray-700">
          At Iconiq, your privacy is a top priority. This policy outlines how we
          collect, use, and protect your information when you interact with our
          digital services.
        </p>

        <h2 className="text-xl font-semibold mt-6 text-gray-800">
          1. What We Do
        </h2>
        <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
          <li>Digital Branding Solutions</li>
          <li>Creative Web Design</li>
          <li>Full-Stack Web Development</li>
          <li>Custom Poster and Graphic Design</li>
          <li>Visual Identity & UI/UX Design</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 text-gray-800">
          2. Information We Collect
        </h2>
        <p className="text-gray-600 mt-2">
          We may collect personal details like your name, email address, and
          project requirements when you:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
          <li>Fill out a contact form</li>
          <li>Sign up for a newsletter</li>
          <li>Request a quote or service</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 text-gray-800">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-600 mt-2">We use your information to:</p>
        <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
          <li>Communicate project updates and support</li>
          <li>Deliver the services you request</li>
          <li>Send occasional marketing updates (you can opt out anytime)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 text-gray-800">
          4. Data Protection
        </h2>
        <p className="text-gray-600 mt-2">
          Your data is securely stored and never sold to third parties. We
          follow industry best practices for encryption and access control.
        </p>

        <h2 className="text-xl font-semibold mt-6 text-gray-800">5. Cookies</h2>
        <p className="text-gray-600 mt-2">
          We use cookies to enhance your browsing experience. You can disable
          them in your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 text-gray-800">
          6. Updates to this Policy
        </h2>
        <p className="text-gray-600 mt-2">
          This policy may be updated as we expand our services. Changes will be
          reflected here.
        </p>

        <p className="mt-6 text-gray-500 text-sm">
          For any questions or concerns, contact us at{" "}
          <a
            href="mailto:iconiqnp@gmail.com"
            className="text-blue-500 underline"
          >
            iconiqnp@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
