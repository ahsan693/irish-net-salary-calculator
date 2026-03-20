import React, { useMemo, useState } from 'react';

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
    renting: false,
    selfEmployedFlag: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
      icon: '💡',
    },
    {
      title: 'Updated for Budget 2026',
      text: 'Uses current Irish Income Tax, USC, and PRSI bands for a quick net pay estimate.',
      icon: '⚡',
    },
    {
      title: 'Clear Net Pay Estimate',
      text: 'See annual, monthly, and weekly net pay with a structured breakdown.',
      icon: '📊',
    },
    {
      title: 'Private and Secure',
      text: 'No PPSN required. No account needed. Transparent data policy.',
      icon: '🔒',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">Income Tax Calculator Ireland</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
          Income Tax Calculator Ireland
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-gray-900 dark:text-white">Calculate Your </span>
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Net Salary
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
          <span>✓ 2026 tax rates</span>
          <span>✓ No PPSN required</span>
          <span>✓ Instant results</span>
        </div>
      </header>

      {/* Cookie banner */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-white/90 dark:bg-slate-900/90 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
            We use cookies to improve your experience on our site. You can accept or reject their use.
          </p>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <button className="px-4 py-1.5 rounded-full border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
              Reject
            </button>
            <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition">
              Accept
            </button>
            <button className="px-4 py-1.5 rounded-full border border-transparent text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <main id="calculator-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-slate-950 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form */}
            <div className="bg-gray-950 text-gray-100 p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-white/80">Income</h2>
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

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-white/80">Tax configuration</h2>
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

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-white/80">Personal Details</h2>
                <div>
                  <label className="block text-xs text-white/70 mb-2">Age</label>
                  <input
                    type="number"
                    min="18"
                    value={form.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-2">Marital Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'single', label: 'Single' },
                      { value: 'married', label: 'Married One Earner' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange('maritalStatus', option.value)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          form.maritalStatus === option.value
                            ? 'border-blue-500 bg-blue-600 text-white'
                            : 'border-gray-800 bg-gray-900 text-white/80'
                        }`}
                        type="button"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-white/80">Additional Details</h2>
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

                <div className="grid grid-cols-2 gap-3">
                  {[{ label: 'Renting?', field: 'renting' }, { label: 'Self-employed?', field: 'selfEmployedFlag' }].map(
                    (item) => (
                      <div key={item.field}>
                        <label className="block text-xs text-white/70 mb-2">{item.label}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Yes', 'No'].map((choice) => {
                            const value = choice === 'Yes';
                            const isActive = form[item.field] === value;
                            return (
                              <button
                                key={choice}
                                type="button"
                                onClick={() => handleChange(item.field, value)}
                                className={`rounded-md border px-3 py-2 text-sm transition ${
                                  isActive
                                    ? 'border-blue-500 bg-blue-600 text-white'
                                    : 'border-gray-800 bg-gray-900 text-white/80'
                                }`}
                              >
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
            </div>

            {/* Results */}
            <div className="bg-gray-900 text-white p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {summaryRows.map((row) => (
                  <div
                    key={row.label}
                    className="border border-gray-800 rounded-lg p-4 bg-gray-950/60 flex items-center justify-between"
                  >
                    <span className="text-sm text-white/70">{row.label}</span>
                    <span className="font-semibold">{formatCurrency(row.value)}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-800 rounded-lg p-4 bg-gray-950/60">
                  <p className="text-xs text-white/60 mb-1">Weekly net</p>
                  <p className="text-2xl font-semibold">{formatCurrency(calculations.weeklyNet)}</p>
                </div>
                <div className="border border-gray-800 rounded-lg p-4 bg-gray-950/60">
                  <p className="text-xs text-white/60 mb-1">Monthly net</p>
                  <p className="text-2xl font-semibold">{formatCurrency(calculations.monthlyNet)}</p>
                </div>
              </div>

              <div className="border border-gray-800 rounded-xl bg-gradient-to-b from-gray-950 to-gray-900 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">The Taxberg</h3>
                  <p className="text-sm text-white/70">Tax breakdown based on your inputs.</p>
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
                  <div className="absolute inset-x-0 bottom-14 px-4 text-[0.7rem] sm:text-xs text-sky-50/90 flex justify-between items-center">
                    <div>
                      <p className="font-semibold mb-0.5">{formatCurrency(calculations.totalTax)}</p>
                      <p className="opacity-80">Tax you pay</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold mb-0.5">{formatCurrency(calculations.totalTax * 0.6)}</p>
                      <p className="opacity-80">Tax the employer pays</p>
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
                <div className="mt-4 space-y-2 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span>Total tax paid</span>
                    <span className="font-semibold">{formatCurrency(calculations.totalTax)}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">
                    This quick estimate shows the combined effect of Income Tax, USC, and PRSI using current bands. Adjust income or pension inputs to see how your net pay changes instantly.
                  </p>
                  <div className="flex justify-between">
                    <span>Real tax rate</span>
                    <span className="font-semibold">
                      {calculations.grossIncome > 0
                        ? `${((calculations.totalTax / calculations.grossIncome) * 100).toFixed(1)}%`
                        : '0.0%'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">A Better Way to Estimate Your Income</h2>
          <p className="text-gray-600 dark:text-gray-300">Designed for clarity, updated rates, and straightforward tax estimates.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 border-t border-b border-gray-100 dark:border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Maximize Your Tax Relief.</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Download our practical Irish tax saving guide and learn which credits and reliefs you may be entitled to under current Revenue rules.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition">
            Claim Your Free Irish Tax Guide →
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">Instant access. No spam.</p>
        </div>
      </section>
    </div>
  );
}
