"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Wind, Sun, Trees, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import contact from '../app/contact/page';


interface AnimatedCounterProps {
  value: number;
  duration: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let incrementTime = (duration * 1000) / end;
    let timer: NodeJS.Timeout;

    const runCounter = () => {
      start += 1;
      setCount(start);
      if (start < end) {
        timer = setTimeout(runCounter, incrementTime);
      }
    };

    runCounter();
    return () => clearTimeout(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

const Home = () => {
  const features = [
    {
      icon: <Wind className="h-8 w-8" />,
      title: 'Renewable Energy',
      description: 'Supporting wind and solar projects that provide clean, sustainable energy.',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
    },
    {
      icon: <Trees className="h-8 w-8" />,
      title: 'Forest Conservation',
      description: 'Protecting and restoring forests to preserve biodiversity and capture carbon.',
      image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg',
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Carbon Offsetting',
      description: 'Comprehensive carbon offset solutions to neutralize your environmental impact.',
      image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg',
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: 'Solar Projects',
      description: 'Large-scale solar installations reducing dependence on fossil fuels.',
      image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Solutions Inc.',
      text: 'EcoCarbon helped us achieve carbon neutrality with their comprehensive offset programs. Highly recommended!',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'Green Manufacturing',
      text: 'Professional service and transparent reporting. They made our sustainability goals achievable.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      company: 'Sustainable Logistics',
      text: 'Excellent team with deep expertise in environmental sustainability. Great partnership!',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 5,
    },
  ];

  const scrollToFooter = useCallback(() => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById('footer');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <Head>
        <title>EcoCarbon - Sustainable Carbon Solutions</title>
        <meta
          name="description"
          content="Leading carbon offset solutions through renewable energy, forest conservation, and innovative sustainability projects."
        />
        <meta
          name="keywords"
          content="carbon offset, renewable energy, forest conservation, sustainability, EcoCarbon"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="EcoCarbon - Sustainable Carbon Solutions" />
        <meta property="og:description" content="Leading carbon offset solutions through renewable energy, forest conservation, and innovative sustainability projects." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EcoCarbon - Sustainable Carbon Solutions" />
        <meta name="twitter:description" content="Leading carbon offset solutions through renewable energy, forest conservation, and innovative sustainability projects." />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg" />
      </Head>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg)',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Building a Sustainable
              <span className="text-green-400 block">Future Together</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
            >
              Leading carbon offset solutions through renewable energy, forest conservation, and innovative sustainability projects.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-900 transition-all duration-300 transform hover:scale-90"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
          <button
            onClick={scrollToFooter}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-green-300 transition-colors animate-bounce"
            aria-label="Scroll to Footer"
          >
            <ArrowDown className="h-8 w-8" />
          </button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive carbon offset solutions tailored to your organization's sustainability goals.
              </p>
            </motion.div>

            {/* Mobile Horizontal Scroll */}
            {isMobile && (
              <div className="flex gap-4 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 w-[85vw] snap-center"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[500px] group">
                      <Image src={feature.image} alt={feature.title} layout="fill" objectFit="cover" className="rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
                        className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center text-green-600 shadow-lg z-20"
                      >
                        {feature.icon}
                      </motion.div>
                      <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                        <div className="inline-flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full mb-3">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          <span className="font-semibold text-xs">Solution {index + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{feature.title}</h3>
                        <p className="text-gray-200 text-sm leading-relaxed mb-4">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Desktop Layout */}
            {!isMobile && (
              <div className="space-y-32">
                {features.map((feature, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-16`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2 relative overflow-hidden rounded-3xl shadow-2xl"
                      >
                        <Image src={feature.image} alt={feature.title} width={600} height={400} className="w-full h-full object-cover rounded-3xl" />
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
                          className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 shadow-lg z-20"
                        >
                          {feature.icon}
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full md:w-1/2"
                      >
                        <div className="max-w-lg">
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                          <p className="text-gray-600 mb-6">{feature.description}</p>
                          <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-800 transition-all duration-300">
                            Learn More <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <AnimatedCounter value={5000} duration={2} suffix="+" />
                <p className="mt-2 text-gray-600">Tons of CO₂ Offset</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <AnimatedCounter value={120} duration={2} suffix="+" />
                <p className="mt-2 text-gray-600">Projects Completed</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <AnimatedCounter value={3000} duration={2} suffix="+" />
                <p className="mt-2 text-gray-600">Trees Planted</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <AnimatedCounter value={150} duration={2} suffix="+" />
                <p className="mt-2 text-gray-600">Satisfied Clients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-50 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mb-4 object-cover"
                  />
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <span className="text-gray-500 text-sm">{testimonial.company}</span>
                  <div className="flex mt-2 space-x-1 text-yellow-400">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

 

        {/* Footer */}
        <footer id="footer" className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} EcoCarbon. All rights reserved.</p>
            <p className="mt-2 text-gray-400">Designed with ♻️ for a greener future.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
