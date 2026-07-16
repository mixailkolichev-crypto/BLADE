import { motion } from "motion/react";
import { Sparkles, Wind, Compass } from "lucide-react";
import { PHILOSOPHY_CARDS } from "../data";
import TiltCard from "./TiltCard";

const iconMap: Record<string, any> = {
  Sparkles: Sparkles,
  Wind: Wind,
  Compass: Compass,
};

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative py-24 bg-brand-bg overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-indigo/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-syne text-xs font-bold uppercase tracking-widest text-brand-purple mb-3"
          >
            Концепция Отдыха
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-6"
          >
            Уникальный опыт в Омске
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-gray-400 font-light leading-relaxed"
          >
            BLADE — это не просто кальянная. Это уединённый оазис комфорта, где гостеприимство соединяется с инновациями. Мы создали пространство с особым ритмом для вашей максимальной разгрузки.
          </motion.p>
        </div>

        {/* Philosophy Cards Grid with 3D Tilt Effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PHILOSOPHY_CARDS.map((card) => {
            const IconComponent = iconMap[card.icon] || Sparkles;
            return (
              <motion.div key={card.id} variants={itemVariants} className="h-full">
                <TiltCard maxTilt={8} className="h-full">
                  <div className="glass-panel p-8 sm:p-10 rounded-2xl h-full flex flex-col justify-between group hover:border-brand-purple/45 transition-colors duration-500 shadow-xl shadow-brand-bg-dark/20 relative overflow-hidden">
                    
                    {/* Glowing card border accents on hover */}
                    <div className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent group-hover:via-brand-purple opacity-50 transition-all duration-500" />
                    
                    <div>
                      {/* Icon */}
                      <div className="w-14 h-14 bg-brand-indigo/30 rounded-xl flex items-center justify-center border border-brand-purple/20 mb-8 group-hover:bg-brand-purple group-hover:shadow-[0_0_15px_rgba(188,38,245,0.4)] transition-all duration-500">
                        <IconComponent className="text-brand-purple group-hover:text-white transition-colors duration-500" size={24} />
                      </div>

                      {/* Header */}
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-brand-purple transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="font-syne text-[10px] font-semibold text-brand-gold uppercase tracking-widest mb-4">
                        {card.subtitle}
                      </p>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Interactive bottom arrow accent */}
                    <div className="mt-8 flex items-center gap-2 text-[10px] font-syne font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300">
                      <span>Подробнее</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comfort Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 glass-panel p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-brand-purple/10"
        >
          <div className="max-w-2xl text-left">
            <h4 className="font-syne text-lg sm:text-xl font-bold text-white mb-2 uppercase tracking-wide">
              Идеальный вечер в приятной компании
            </h4>
            <p className="font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Все наши столы разработаны с учетом приватности. Широкие мягкие диваны изолированы друг от друга перегородками и направленным мягким светом. Ничто не помешает вашей беседе.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#contacts"
              className="px-6 py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-syne text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 inline-block shadow-md hover:shadow-lg hover:shadow-brand-purple/20"
            >
              Зарезервировать зону
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
