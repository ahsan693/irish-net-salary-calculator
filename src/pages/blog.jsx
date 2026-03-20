import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredArticles = [
    {
      id: 1,
      title: "Budget 2026: How Changes Affect Your Net Take-Home Pay.",
      readTime: "14 min read",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Understanding Self Employment Tax Credits",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Tax Deductions for Remote Workers 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
    }
  ];

  const editorsPick = [
    {
      id: 1,
      title: "Income Tax Bands & USC Rates 2026 Explained",
      category: "Guides",
      description: "The 2026 Irish tax bands explained: from the 20% standard rate to the 40% higher rate. Understand your limits and estimate your final net take-home pay.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
    }
  ];

  const editorsSide = [
    {
      id: 1,
      title: "Stay up to date with the latest news",
      category: "GUIDES",
      image: "https://images.unsplash.com/photo-1554224311-beee415c15c9?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Form 11 vs Form 12: Differences and Deadlines",
      category: "GUIDE",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop"
    },
    {
      id: 3,
      title: "Preliminary Tax 2026: A Step-by-Step Guide",
      category: "GUIDES",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=150&fit=crop"
    }
  ];

  const tipsList = [
    {
      id: 1,
      title: "Preliminary Tax 2026: A Step-by-Step Guide",
      category: "Tips",
      readTime: "10 min",
      description: "Discover when self-employed individuals must pay Preliminary Tax, how to calculate it accurately to meet the 90% rule, and common ROS filing mistakes to avoid.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Income Tax Bands & USC Rates 2026 Explained",
      category: "Tips",
      readTime: "12 min",
      description: "Discover when self-employed individuals must pay Preliminary Tax, how to calculate it accurately to meet the 90% rule, and common ROS filing mistakes to avoid.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Form 11 vs Form 12: Differences and Deadlines",
      category: "Tips",
      readTime: "12 min",
      description: "A practical guide to tax forms for Irish workers: what each one declares, who must file them, exact ROS deadlines, and how to avoid Revenue penalties.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const guidesList = [
    {
      id: 1,
      title: "Remote Working Relief: Calculating Your Deduction",
      category: "Guide",
      readTime: "10 min",
      description: "How to claim working relief in 2026: calculate your allowable broadband, heating, and electricity expenses based on the latest Revenue guidelines for home workers.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Deducting Software and Tools for Irish Freelancers",
      category: "Guide",
      readTime: "12 min",
      description: "From invoicing platforms to creative software, learn how to properly deduct digital tools, subscriptions, and hardware to reduce your taxable income and PRSI liability.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Travel and Subsistence: 2026 Revenue Limit",
      category: "Guide",
      readTime: "11 min",
      description: "Know the exact civil service rates for claiming travel, the mileage allowances for claming mileage or subsistence, and how much you can save annually.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const trainingList = [
    {
      id: 1,
      title: "Tuition Fees Tax Relief: How Much Can You Claim",
      category: "Training",
      readTime: "12 min",
      description: "Undergraduate degrees, IT courses, and foreign languages: what education qualifies for tax relief at 20%, how to claim it via Revenue MyAccount, and common errors.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Tuition Fees Tax Relief: How Much Can You Claim",
      category: "Training",
      readTime: "12 min",
      description: "Undergraduate degrees, IT courses, and foreign languages: what education qualifies for tax relief at 20%, how to claim it via Revenue MyAccount, and common errors.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Allowable Tax Deductions",
      category: "Training",
      readTime: "14 min",
      description: "Understand the rules for deducting training courses as a sole trader. Learn the strict Revenue difference between acquiring brand-new skills versus updating your existing ones.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-purple-600">Blog</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Practical guides, tax advice, and the latest news on PAYE, self-employment, and Irish personal finance from Dropline Media.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition">
            Claim Your Free Irish Tax Guide →
          </button>
        </div>
      </section>

      {/* Featured Articles Carousel */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
            <img
              src={featuredArticles[currentSlide].image}
              alt={featuredArticles[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Article • {featuredArticles[currentSlide].readTime}</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {featuredArticles[currentSlide].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Read the full breakdown</p>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {featuredArticles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition ${
                      index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Pick Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Editor's Pick</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
              <img
                src={editorsPick[0].image}
                alt={editorsPick[0].title}
                className="w-full h-80 object-cover"
              />
              <div className="p-8">
                <p className="text-sm font-semibold text-blue-600 uppercase mb-2">{editorsPick[0].category}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{editorsPick[0].title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{editorsPick[0].description}</p>
              </div>
            </div>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {editorsSide.map((article) => (
              <div key={article.id} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">{article.category}</p>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 my-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay up to date with the Latest News</h2>
          <p className="text-gray-300 mb-8">Receive practical guides, tax advice, and updates on Revenue changes directly in your inbox.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Introduce to email"
              className="px-6 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none flex-1 sm:flex-initial"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tips</h2>
          <a href="#" className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium flex items-center gap-2">
            View More <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tipsList.map((tip) => (
            <div key={tip.id} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <img src={tip.image} alt={tip.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{tip.category} • {tip.readTime}</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Guides</h2>
          <a href="#" className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium flex items-center gap-2">
            View More <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guidesList.map((guide) => (
            <div key={guide.id} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <img src={guide.image} alt={guide.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{guide.category} • {guide.readTime}</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{guide.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{guide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Training Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Training/Education</h2>
          <a href="#" className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium flex items-center gap-2">
            View More <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainingList.map((training) => (
            <div key={training.id} className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <img src={training.image} alt={training.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{training.category} • {training.readTime}</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{training.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{training.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
            {/* About */}
            <div>
              <p className="text-gray-300 text-sm">
                Free Irish Income Tax Calculator helping individuals estimate Income Tax, USC, and PRSI using current Irish Revenue rates.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                <li><a href="mailto:support@irishincome.com" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
                <li><Link to="/policy" className="hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Tax Credits Explained</a></li>
                <li><a href="#" className="hover:text-white transition">USC Guide</a></li>
                <li><a href="#" className="hover:text-white transition">PRSI Guide</a></li>
              </ul>
            </div>

            {/* Calculator */}
            <div>
              <h4 className="text-white font-semibold mb-4">Calculator</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Income Tax Calculator</a></li>
                <li><a href="#" className="hover:text-white transition">Net Salary Calculator</a></li>
                <li><a href="#" className="hover:text-white transition">Take Home Pay Calculator</a></li>
                <li><a href="#" className="hover:text-white transition">Budget 2026 Updates</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              © 2026 (Income Tax Calculator). All rights reserved. Built and maintained by <a href="#" className="text-gray-400 hover:text-white">Dropline Media</a>. Estimates only. Not financial or tax advice.
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
