import { ArrowUp, Star } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-brand-bg-dark border-t border-brand-purple/10 py-12 z-10 overflow-hidden">
      {/* Decorative linear glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand and info */}
        <div className="text-center md:text-left">
          <div className="font-syne text-xl font-extrabold tracking-widest text-white mb-2 uppercase">
            <span className="text-brand-purple">B</span>LADE
          </div>
          <p className="font-sans text-xs text-gray-500 max-w-sm font-light">
            © {new Date().getFullYear()} BLADE Hookah Bar & Lounge. Омск, ул. Ленина, 7. Все права защищены. Чрезмерное употребление кальяна может нанести вред вашему здоровью. 18+
          </p>
        </div>

        {/* Social / Info links */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="flex gap-6">
            <a
              href="#about"
              className="font-syne text-xs font-semibold text-gray-400 hover:text-brand-purple uppercase tracking-wider transition-colors duration-300"
            >
              Обзор
            </a>
            <a
              href="#menu"
              className="font-syne text-xs font-semibold text-gray-400 hover:text-brand-purple uppercase tracking-wider transition-colors duration-300"
            >
              Меню
            </a>
            <a
              href="#reviews"
              className="font-syne text-xs font-semibold text-gray-400 hover:text-brand-purple uppercase tracking-wider transition-colors duration-300"
            >
              Отзывы
            </a>
            <a
              href="#contacts"
              className="font-syne text-xs font-semibold text-gray-400 hover:text-brand-purple uppercase tracking-wider transition-colors duration-300"
            >
              Резерв
            </a>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold font-syne text-[10px] font-bold uppercase tracking-wider">
            <Star size={12} fill="currentColor" />
            <span>5.0 На Яндекс.Картах</span>
          </div>
        </div>

        {/* Scroll back to top */}
        <button
          onClick={handleScrollToTop}
          className="p-3 bg-brand-bg hover:bg-brand-purple border border-brand-purple/20 text-gray-400 hover:text-white rounded-full hover:shadow-[0_0_15px_rgba(188,38,245,0.25)] transition-all duration-300 cursor-pointer flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} className="transform group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
}
