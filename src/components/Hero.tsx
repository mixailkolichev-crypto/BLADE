import { motion } from "motion/react";
import { ChevronDown, Sparkles, MapPin } from "lucide-react";

interface HeroProps {
  onBookingClick: () => void;
}

export default function Hero({ onBookingClick }: HeroProps) {
  const videoUrl = "https://www.pexels.com/ru-ru/download/video/34129127/";
  
  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      
      {/* Fullscreen Video Background Wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
        
        {/* Ambient underlay to prevent flash on load */}
        <div className="absolute inset-0 bg-brand-bg" />

        {/* Actual HTML5 Atmosphere Video playing */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          style={{ filter: "brightness(0.7) contrast(1.25) saturate(1.15)" }}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02c01364eb8513c2d32a0250d40e1aa&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Layered Blending Gradients to merge video with website background */}
        
        {/* 1. Global Dark Overcoat for perfect text contrast */}
        <div className="absolute inset-0 bg-brand-bg-dark/30 mix-blend-multiply" />

        {/* 2. Top-down overlay blending with the sticky transparent/dark header */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-brand-bg-dark via-brand-bg-dark/40 to-transparent" />

        {/* 3. Radial vignette keeping the center clear and blending corners into pure #0d0714 */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 15%, rgba(13, 7, 20, 0.5) 55%, #0d0714 98%)"
          }}
        />

        {/* 4. Bottom smoke-like gradient blending seamlessly with the 'About' section */}
        <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-brand-bg to-transparent" />

        {/* Ambient neon color blobs to mimic lighting flares */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-indigo/15 rounded-full blur-[140px]" />
      </div>

      {/* Content Container positioned on top of the video background (z-10) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-end min-h-[calc(100vh-80px)] relative z-10 pt-32 pb-24 lg:pb-32">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-2xl flex flex-col justify-center text-left"
        >
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/15 border border-brand-purple/20 rounded-full w-fit mb-6 shadow-[0_0_15px_rgba(188,38,245,0.1)]">
            <Sparkles size={12} className="text-brand-purple animate-pulse" />
            <span className="font-syne text-[10px] font-bold tracking-wider text-brand-purple uppercase">Premium Lounge</span>
          </div>
          
          {/* Massive Display Title */}
          <h1 className="font-syne text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase leading-none select-none mb-4">
            <span className="relative inline-block transition-all duration-500 hover:text-brand-purple hover:[text-shadow:0_0_25px_#bc26f5,0_0_50px_#bc26f5] cursor-default">
              BLADE
            </span>
          </h1>

          {/* Subtitle with Address */}
          <p className="font-sans text-lg sm:text-xl font-light text-gray-300 tracking-wide mb-3 flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-brand-purple uppercase font-syne tracking-widest text-sm">Hookah Bar & Lounge</span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-brand-gold flex items-center gap-1 text-sm sm:text-base">
              <MapPin size={16} /> Омск, ул. Ленина, 7
            </span>
          </p>

          {/* Atmospheric Tagline */}
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-lg mb-10 leading-relaxed font-light">
            Место, где каждая деталь создаёт идеальный вечер. Авторская коктейльная карта, высокая кухня пяти континентов и уникальный подбор кальяна под ваше настроение.
          </p>

          {/* Glowing CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookingClick}
              className="relative group px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-syne text-sm font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(188,38,245,0.4)] hover:shadow-[0_0_35px_rgba(188,38,245,0.75)] transition-all duration-300"
            >
              {/* Pulsing glow ring outline */}
              <span className="absolute inset-0 rounded-lg border-2 border-brand-purple opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
              Забронировать стол
            </motion.button>
            
            <a 
              href="#about"
              className="px-6 py-4 bg-transparent border border-white/10 hover:border-brand-purple hover:bg-brand-purple/5 text-gray-300 hover:text-white font-syne text-sm font-semibold uppercase tracking-widest rounded-lg transition-all duration-300"
            >
              Исследовать обзор
            </a>
          </div>
        </motion.div>

      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <button
          onClick={handleScrollDown}
          className="text-gray-400 hover:text-brand-purple transition-colors duration-300 animate-bounce cursor-pointer"
          aria-label="Scroll to content"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}
