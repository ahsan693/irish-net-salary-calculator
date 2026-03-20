import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function CookiePolicy() {
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cookie Policy</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: March 2026</p>

        {/* Cookie Preferences */}
        <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-8 mb-12 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Cookie Preferences</h2>
          <p className={`text-sm font-medium mb-4 ${cookiesAccepted ? 'text-green-600' : 'text-orange-600'}`}>
            {cookiesAccepted ? 'You have accepted cookies' : 'You have not accepted all cookies'}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">You can change your preference at any time using the buttons below.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setCookiesAccepted(false)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Reject
            </button>
            <button 
              onClick={() => setCookiesAccepted(true)}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 text-white rounded-full font-medium transition"
            >
              Accept
            </button>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This Cookie Policy explains how cookies and similar technologies are used on the website <a href="https://irishinometaxcalculator.ie" className="text-blue-600 hover:underline">https://irishinometaxcalculator.ie</a> (the <span className="font-semibold">"Website"</span>), operated by Dropline Media, Ireland.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Its purpose is to explain what cookies are, how they are used on the Website, and how users can manage or disable them.
          </p>
        </section>

        {/* What are cookies? */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are cookies?</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Cookies are small text files stored on your device when you visit a website. They help websites function correctly and allow website owners to understand how visitors interact with their content.
          </p>
        </section>

        {/* Types of cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Types of cookies used on this Website</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Necessary cookies</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              These cookies are essential for the basic operation of the Website. They enable functions such as page navigation, security features, and remembering cookie preferences.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              These cookies cannot be disabled because the Website would not function properly without them.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Analytics cookies</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Analytics cookies help us understand how visitors use the Website, such as which pages are visited and how users interact with the calculator.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              This Website may use <span className="font-semibold">Google Analytics</span> to collect anonymous usage statistics in order to improve the Website and its functionality.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Analytics cookies are only activated <span className="font-semibold">when the user accepts cookies through the cookie banner.</span>
            </p>
          </div>
        </section>

        {/* Third-party cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-party cookies</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Some cookies may be set by third-party services such as <span className="font-semibold">Google Analytics</span>. These providers may process data according to their own privacy policies.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            More information: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">https://policies.google.com/privacy</a>
          </p>
        </section>

        {/* Cookie consent */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookie consent</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When you first visit the Website, a cookie banner will appear allowing you to:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
            <li>Accept cookies</li>
            <li>Reject non-essential cookies</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            If you accept cookies, analytics cookies may be used to help us understand how visitors use the Website.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            If you reject cookies, only necessary cookies required for the operation of the Website will be use.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            You can also learn more about how cookies are used by clicking "Learn more" on the cookie banner.
          </p>
        </section>

        {/* Legal basis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal basis</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Necessary cookies are used based on our legitimate interest in ensuring the proper operation and security of the Website.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Analytics cookies are only used <span className="font-semibold">with the user's consent.</span>
          </p>
        </section>

        {/* Data retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data retention</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Session cookies are deleted when you close your browser. Persistent cookies may remain on your device for a limited period depending on their purpose and configuration.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            For questions regarding this Cookie Policy, you may contact:
          </p>
          <p className="text-gray-900 dark:text-white font-semibold">Dropline Media</p>
          <p className="text-gray-700 dark:text-gray-300">Ireland</p>
        </section>

        {/* Updates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Updates</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            This Cookie Policy may be updated from time to time to reflect changes in technology, regulations, or Website functionality. The latest version will always be available on this page.
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-sm">
            <span className="font-semibold">Last updated:</span> March 2026
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <p className="text-gray-300 text-sm mb-4">
                Free Irish Income Tax Calculator helping individuals estimate Income Tax, USC, and PRSI using current Irish Revenue rates.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                <li><a href="mailto:support@irishincome.com" className="hover:text-white transition">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition">Terms of Use</a></li>
                <li><a href="#cookie" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#tax-credits" className="hover:text-white transition">Tax Credits Explained</a></li>
                <li><a href="#usc-guide" className="hover:text-white transition">USC Guide</a></li>
                <li><a href="#prsi-guide" className="hover:text-white transition">PRSI Guide</a></li>
              </ul>
            </div>

            {/* Calculator */}
            <div>
              <h4 className="text-white font-semibold mb-4">Calculator</h4>
              <ul className="space-y-2">
                <li><a href="#about-calculator" className="hover:text-white transition">About Income Tax Calculator</a></li>
                <li><a href="#net-salary" className="hover:text-white transition">Net Salary Calculator</a></li>
                <li><a href="#take-home" className="hover:text-white transition">Take Home Pay Calculator</a></li>
                <li><a href="#budget-2026" className="hover:text-white transition">Budget 2026 Updates</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2026 (Income Tax Calculator). All rights reserved. Built and maintained by Dropline Media. Estimates only. Not financial or tax advice.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
