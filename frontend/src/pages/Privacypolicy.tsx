// import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: June 2025</p>
      <p className="mb-4">
        We respect your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and store your information.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Your name, email, and contact details</li>
        <li>Technical data like IP address, browser, and device info</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process tickets and participation payments</li>
        <li>To send important updates and event announcements</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="mb-4">We take reasonable steps to protect your data but cannot guarantee complete security.</p>
      <p className="mt-6">Questions? Contact us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.</p>
    </div>
  );
}
