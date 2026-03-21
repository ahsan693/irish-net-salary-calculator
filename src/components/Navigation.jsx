import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Logo from '../../Frame-84 (1).png';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
      : 'text-gray-700 hover:text-blue-600';
  };

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Calculator', to: '/' },
    { label: 'Policy', to: '/policy' },
  ];

  return (
    <nav className="sticky top-0 bg-white dark:bg-slate-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img
              src={Logo}
              alt="Irish Income Tax Calculator logo"
              className="h-9 w-auto"
            />
            <span className="sr-only">Irish Income Tax Calculator</span>
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`pb-1 transition ${isActive(item.to)}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop theme toggle */}
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-100 bg-white/80 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            aria-label="Toggle dark mode"
         >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </>
            )}
          </button>

          {/* Desktop CTA */}
          <button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition">
            Claim Your Free Irish Tax Guide
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile theme toggle */}
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 bg-white/80 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Open navigation</span>
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-100 rounded" />
              <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-100 rounded" />
              <span className="block w-5 h-0.5 bg-gray-700 dark:bg-gray-100 rounded" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 w-full h-full bg-black/40"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <div className="relative h-full flex justify-end">
            <div className="w-72 max-w-xs h-full bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  aria-label="Close navigation menu"
                  onClick={closeMenu}
                >
                  <span className="sr-only">Close</span>
                  <span className="block w-4 h-0.5 bg-gray-700 rotate-45 translate-y-0.5" />
                  <span className="block w-4 h-0.5 bg-gray-700 -rotate-45 -translate-y-0.5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={`block text-sm font-medium ${
                      location.pathname === item.to
                        ? 'text-blue-600'
                        : 'text-gray-800 dark:text-gray-100 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <button
                  type="button"
                  onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 bg-white/80 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <>
                      <Moon className="w-4 h-4" />
                      <span>Dark theme</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" />
                      <span>Light theme</span>
                    </>
                  )}
                </button>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition">
                  Claim Your Free Irish Tax Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
