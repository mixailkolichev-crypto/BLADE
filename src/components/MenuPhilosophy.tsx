import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UtensilsCrossed, ShieldAlert, Award, Coffee, GlassWater } from "lucide-react";
import { MENU_CATEGORIES } from "../data";

export default function MenuPhilosophy() {
  const [activeTab, setActiveTab] = useState("kitchen");

  const activeCategory = MENU_CATEGORIES.find((cat) => cat.id === activeTab) || MENU_CATEGORIES[0];

  const iconMap: Record<string, any> = {
    kitchen: <UtensilsCrossed size={18} />,
    bar: <GlassWater size={18} />,
    tea: <Coffee size={18} />,
  };

  return (
    <section id="menu" className="relative py-24 bg-brand-bg-dark/60 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-syne text-xs font-bold uppercase tracking-widest text-brand-gold mb-3"
          >
            Кухня & Философия Вкуса
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-6"
          >
            Меню Пяти Континентов
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-gray-400 font-light leading-relaxed"
          >
            В отличие от обычных кальянных, в BLADE мы возвели гастрономию в культ. Полноценная кухня, изысканные авторские коктейли и редкая коллекция китайских чаёв дополнят ваш отдых.
          </motion.p>
        </div>

        {/* Layout: Sidebar and Menu List */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Sidebar Tabs & Policy Banner (40% width) */}
          <div className="w-full lg:w-5/12 flex flex-col gap-8">
            
            {/* Navigation Tabs */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col gap-2">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full px-5 py-4 rounded-xl flex items-center justify-between font-syne text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative overflow-hidden text-left ${
                      isActive 
                        ? "text-white shadow-[0_4px_20px_rgba(188,38,245,0.15)]" 
                        : "text-gray-400 hover:text-white hover:bg-white/3"
                    }`}
                  >
                    {/* Active tab colored background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-gradient-to-r from-brand-indigo/60 to-brand-purple/50 -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <span className={isActive ? "text-brand-purple" : "text-gray-400"}>
                        {iconMap[cat.id]}
                      </span>
                      <span>{cat.name}</span>
                    </div>

                    <span className={`text-[10px] uppercase font-bold tracking-widest relative z-10 ${isActive ? "text-brand-gold" : "text-gray-500"}`}>
                      {isActive ? "Смотреть" : "Раздел"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Elegant House Rules Warning Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-6 sm:p-8 bg-brand-bg border border-brand-gold/25 rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Soft gold/amber corner highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex gap-4 items-start relative z-10">
                <div className="flex-shrink-0 p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl">
                  <ShieldAlert className="text-brand-gold" size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    Правила нашего клуба
                    <span className="px-1.5 py-0.5 bg-brand-gold/20 border border-brand-gold/30 rounded text-[9px] text-brand-gold font-bold">18+</span>
                  </h4>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                    Кальянная зона доступна исключительно для совершеннолетних гостей, заказывающих кальян. Пожалуйста, не забудьте взять с собой <strong className="text-brand-gold font-semibold">оригинал паспорта</strong> для подтверждения возраста. Мы заботимся о соблюдении всех правил и комфорте каждого гостя.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Active Category Menu List (60% width) */}
          <div className="w-full lg:w-7/12 min-h-[400px]">
            <div className="text-left mb-6">
              <span className="font-syne text-[10px] font-bold text-brand-purple uppercase tracking-widest block mb-1">
                Категория
              </span>
              <h3 className="font-syne text-2xl font-bold text-white uppercase tracking-wide">
                {activeCategory.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 font-light mt-1">
                {activeCategory.description}
              </p>
            </div>

            {/* Grid of Menu Items */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-brand-purple/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8"
                >
                  {activeCategory.items.map((item, index) => (
                    <div
                      key={item.name}
                      className="group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 last:pb-0 border-b border-white/5 last:border-0"
                    >
                      <div className="text-left max-w-xl">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="font-syne text-base font-bold text-white group-hover:text-brand-purple transition-colors duration-300">
                            {item.name}
                          </h4>
                          {item.tag && (
                            <span className="px-2 py-0.5 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple rounded-full text-[9px] font-syne font-bold uppercase tracking-wider">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-gray-400 font-light mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="font-syne text-base font-bold text-brand-gold bg-brand-gold/5 border border-brand-gold/15 px-3 py-1 rounded-lg self-end sm:self-center">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quality badge accent */}
            <div className="flex items-center gap-2 mt-6 text-[10px] font-syne font-bold uppercase tracking-widest text-gray-500 justify-end">
              <Award size={12} className="text-brand-gold" />
              <span>Только сертифицированные премиальные ингредиенты</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
