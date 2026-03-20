import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, AlertCircle, BarChart3, X } from 'lucide-react';

export default function About() {
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Income Tax Calculator Ireland
          </h1>
          <h2 className="text-5xl font-bold mb-8">
            <span className="text-blue-500">Calculate Your </span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Net Salary</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Enter your salary and instantly calculate Income Tax, USC, PRSI, and your take home<br />
            pay using current Irish tax rates.
          </p>
          
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2 mx-auto mb-12">
            Calculate my tax
            <span>→</span>
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span>2026 tax rates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span>No PPSN required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Consent */}
      {showCookieConsent && (
        <div className="fixed bottom-4 left-4 right-4 md:max-w-md mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 z-40">
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
            We use cookies to improve your experience on our site. You can accept or reject their use.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowCookieConsent(false)}
              className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 py-2 rounded transition"
            >
              Reject
            </button>
            <button 
              onClick={() => setShowCookieConsent(false)}
              className="flex-1 text-sm font-medium bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
            >
              Accept
            </button>
            <button 
              onClick={() => setShowCookieConsent(false)}
              className="text-blue-600 dark:text-blue-300 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-200"
            >
              Learn more
            </button>
          </div>
        </div>
      )}

      {/* Why This Calculator Exists */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why This Calculator <span className="text-pink-500">Exists</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Many people in Ireland struggle to understand how much of their income they actually keep after tax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-50 dark:bg-sky-900/40 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tax Rules Are Confusing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Income Tax, USC, PRSI, tax credits, and reliefs make it difficult to estimate your real take-home pay.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-orange-50 dark:bg-orange-900/40 p-8 rounded-lg">
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Outdated Calculators</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Many online calculators do not reflect the latest Budget updates or current Revenue thresholds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-red-50 dark:bg-red-900/40 p-8 rounded-lg">
              <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No Clear Breakdown</h3>
              <p className="text-gray-600 dark:text-gray-300">
                People often see a final number but do not understand how their taxes are calculated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              What we <span className="text-purple-500">believe</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              The principles behind this calculator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Principle 1 */}
            <div className="flex gap-6">
              <div className="text-purple-300 text-5xl font-bold flex-shrink-0 w-20">01</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Transparency Matters</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You should clearly understand how your income is taxed.
                </p>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="flex gap-6">
              <div className="text-purple-300 text-5xl font-bold flex-shrink-0 w-20">02</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Simplicity First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tax tools should be easy to use without complicated forms or unnecessary steps.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="flex gap-6">
              <div className="text-purple-300 text-5xl font-bold flex-shrink-0 w-20">03</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Based on Irish Tax Rules</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Calculations use the latest available Irish Income Tax, USC, and PRSI rates.
                </p>
              </div>
            </div>

            {/* Principle 4 */}
            <div className="flex gap-6">
              <div className="text-purple-300 text-5xl font-bold flex-shrink-0 w-20">04</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Estimates, Not Advice</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The calculator provides estimates to help you understand your income, not financial or tax advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Built This Calculator */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Who Built This <span className="text-purple-500">Calculator</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                This Irish Income Tax Calculator is built and maintained by <strong>Dropline Media</strong>, an onboarding agency based in Ireland.
              </p>
              <p>
                As part of our work, we create online resources that explain practical concepts such as income, tax, repayment, taxes, and personal finance for people in Ireland.
              </p>
              <p>
                This calculator is designed for PAYE workers, self-employed individuals, and anyone who wants a clearer view of their net salary after Income Tax, PRSI, and USC.
              </p>
              <p>
                Calculations are based on publicly available information from the Irish Revenue Commissioners and reflect current Irish tax bands and rates.
              </p>
              <p>
                The calculator is updated when relevant Budget or Revenue changes occur and is provided for informational purposes only.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-white text-6xl font-bold text-center">ITC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stop Missing Tax Credits */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stop Missing Irish <span className="text-pink-500">Tax Credits</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Download the Irish Tax Saving Guide and learn about tax credits, reliefs, and ways you may be able<br />
            to reduce your tax bill under current Revenue rules.
          </p>
          
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition flex items-center gap-2 mx-auto mb-4">
            Claim Your Free Irish Tax Guide
            <span>→</span>
          </button>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Instant access. No spam.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Free Irish Income Tax Calculator</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Helping individuals estimate Income Tax, USC, and PRSI using current Irish tax rates.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">About</Link></li>
                <li><a href="mailto:support@irishincome.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Terms of Use</a></li>
                <li><Link to="/policy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Tax Credits Explained</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">USC Guide</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">PRSI Guide</a></li>
              </ul>
            </div>

            {/* Calculator */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Calculator</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">About Income Tax Calculator</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Net Salary Calculator</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Take Home Pay Calculator</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Budget 2026 Updates</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2026 Income Tax Calculator. All rights reserved. Built and maintained by Dropline Media. Estimates only. Not financial or tax advice.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
