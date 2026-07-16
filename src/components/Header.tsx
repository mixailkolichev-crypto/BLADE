import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Calendar } from "lucide-react";

interface HeaderProps {
  onBookingClick: () => void;
}

export default function Header({ onBookingClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { id: "about", label: "Обзор" },
    { id: "menu", label: "Меню" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link detection
      const sections = navLinks.map((link) => document.getElementById(link.id));
      let currentSection = "";
      sections.forEach((sec) => {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sec.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-bg-dark/85 backdrop-blur-md border-b border-brand-purple/10 py-4 shadow-lg shadow-brand-bg-dark/50"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-syne text-2xl font-extrabold tracking-widest text-white hover:text-brand-purple transition-all duration-300 relative group flex items-center"
        >
          <span className="text-brand-purple">B</span>LADE
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-purple transition-all duration-300 group-hover:w-full" />
          {/* Subtle neon dot */}
          <span className="w-1.5 h-1.5 bg-brand-purple rounded-full ml-1 animate-pulse shadow-[0_0_8px_#bc26f5]" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`font-sans text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-brand-purple ${
                activeSection === link.id ? "text-brand-purple font-semibold" : "text-gray-300"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-purple shadow-[0_0_8px_#bc26f5]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Call to Action Button */}
        <div className="hidden md:flex items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookingClick}
            className="px-6 py-2.5 bg-transparent border border-brand-purple hover:bg-brand-purple text-white hover:shadow-[0_0_15px_rgba(188,38,245,0.5)] font-syne text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <Calendar size={14} className="text-brand-purple group-hover:text-white" />
            Забронировать
          </motion.button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:text-brand-purple transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-bg-dark/95 backdrop-blur-lg border-b border-brand-purple/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-sans text-base font-medium tracking-wide py-2 ${
                    activeSection === link.id ? "text-brand-purple" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookingClick();
                }}
                className="w-full mt-2 py-3 bg-brand-purple text-white hover:bg-brand-purple-dark font-syne text-sm font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Calendar size={16} />
                Забронировать стол
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
