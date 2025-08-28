import { Calendar, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Github, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Pricing", href: "/pricing" },
      { name: "Careers", href: "/careers" },
    ],
    events: [
      { name: "Browse Events", href: "/" },
      { name: "Create Event", href: "/create-event" },
      { name: "Event Categories", href: "/categories" },
      { name: "Featured Events", href: "/featured" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Community", href: "/community" },
      { name: "Event Guidelines", href: "/guidelines" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/eventhub" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/eventhub" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/eventhub" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/eventhub" },
    { name: "GitHub", icon: Github, href: "https://github.com/eventhub" },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7DA3D8] to-[#4F6789] rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] bg-clip-text text-transparent">
                EventHub
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Discover amazing events, connect with like-minded people, and create unforgettable experiences in your city and beyond.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 text-[#1976d2]" />
                <span>hello@eventhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 text-[#1976d2]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-[#1976d2]" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1976d2] dark:hover:text-[#7DA3D8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Events
            </h3>
            <ul className="space-y-3">
              {footerLinks.events.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1976d2] dark:hover:text-[#7DA3D8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1976d2] dark:hover:text-[#7DA3D8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1976d2] dark:hover:text-[#7DA3D8] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-[#E8F1FC] to-[#D9E4F4] dark:from-[#4F6789]/20 dark:to-[#7DA3D8]/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Stay updated with the latest events
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get weekly updates on trending events in your area and exclusive early access to featured events.
              </p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1976d2] text-sm"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#7DA3D8] to-[#4F6789] text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          {/* Social Links */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear} EventHub. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
