"use client";
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  interface ContactFormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    service: string;
    message: string;
  }

  interface ApiResponse {
    error?: string;
    [key: string]: any;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response: Response = await fetch("https://ecocarbonbackend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        alert(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      details: ['+91 XXX XXX XXX', '+91 XXX XXX XXX']
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      details: ['info@ecocarbon.com', 'support@ecocarbon.com']
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Office',
      details: ['Konark Alpha, Sr No 50, 2, Nagar Road, Kharadi, Pune, Maharashtra']
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM']
    }
  ];

  const offices = [
    {
      city: 'Pune',
      address: 'Kharadi, Pune',
      phone: '+91 XXX XXX XXX',
      image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      city: 'Kolkata',
      address: 'Ruby, Kolkata',
      phone: '+91 XXX XXX XXX',
      image: 'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      city: 'Pune',
      address: 'Kalyani Nagar, Pune',
      phone: '+91 XXX XXX XXX',
      image: 'https://images.pexels.com/photos/1497394/pexels-photo-1497394.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  return (
    <>
      <Head>
        <title>Contact EcoCarbon | Carbon Offset & Sustainability Solutions</title>
        <meta name="description" content="Get in touch with EcoCarbon to discuss carbon offset and sustainability solutions. Contact us via form, email, or phone." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="EcoCarbon contact, carbon offset, sustainability solutions, renewable energy, forest conservation, sustainability consulting" />
        <meta property="og:title" content="Contact EcoCarbon | Carbon Offset & Sustainability Solutions" />
        <meta property="og:description" content="Reach out to EcoCarbon to discuss your carbon offset and sustainability goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ecocarbon.com/contact" />
        <meta property="og:image" content="https://images.pexels.com/photos/1108175/pexels-photo-1108175.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact EcoCarbon | Carbon Offset & Sustainability Solutions" />
        <meta name="twitter:description" content="Reach out to EcoCarbon to discuss your carbon offset and sustainability goals." />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1108175/pexels-photo-1108175.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EcoCarbon",
              "url": "https://www.ecocarbon.com",
              "logo": "https://www.ecocarbon.com/logo.png",
              "sameAs": ["https://www.linkedin.com/company/ecocarbon", "https://www.facebook.com/ecocarbon"],
              "contactPoint": contactInfo.map(info => ({
                "@type": "ContactPoint",
                "telephone": info.details[0] || "",
                "contactType": info.title
              })),
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Konark Alpha, Sr No 50, 2, Nagar Road, Kharadi",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411014",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </Head>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.pexels.com/photos/1108175/pexels-photo-1108175.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-3xl mx-auto"
            >
              Ready to start your sustainability journey? Get in touch with our experts to discuss your carbon offset needs.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Form">
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField name="name" label="Full Name *" type="text" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
                    <InputField name="email" label="Email Address *" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField name="company" label="Company" type="text" value={formData.company} onChange={handleChange} placeholder="Your company" />
                    <InputField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      aria-label="Service Interest"
                    >
                      <option value="">Select a service</option>
                      <option value="carbon-offsetting">Carbon Offsetting</option>
                      <option value="renewable-energy">Renewable Energy</option>
                      <option value="forest-conservation">Forest Conservation</option>
                      <option value="sustainability-consulting">Sustainability Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us about your sustainability goals and how we can help..."
                      aria-label="Message"
                    />
                  </div>
                  <button type="submit" className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center font-medium">
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help you achieve your sustainability goals. Contact us today to learn more about our carbon offset solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="bg-green-100 text-green-600 p-3 rounded-full">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With locations across the globe, we're always close to our clients and projects.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={office.city + index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={office.image}
                    alt={`${office.city} office location`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{office.city}</h3>
                    <address className="space-y-2 text-gray-600 not-italic">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-600" /> {office.address}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" /> {office.phone}
                      </div>
                    </address>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Reusable input component for better SEO & accessibility
const InputField = ({ name, label, type, value, onChange, placeholder, required }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      aria-label={label}
    />
  </div>
);

