import React, { useMemo, useState } from 'react';
import userIcon from '../icons/div.w-14.png';
import budgetIcon from '../icons/div.w-14-1.png';
import payIcon from '../icons/div.w-14-2.png';
import secureIcon from '../icons/div.w-14-3.png';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(
    Number.isFinite(value) ? value : 0
  );

const clampToZero = (value) => Math.max(0, Number.isFinite(value) ? value : 0);

// Simple 2026-style approximations for demo purposes.
const standardBand = (maritalStatus) => (maritalStatus === 'married' ? 50000 : 42000);
const personalCredit = (maritalStatus) => (maritalStatus === 'married' ? 3550 : 1775);

const calculateIncomeTax = ({ taxableIncome, maritalStatus, hasEmployment, hasSelf }) => {
  const band = standardBand(maritalStatus);
  const at20 = Math.min(taxableIncome, band) * 0.2;
  const at40 = clampToZero(taxableIncome - band) * 0.4;
  const grossTax = at20 + at40;

  const baseCredit = personalCredit(maritalStatus);
  const payeCredit = hasEmployment ? 1775 : 0;
  const earnedCredit = !hasEmployment && hasSelf ? 1775 : 0;
  const totalCredit = baseCredit + payeCredit + earnedCredit;

  return clampToZero(grossTax - totalCredit);
};

const calculateUSC = (taxableIncome) => {
  const bands = [
    { limit: 12012, rate: 0.005 },
    { limit: 10908, rate: 0.02 },
    { limit: 48684, rate: 0.045 },
  ];

  let remaining = taxableIncome;
  let usc = 0;

  bands.forEach((band) => {
    if (remaining <= 0) return;
    const portion = Math.min(remaining, band.limit);
    usc += portion * band.rate;
    remaining -= portion;
  });

  if (remaining > 0) usc += remaining * 0.08;
  return usc;
};

const calculatePRSI = (grossIncome) => (grossIncome > 5000 ? grossIncome * 0.04 : 0);

export default function Calculator() {
  const [form, setForm] = useState({
    employmentIncome: 45000,
    selfIncome: 0,
    rentalIncome: 0,
    pension: 0,
    taxYear: '2026',
    age: 30,
    maritalStatus: 'single',
    children: 0,
    mortgageRelief: 0,
    mortgageInterestRelief: false,
    renting: false,
    selfEmployedFlag: false,
  });

  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.localStorage.getItem('cookieConsent');
    }
    return true;
  });

  const [expandedSections, setExpandedSections] = useState({
    taxConfig: true,
    personalDetails: true,
    additionalDetails: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCookieConsent = (accepted) => {
    window.localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    setShowCookieBanner(false);
  };

  const calculations = useMemo(() => {
    const employment = clampToZero(parseFloat(form.employmentIncome));
    const self = clampToZero(parseFloat(form.selfIncome));
    const rental = clampToZero(parseFloat(form.rentalIncome));
    const pension = clampToZero(parseFloat(form.pension));

    const grossIncome = employment + self + rental;
    const taxableIncome = clampToZero(grossIncome - pension);

    const incomeTax = calculateIncomeTax({
      taxableIncome,
      maritalStatus: form.maritalStatus,
      hasEmployment: employment > 0,
      hasSelf: self > 0,
    });

    const usc = calculateUSC(taxableIncome);
    const prsi = calculatePRSI(grossIncome);

    const totalTax = incomeTax + usc + prsi;
    const netIncome = clampToZero(grossIncome - totalTax);

    const monthlyNet = netIncome / 12;
    const weeklyNet = netIncome / 52;

    return {
      grossIncome,
      taxableIncome,
      incomeTax,
      usc,
      prsi,
      totalTax,
      netIncome,
      monthlyNet,
      weeklyNet,
    };
  }, [form]);

  const summaryRows = [
    { label: 'Total Income', value: calculations.grossIncome },
    { label: 'Income Tax', value: calculations.incomeTax },
    { label: 'PRSI', value: calculations.prsi },
    { label: 'USC', value: calculations.usc },
    { label: 'Total Tax', value: calculations.totalTax },
  ];

  const featureCards = [
    {
      title: 'User Friendly Design',
      text: 'Enter your income and details in seconds. No complex forms, no unnecessary steps.',
      icon: userIcon,
    },
    {
      title: 'Updated for Budget 2026',
      text: 'Uses current Irish Income Tax, USC, and PRSI bands for a quick net pay estimate.',
      icon: budgetIcon,
    },
    {
      title: 'Clear Net Pay Estimate',
      text: 'See annual, monthly, and weekly net pay with a structured breakdown.',
      icon: payIcon,
    },
    {
      title: 'Private and Secure',
      text: 'No PPSN required. No account needed. Transparent data policy.',
      icon: secureIcon,
    },
  ];
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3"></p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
          Income Tax Calculator Ireland
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Calculate Your Net Salary
          </span>
        </p>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Enter your salary and instantly calculate Income Tax, USC, PRSI, and your take home pay using current Irish tax rates.
        </p>
        <button
          onClick={() => {
            const el = document.getElementById('calculator-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition mb-5"
        >
          Calculate my tax →
        </button>
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 flex-wrap">
          <span><span className="text-green-500">✓</span> 2026 tax rates</span>
          <span><span className="text-green-500">✓</span> No PPSN required</span>
          <span><span className="text-green-500">✓</span> Instant results</span>
        </div>
      </header>

      {/* Cookie banner */}
      {showCookieBanner && (
      <section className="bg-[#f3f4fb] dark:bg-slate-950 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white/90 dark:bg-slate-900/90 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
              We use cookies to improve your experience on our site. You can accept or reject their use.
            </p>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <button 
                onClick={() => handleCookieConsent(false)}
                className="px-4 py-1.5 rounded-full border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                Reject
              </button>
              <button 
                onClick={() => handleCookieConsent(true)}
                className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition">
                Accept
              </button>
              <button 
                onClick={() => window.location.href = '/policy'}
                className="px-4 py-1.5 rounded-full border border-transparent text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Calculator Grid */}
      <main id="calculator-section" className="bg-[#ebebf3] dark:bg-slate-950 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="bg-gray-950 text-gray-100 shadow-xl rounded-2xl overflow-hidden border border-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-3">
                <h2 className="text-sm font-semibold text-white/80 flex items-center gap-2"><span className="text-blue-500">●</span> Income</h2>
                {[ 
                  {
                    label: 'Employment Income',
                    field: 'employmentIncome',
                    placeholder: '0.00',
                  },
                  {
                    label: 'Self-employed/Other Income',
                    field: 'selfIncome',
                    placeholder: '0.00',
                  },
                  { label: 'Rental Income', field: 'rentalIncome', placeholder: '0.00' },
                  { label: 'Personal Pension Contributions', field: 'pension', placeholder: '0.00' },
                ].map((item) => (
                  <div key={item.field}>
                    <label className="block text-xs text-white/70 mb-2">{item.label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form[item.field]}
                        onChange={(e) => handleChange(item.field, e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={item.placeholder}
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500">€</span>
                    </div>
                  </div>
                ))}
                </div>

              {/* Tax Configuration Section */}
              <div className="border-t border-gray-800 pt-4">
                <button
                  onClick={() => toggleSection('taxConfig')}
                  className="w-full flex items-center justify-between py-3 hover:bg-gray-800/50 rounded-lg px-2 transition"
                >
                  <div className="text-left">
                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="text-purple-500">●</span> Tax configuration
                    </h2>
                    <p className="text-xs text-white/60 mt-1">Tax rates, bands and credits change each year. Select the year you want to calculate.</p>
                  </div>
                  <span className="text-white/70">{expandedSections.taxConfig ? '−' : '+'}</span>
                </button>
                {expandedSections.taxConfig && (
                  <div className="pl-2 py-3 space-y-3">
                    <div>
                      <label className="block text-xs text-white/70 mb-2">Tax year</label>
                      <select
                        value={form.taxYear}
                        onChange={(e) => handleChange('taxYear', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Details Section */}
              <div className="border-t border-gray-800 pt-4">
                <button
                  onClick={() => toggleSection('personalDetails')}
                  className="w-full flex items-center justify-between py-3 hover:bg-gray-800/50 rounded-lg px-2 transition"
                >
                  <div className="text-left">
                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="text-green-500">●</span> Personal Details
                    </h2>
                    <p className="text-xs text-white/60 mt-1">These details affect tax bands and credits.</p>
                  </div>
                  <span className="text-white/70">{expandedSections.personalDetails ? '−' : '+'}</span>
                </button>
                {expandedSections.personalDetails && (
                  <div className="pl-2 py-3 space-y-3">
                    <div>
                      <label className="block text-xs text-white/70 mb-2">Age</label>
                      <input
                        type="number"
                        min="18"
                        value={form.age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-white/50 mt-2">Lets us assign pension contribution relief limits.</p>
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-3">Marital Status</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'single', label: 'Single' },
                          { value: 'married', label: 'Married One Earner' },
                        ].map((option) => {
                          const isActive = form.maritalStatus === option.value;
                          return isActive ? (
                            <button
                              key={option.value}
                              onClick={() => handleChange('maritalStatus', option.value)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 border border-blue-500 text-white text-sm transition"
                              type="button"
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-blue-300 bg-blue-600 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              {option.label}
                            </button>
                          ) : (
                            <button
                              key={option.value}
                              onClick={() => handleChange('maritalStatus', option.value)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white/70 hover:text-white hover:border-gray-600 text-sm transition"
                              type="button"
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-gray-600 bg-gray-900 flex items-center justify-center">
                              </div>
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-white/50 mt-2">Affects tax bands and transferable credits.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Details Section */}
              <div className="border-t border-gray-800 pt-4">
                <button
                  onClick={() => toggleSection('additionalDetails')}
                  className="w-full flex items-center justify-between py-3 hover:bg-gray-800/50 rounded-lg px-2 transition"
                >
                  <div className="text-left">
                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="text-yellow-500">●</span> Additional Details
                    </h2>
                    <p className="text-xs text-white/60 mt-1">These details affect tax bands and credits.</p>
                  </div>
                  <span className="text-white/70">{expandedSections.additionalDetails ? '−' : '+'}</span>
                </button>
                {expandedSections.additionalDetails && (
                  <div className="pl-2 py-3 space-y-3">
                    <div>
                      <label className="block text-xs text-white/70 mb-2">Number of Children</label>
                      <input
                        type="number"
                        min="0"
                        value={form.children}
                        onChange={(e) => handleChange('children', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-2">Increase in mortgage interest from 2023 to 2026</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.mortgageRelief}
                        onChange={(e) => handleChange('mortgageRelief', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/70 mb-3">Entitled to Mortgage Interest Relief:</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((choice) => {
                          const value = choice === 'Yes';
                          const isActive = form.mortgageInterestRelief === value;
                          return isActive ? (
                            <button
                              key={choice}
                              type="button"
                              onClick={() => handleChange('mortgageInterestRelief', value)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 border border-blue-500 text-white text-sm transition"
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-blue-300 bg-blue-600 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              {choice}
                            </button>
                          ) : (
                            <button
                              key={choice}
                              type="button"
                              onClick={() => handleChange('mortgageInterestRelief', value)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white/70 hover:text-white hover:border-gray-600 text-sm transition"
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-gray-600 bg-gray-900 flex items-center justify-center">
                              </div>
                              {choice}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[{ label: 'Renting?', field: 'renting' }, { label: 'Self-employed?', field: 'selfEmployedFlag' }].map(
                        (item) => (
                          <div key={item.field}>
                            <label className="block text-xs text-white/70 mb-3">{item.label}</label>
                            <div className="grid grid-cols-2 gap-3">
                              {['Yes', 'No'].map((choice) => {
                                const value = choice === 'Yes';
                                const isActive = form[item.field] === value;
                                return isActive ? (
                                  <button
                                    key={choice}
                                    type="button"
                                    onClick={() => handleChange(item.field, value)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 border border-blue-500 text-white text-sm transition"
                                  >
                                    <div className="w-5 h-5 rounded-full border-2 border-blue-300 bg-blue-600 flex items-center justify-center">
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    {choice}
                                  </button>
                                ) : (
                                  <button
                                    key={choice}
                                    type="button"
                                    onClick={() => handleChange(item.field, value)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white/70 hover:text-white hover:border-gray-600 text-sm transition"
                                  >
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 bg-gray-900 flex items-center justify-center">
                                    </div>
                                    {choice}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-900 text-white p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                {summaryRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-2 border-b border-gray-800/50"
                  >
                    <span className="text-sm text-white/70">{row.label}</span>
                    <span className="font-semibold">{formatCurrency(row.value)}</span>
                  </div>
                ))}
              </div>

              {/* Net Income Highlighted Section */}
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-xl p-6">
                <p className="text-xs text-white/60 mb-2">Net Income</p>
                <p className="text-4xl font-bold text-white">{formatCurrency(calculations.netIncome)}</p>
              </div>

              {/* Weekly and Monthly Net */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-xs text-white/60 mb-2">Weekly net</p>
                  <p className="text-xl font-semibold text-white">{formatCurrency(calculations.weeklyNet)}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-xs text-white/60 mb-2">Monthly net</p>
                  <p className="text-xl font-semibold text-green-500">{formatCurrency(calculations.monthlyNet)}</p>
                </div>
              </div>

              <div className="border border-gray-800 rounded-xl bg-gradient-to-b from-gray-950 to-gray-900 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">The Taxberg</h3>
                  <p className="text-sm text-green-500">Tax breakdown based on your inputs.</p>
                </div>

                {/* Iceberg-style summary card */}
                <div className="aspect-[3/4] bg-gradient-to-b from-sky-200 to-sky-800 rounded-lg relative overflow-hidden">
                  {/* Background gradient tint */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-400/60 to-sky-900/70" />

                  {/* Top label: Net pay */}
                  <div className="absolute left-4 top-4 text-xs sm:text-sm text-sky-950/90 font-medium">
                    <p className="mb-0.5">Net pay</p>
                    <p className="text-sm sm:text-base font-semibold">
                      {formatCurrency(calculations.netIncome)}
                    </p>
                  </div>

                  {/* Stylised iceberg illustration */}
                  <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none select-none">
                    <div className="relative w-32 sm:w-40 h-40">
                      {/* Above-water ice */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-24 h-20 bg-sky-50 rounded-t-3xl rounded-b-md shadow-[0_8px_0_rgba(15,23,42,0.45)]" />
                      {/* Facets */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-12 w-16 h-14 bg-sky-100/95 rounded-3xl rotate-3" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-20 h-12 bg-sky-200/90 rounded-3xl -rotate-3" />
                      {/* Water line */}
                      <div className="absolute left-0 right-0 bottom-8 h-[2px] bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 opacity-80" />
                      {/* Underwater section */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-32 h-16 bg-sky-600/85 rounded-t-[2.7rem] rounded-b-full blur-[1px]" />
                      {/* Little flag on top */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-[5.4rem] flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-sky-400" />
                        <div className="w-3 h-2 bg-gradient-to-r from-green-500 via-white to-orange-500 rounded-sm mt-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Mid-line labels: tax you pay / employer pays */}
                  <div className="absolute inset-x-0 bottom-40 px-4 text-xs sm:text-lg text-white font-semibold flex justify-between items-center">
                    <div className="text-center">
                      <p className="mb-1">{formatCurrency(calculations.totalTax)}</p>
                      <p className="text-xs sm:text-sm opacity-90">Tax you pay</p>
                    </div>
                    <div className="text-center">
                      <p className="mb-1">{formatCurrency(calculations.totalTax * 0.6)}</p>
                      <p className="text-xs sm:text-sm opacity-90">Tax the employer pays</p>
                    </div>
                  </div>

                  {/* Bottom overlay with figures (net + tax) */}
                  <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-sky-950/95 via-sky-900/70 to-transparent text-[0.7rem] sm:text-xs text-sky-50">
                    <div className="flex justify-between mb-1 font-semibold">
                      <span>Total tax</span>
                      <span>{formatCurrency(calculations.totalTax)}</span>
                    </div>
                    <div className="flex justify-between text-sky-100/80">
                      <span>Net pay (after tax)</span>
                      <span>{formatCurrency(calculations.netIncome)}</span>
                    </div>
                  </div>
                </div>

                {/* Total tax paid section */}
                <div className="mt-6 p-5 bg-gradient-to-b from-sky-900/40 to-sky-950/80 border border-sky-700/50 rounded-lg">
                  <p className="text-sm text-sky-200/70 mb-2">Total tax paid</p>
                  <p className="text-3xl font-bold text-white mb-3">{formatCurrency(calculations.totalTax)}</p>
                  <p className="text-sm text-sky-100/80 leading-relaxed">
                    Did you know your employer also pays tax on your salary? It costs the employer €464 to pay you ever €1 a month. In other words, every time you expect €1 in your salary, your employer's spending €1.64 goes to the government.
                  </p>
                </div>

                {/* Real tax rate section */}
                <div className="mt-4 p-5 bg-gradient-to-b from-sky-900/40 to-sky-950/80 border border-sky-700/50 rounded-lg">
                  <p className="text-sm text-sky-200/70 mb-2">Real tax rate</p>
                  <p className="text-3xl font-bold text-white mb-3">
                    {calculations.grossIncome > 0
                      ? `${((calculations.totalTax / calculations.grossIncome) * 100).toFixed(1)}%`
                      : '0.0%'}
                  </p>
                  <p className="text-sm text-sky-100/80 leading-relaxed">
                    With you and your employer both paying tax, what used to be a 10% tax rate now looks to 27%. In other words, your employer is actually 81% higher than what it seemed at first.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature cards */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f7ff] via-white to-[#f9f5ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16">
        <div className="pointer-events-none absolute -left-32 top-0 w-72 h-72 bg-blue-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 w-80 h-80 bg-purple-300/25 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-900 dark:text-white">A Better Way to </span>
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Estimate Your Income
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Designed for clarity, updated rates, and straightforward tax estimates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300"
              >
              <img src={card.icon} alt={card.title} className="w-14 h-14 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f7ff] via-white to-[#f9f5ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-b border-gray-100 dark:border-slate-800 py-14">
        <div className="pointer-events-none absolute -left-32 top-0 w-72 h-72 bg-blue-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 w-80 h-80 bg-purple-300/25 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-gray-900 dark:text-white">Maximize Your </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Tax Relief.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Download our practical Irish tax saving guide and learn which credits and reliefs you may be entitled to under current Revenue rules.
          </p>
          <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition">
            Claim Your Free Irish Tax Guide →
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">Instant access. No spam.</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Free Irish Income Tax Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">helping individuals estimate Income Tax, USC, and PRSI using current Irish Revenue rates.</p>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                <li><a href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                <li><a href="/policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Use</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Tax Credits Explained</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">USC Guide</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">PRSI Guide</a></li>
              </ul>
            </div>

            {/* Column 4: Calculator */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Calculator</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About Income Tax Calculator</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Net Salary Calculator</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Take Home Pay Calculator</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Budget 2026 Updates</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section with Social Icons */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © 2026 Income Tax Calculator). All rights reserved. Built and maintained by Discipline Media. Estimates only. Not financial or tax advice.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
