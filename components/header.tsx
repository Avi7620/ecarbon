"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/CarbonCreditsPage", label: "Carbon Credits" },
    { href: "/calculator", label: "Calculator" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/AdminDashboard", label: "Admin" },
  ];

  return (
    <>
      {/* ✅ SEO Meta */}
      <Head>
        <title>eCARBON - Carbon Credits Marketplace & Calculator</title>
        <meta
          name="description"
          content="Explore eCARBON – Your hub for carbon credits trading, marketplace insights, carbon calculators, and sustainable projects."
        />
        <meta
          name="keywords"
          content="carbon credits, carbon marketplace, carbon calculator, carbon offset, sustainability, eCARBON"
        />
      </Head>

      {/* ✅ Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ✅ Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="bg-gradient-to-r from-emerald-600 to-green-500 p-2 rounded-lg"
              >
                <Leaf className="h-6 w-6 text-white" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold text-gray-900"
              >
                eCARBON
              </motion.span>
            </Link>

            {/* ✅ Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 font-medium group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-600 transition-all group-hover:w-full" />
                </Link>
              ))}
              <Button className="bg-gradient-to-r from-emerald-600 to-green-500 hover:shadow-lg hover:scale-105 transition-transform">
                Get Started
              </Button>
            </div>

            {/* ✅ Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* ✅ Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-6 space-y-4 bg-white rounded-lg shadow-lg mt-2"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:shadow-lg hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}
