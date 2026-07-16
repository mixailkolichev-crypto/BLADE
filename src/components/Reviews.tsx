import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { REVIEWS } from "../data";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  useEffect(() => {
    if (isAutoplayPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000); // 6 seconds auto-slide

    return () => clearInterval(interval);
  }, [isAutoplayPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const activeReview = REVIEWS[activeIndex];

  return (
    <section id="reviews" className="relative py-24 bg-brand-bg overflow-hidden">
      {/* Visual background atmospheric elements */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/3 w-[400px] h-[400px] bg-brand-indigo/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="font-syne text-xs font-bold uppercase tracking-widest text-brand-purple mb-3">
            Отзывы Гостей
          </p>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            Опыт Наших Гостей
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          className="relative max-w-4xl mx-auto min-h-[380px] sm:min-h-[300px] flex flex-col justify-center"
        >
          {/* Big quotes icon background */}
          <div className="absolute -top-10 left-6 sm:left-12 text-brand-purple/10 pointer-events-none z-0">
            <Quote size={120} strokeWidth={1} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glass-panel p-8 sm:p-14 rounded-3xl relative z-10 border-brand-purple/10 bg-brand-bg-dark/45"
            >
              <div className="flex flex-col items-center">
                
                {/* Star Ratings */}
                <div className="flex items-center gap-1.5 mb-6 text-brand-gold">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} className="drop-shadow-[0_0_6px_rgba(217,167,82,0.4)]" />
                  ))}
                </div>

                {/* Review Message Text */}
                <p className="font-sans text-base sm:text-lg text-gray-200 leading-relaxed font-light mb-8 max-w-2xl text-center italic">
                  "{activeReview.text}"
                </p>

                {/* Author Name */}
                <h4 className="font-syne text-lg font-bold text-white tracking-wide">
                  {activeReview.author}
                </h4>

                {/* Verified Tag / Date */}
                <p className="font-sans text-[10px] text-brand-gold uppercase tracking-wider mt-1 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Яндекс Отзывы • {activeReview.date}
                </p>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side Chevron Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-brand-bg-dark/80 hover:bg-brand-purple hover:text-white border border-brand-purple/15 rounded-full text-gray-400 hover:shadow-[0_0_15px_rgba(188,38,245,0.3)] transition-all duration-300 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Dots indicators */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? "w-8 bg-brand-purple" 
                      : "w-2 bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 bg-brand-bg-dark/80 hover:bg-brand-purple hover:text-white border border-brand-purple/15 rounded-full text-gray-400 hover:shadow-[0_0_15px_rgba(188,38,245,0.3)] transition-all duration-300 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

        {/* Elegant summary sentence at the bottom */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-14 font-sans text-xs text-gray-500 max-w-lg mx-auto"
        >
          Мы гордимся нашей репутацией в Омске. Более 1000 положительных оценок и постоянные гости — лучший показатель качества нашей работы.
        </motion.p>

      </div>
    </section>
  );
}
