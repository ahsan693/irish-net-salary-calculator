import React, { useState } from 'react';
import { ChevronDown, MessageCircle, ArrowLeft, Share2, Mail, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 flex items-center gap-1 text-sm font-medium mb-6 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <ArrowLeft size={16} />
            Return
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Income Tax for Irish Office Workers:<br/>Maximising Your Net Pay in 2026
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                Tax bands, PAYE credits, and everyday reliefs: what you actually pay on a typical office salary, how to claim back hidden expenses, and the common payroll mistakes that cost you money.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Advice</span>
                <span>•</span>
                <span>March 9, 2026</span>
              </div>

              {/* Explore with AI Section */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">Explore this topic with AI</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition">
                    <MessageCircle size={16} />
                    ChatGPT
                  </a>
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition">
                    <span>#</span> Claude
                  </a>
                  <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    Perplexity
                  </a>
                  <a href="https://duckduckgo.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M 4 5 L 4 19 C 4 20.1 4.9 21 6 21 L 18 21 C 19.1 21 20 20.1 20 19 L 20 9 L 14 3 L 6 3 C 4.9 3 4 3.9 4 5 Z"/></svg>
                    DuckDuckGo
                  </a>
                </div>
              </div>

              {/* Share Article Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">Share article</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/?url=http://localhost:5173"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="https://twitter.com/intent/tweet?url=http://localhost:5173&text=Irish%20Tax%20Calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <Share2 size={18} />
                  </a>
                  <a
                    href="mailto:?subject=Income%20Tax%20for%20Irish%20Office%20Workers&body=Check%20out%20this%20article%20on%20Irish%20taxes:%20http://localhost:5173"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                alt="Office Worker"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                    <MessageCircle size={20} className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Points</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Single workers pay the standard 20% tax rate on the first €44,000 before hitting the 40% bracket.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Everyone gets €4,000 in basic tax credits, completely wiping out the first €4,000 of your tax bill.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Office workers can lower their taxes by claiming the €1,000 Rent Tax Credit, medical expenses, or Remote Working Relief.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Employers can give up to €1,600 annually in tax-free vouchers—a huge saving compared to taxed cash bonuses.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="mt-8 text-gray-700 dark:text-gray-200 leading-relaxed">
                You've just received your latest monthly payslip, glanced at the gross salary at the top, and then looked down at the final net amount. Between Income Tax, PRSI, and USC, it feels like a substantial chunk of your hard-earned money has been taken before it even reaches your bank account.
              </p>

              <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                The good news: the Irish system provides generous basic credits that significantly reduce your initial tax burden. Furthermore, recent budget changes have widened the tax bands so you keep more of your earnings. But the majority of PAYE workers simply accept their payslips without checking them—not because they lack the right to, but because they don't understand the core elements that separate a gross salary from a net take-home pay.
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-6">In this article</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#payslip-deductions" className="text-blue-600 hover:underline">Understanding Your Payslip: The Three Main Deductions</a></li>
                  <li><a href="#tax-credits" className="text-blue-600 hover:underline">Tax Credits: How the Government Reduces Your Bill</a></li>
                  <li><a href="#flat-rate-expenses" className="text-blue-600 hover:underline">The Grey Area: Flat Rate Expenses and Office Workers</a></li>
                  <li><a href="#salary-bonuses" className="text-blue-600 hover:underline">Salary vs Bonuses: The Tax Trap</a></li>
                  <li><a href="#pension-contributions" className="text-blue-600 hover:underline">The Hidden Saver: Pension Contributions</a></li>
                  <li><a href="#calculation-example" className="text-blue-600 hover:underline">How much you actually take home: the calculation nobody shows you</a></li>
                </ul>
                <a href="#faq-section" className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition block text-center">
                  Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {/* Section 1 */}
          <div id="payslip-deductions">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Your Payslip: The Three Main Deductions</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              Irish income tax is not a single flat rate. When you work in an office in Ireland, your gross salary is subjected to three distinct deductions, each with its own rules, rates, and thresholds. Understanding these is the first step to ensuring you aren't overpaying.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              The primary deduction is Income Tax (PAYE). In Ireland, we operate on a progressive two-tier system. For a single person in 2026, the first €44,000 of your salary is taxed at the standard rate of 20%. Any amount you earn above that €44,000 cut-off point is taxed at the higher rate of 40%. This is often referred to as your 'marginal rate'. If you are married and jointly assessed, this 20% band is considerably wider, allowing a couple to earn significantly more before hitting the 40% threshold.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
              The second deduction is the Universal Social Charge (USC). Introduced during the financial crisis, this is a tax on gross income that applies to almost everyone earning over €13,000 a year. It is charged in varying bands, meaning you pay different rates on different slices of your income: you pay 0.5% on the first €12,012, 2% on the next €15,370 up to €27,382, and 3% on the balance up to €70,044. If you earn over €70,044, an 8% rate applies to the balance.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              The third deduction is Pay Related Social Insurance (PRSI). This goes towards the National Training Fund and the Social Insurance Fund to pay for state pensions, maternity benefit, and social welfare. For the vast majority of office workers (Class A), the employee PRSI rate is a flat 4.2% on all earnings, provided you earn over €352 a week.
            </p>
          </div>

          {/* Tax Credits Box */}
          <div id="tax-credits" className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-200">
                  <span className="text-xl font-bold text-yellow-800">💡</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tax Credits: How the Government Reduces Your Bill</h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Your tax bill is not simply 20% or 40% of your total income. After your gross tax liability is calculated based on the bands mentioned above, Revenue applies "Tax Credits". Think of these as a euro-for-euro discount on your final tax bill. They are incredibly valuable because they reduce the actual tax you owe, rather than just reducing your taxable income.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div id="flat-rate-expenses" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Grey Area: Flat Rate Expenses and Office Workers</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              You might have heard friends in construction, nursing, or retail talk about claiming "Flat Rate Expenses" (FRE)—an automatic tax deduction given by Revenue to cover the costs of uniforms, tools, or equipment essential to jobs.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              Do standard office workers get Flat Rate Expenses? Generally, no. Revenue's official stance is that general administrative, clerical, or managerial office workers do not incur specific, mandatory out-of-pocket expenses to perform their duties. Your employer is expected to provide your desk, computer, and stationery.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              However, this is where a significant grey area lies. Your eligibility depends on your specific job title and profession, not just the fact that you sit at a desk in a corporate building. If you work in an office but are formally employed as a civil engineer, an architectural technologist, a journalist, or a doctor in administration, you are entitled to specific Flat Rate Expenses negotiated for your profession by trade unions. Always check Revenue's official FRE list to see if your specific professional title qualifies.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              If you don't qualify for FRE, but you work from home a few days a week, you should be claiming Remote Working Relief instead. This allows you to claim back 30% of your broadband, heating, and electricity costs, apportioned for the exact days you worked from your home office.
            </p>
          </div>

          {/* Section 3 */}
          <div id="salary-bonuses" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Salary vs Bonuses: The Tax Trap</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              A frequent source of frustration for office workers is the annual performance bonus. If you earn a base salary of €50,000 and receive a €1,000 cash bonus in December, you will definitely not receive €1,000 in your bank account. Because your base salary already pushes you past the €44,000 standard rate cut-off point, that entire cash bonus is taxed at your marginal (higher) rate.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              You will pay 40% Income Tax, 4.2% PRSI, and 3% USC on that bonus. That is a combined effective tax rate of 47.2%. You will only take home about €528 of that €1,000 bonus.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
              This is exactly why the Small Benefit Exemption is crucial for office workers to understand. Under Irish tax law, your employer can give you up to two non-cash benefits (such as shopping vouchers, prepaid Mastercards, or OneAll cards) each year, up to a maximum combined value of €1,500, completely tax-free.
            </p>
            <h3 id="pension-contributions" className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">The Hidden Saver: Pension Contributions</h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              One of the most effective ways for an office worker to reduce their tax burden while planning for the future is through occupational pension contributions. Ireland offers incredibly generous tax relief on pension contributions, essentially allowing you to save for retirement using money that would otherwise have gone straight to Revenue.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mt-4 leading-relaxed">
              If an office worker earning €50,000 decides to contribute 5% of their salary (€2,500) to a company pension scheme, they get tax relief at their marginal rate. Because they earn €44,000, their marginal rate is 40%.
            </p>
            <p className="text-gray-700 dark:text-gray-200 mt-4 leading-relaxed">
              This means the €2,500 contribution reduces their taxable income. They save 40% in Income Tax on that €2,500, which equals €1,000 in tax savings. So, while €2,500 goes directly into their pension pot, their net take-home pay only drops by €1,500. Revenue essentially finances the other €1,000.
            </p>
          </div>

          {/* Section 4 - Calculation */}
          <div id="calculation-example" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How much you actually take home: the calculation nobody shows you</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
              Abstract tax percentages are notoriously difficult to visualise. Let's look at a concrete example of an office worker's net pay to see how this all comes together.
            </p>
            
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 space-y-6">
              <div>
                <p className="text-gray-700 dark:text-gray-200 mb-3">Imagine David, an unmarried marketing manager in Dublin, earning a gross salary of €50,000 a year. He has no special deductions, just the standard credits.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">1. Income Tax:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 ml-4">
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>The first €44,000 of his salary is taxed at 20% = €8,800.</span></li>
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>The remaining €6,000 is taxed at the higher rate of 40% = €2,400.</span></li>
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>His total gross Income Tax is €11,200.</span></li>
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>He then subtracts his basic tax credits (€7,000 Personal + €2,000 Employee = €4,000). His final Income Tax bill drops to €7,200.</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">2. PRSI:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 ml-4">
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>He pays a flat 4.2% on his entire €50,000 salary. This equals €2,100.</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">3. USC:</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200 ml-4">
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>0.5% on the first €12,012 = €60</span></li>
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>2% on the next €15,370 = €307</span></li>
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>3% on the remaining €22,618 = €678</span></li>
                  <li className="flex gap-2"><span className="text-blue-600">•</span> <span>His total USC bill is €1,045.</span></li>
                </ul>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">Total Take-Home Pay:</h4>
                <p className="text-gray-700 dark:text-gray-200 mb-3">David's gross salary is €50,000. He subtracts his Income Tax (€7,200), PRSI (€2,100), and USC (€1,045). His total deductions are €10,345. David's net take-home pay is €39,655 for the year, or roughly €3,304 per month.</p>
              </div>

              <div className="bg-blue-50 dark:bg-sky-900/40 border border-blue-200 dark:border-sky-700 rounded p-4">
                <p className="text-gray-700 dark:text-gray-200 mb-3">Now, let's say David realises he hasn't claimed his Rent Tax Credit. He logs onto Revenue MyAccount and claims it. This €1,000 credit acts as a direct discount on his €7,200 Income Tax bill, reducing it to €6,200. His net take-home pay instantly jumps to €40,655 for the year. This simple calculation shows why understanding your credits is just as important as knowing your gross salary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I know if I am paying the dreaded 'Emergency Tax'?",
              a: "This can be identified on your payslip by your employer in the different emergency tax status."
            },
            {
              q: "Can I claim tax relief on my commute to the office?",
              a: "Generally, commute costs are not deductible. However, some specific situations may qualify for relief depending on your circumstances."
            },
            {
              q: "Does working from home two days a week entitle me to remote working relief?",
              a: "Yes, if you work from home, you can claim Remote Working Relief which allows you to deduct 30% of qualifying home expenses."
            },
            {
              q: "How do I claim back my doctor visits and pharmacy expenses?",
              a: "Medical expenses require specific documentation and typically need to be claimed through Form 11 during your annual tax return."
            },
            {
              q: "What happens to my tax credits if I get married?",
              a: "Your tax credits may change when you get married depending on your joint income and tax band."
            }
          ].map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-4 flex items-center justify-between ${
                  expandedFAQ === index
                    ? 'bg-blue-50 dark:bg-blue-900/40'
                    : 'bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800'
                } transition`}
              >
                <h3 className="text-base font-medium text-gray-900 dark:text-white text-left">
                  {item.q}
                </h3>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 flex-shrink-0 ml-4 transition ${expandedFAQ === index ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedFAQ === index && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 bg-blue-50 dark:bg-slate-900">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-sky-900/40 border border-blue-200 dark:border-sky-700 rounded-lg p-6">
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            Want to see exactly how much you should be taking home this month?
          </p>
          <p className="text-gray-700 dark:text-gray-200 mb-6">
            With the Irish Income Tax Calculator by Dropline Media, you can instantly see how your salary, tax credits, and pension contributions impact your final take-home pay. Simply input your gross pay to get a detailed, accurate breakdown of your Income Tax, PRSI, and USC liabilities in seconds. Built specifically for PAYE workers in Ireland.
          </p>
          <a href="#" className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium">
            Try the free Income Tax Calculator today - Updated for Budget 2026. →
          </a>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tips</h2>
            <button className="text-blue-600 dark:text-blue-300 font-medium hover:text-blue-700 dark:hover:text-blue-200">View More →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Preliminary Tax 2026: A Step-by-Step Guide",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
              },
              {
                title: "Income Tax Bands & USC Rates 2026 Explained",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
              },
              {
                title: "Form 11 vs Form 12: Differences and Deadlines",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
              }
            ].map((tip, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                <img 
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tip</p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                    Discover when self-employed individuals must pay Preliminary Tax, how to calculate it accurately to meet the 90% rule, and common mistakes to avoid.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Free Irish Income Tax Calculator</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Helping individuals estimate Income Tax, USC, and PRSI using current Irish Revenue rates.
              </p>
            </div>

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

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Tax Credits Explained</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">USC Guide</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">PRSI Guide</a></li>
              </ul>
            </div>

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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 Income Tax Calculator. All rights reserved. Built and maintained by Dropline Media. Estimates only. Not financial or tax advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
