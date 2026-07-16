import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Clock, CalendarDays, Users, CheckCircle, BellRing, Sparkles } from "lucide-react";

export default function BookingContacts() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Default values for date and time inputs to look ready
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    
    // Simulate premium reservation API response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
    });
    setIsBooked(false);
  };

  return (
    <section id="contacts" className="relative py-24 bg-brand-bg-dark/75 overflow-hidden">
      {/* Decorative colored glow orbs */}
      <div className="absolute left-1/10 top-1/2 -translate-y-1/2 w-80 h-80 bg-brand-indigo/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-1/10 bottom-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information & Comfort Callout (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            {/* Header tags */}
            <span className="font-syne text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">
              Ждем вас
            </span>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-8">
              Контакты & Визит
            </h2>

            {/* Information Rows */}
            <div className="flex flex-col gap-6 mb-10">
              
              {/* Address card */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-brand-purple">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-syne text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Адрес</h4>
                  <p className="font-sans text-sm text-white font-medium">Омск, ул. Ленина, 7</p>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">Вход со стороны главной улицы, первый этаж</p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-brand-purple">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-syne text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Резерв & Телефон</h4>
                  <p className="font-sans text-sm text-white font-medium hover:text-brand-purple transition-colors duration-300">
                    <a href="tel:+73812777777">+7 (3812) 77-77-77</a>
                  </p>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">Рекомендуем бронировать столы заранее</p>
                </div>
              </div>

              {/* Opening Hours card */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-brand-purple">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-syne text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Режим работы</h4>
                  <div className="grid grid-cols-2 gap-x-4 text-sm font-medium text-white">
                    <span className="text-gray-400 font-normal">Пн – Чт:</span>
                    <span>14:00 – 02:00</span>
                    <span className="text-gray-400 font-normal">Пт – Сб:</span>
                    <span>14:00 – 04:00</span>
                    <span className="text-gray-400 font-normal">Вс:</span>
                    <span>14:00 – 02:00</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Service Improvement Note Callout Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-brand-bg border-l-4 border-brand-purple rounded-r-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/5 rounded-full blur-xl" />
              <div className="flex gap-4 items-start relative z-10">
                <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple flex-shrink-0 animate-pulse">
                  <BellRing size={18} />
                </div>
                <div>
                  <h4 className="font-syne text-xs font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    Сервис Безупречного Класса
                  </h4>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                    Все столы в нашем заведении оснащены <strong className="text-brand-purple font-medium">индивидуальными беспроводными кнопками вызова персонала</strong>. Ваш персональный мастер и официант всегда рядом, сохраняя приватность и обеспечивая максимальный комфорт в любой момент вечера.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Side: Interactive Glassmorphic Booking Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl relative border-brand-purple/15 bg-brand-bg-dark/45 min-h-[480px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  /* Booking Form State */
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 text-left"
                  >
                    <div>
                      <h3 className="font-syne text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-1.5">
                        Онлайн-Резервирование
                      </h3>
                      <p className="font-sans text-xs text-gray-400 font-light">
                        Заполните форму, и мы мгновенно свяжемся с вами для подтверждения бронирования.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                      {/* Name field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-syne text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ваше имя</label>
                        <input
                          type="text"
                          required
                          placeholder="Алексей"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="px-4 py-3 bg-brand-bg-dark border border-brand-purple/15 rounded-xl text-sm text-white focus:outline-none focus:border-brand-purple focus:shadow-[0_0_10px_rgba(188,38,245,0.2)] transition-all duration-300"
                        />
                      </div>

                      {/* Phone field */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-syne text-[10px] font-bold text-gray-400 uppercase tracking-wider">Номер телефона</label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="px-4 py-3 bg-brand-bg-dark border border-brand-purple/15 rounded-xl text-sm text-white focus:outline-none focus:border-brand-purple focus:shadow-[0_0_10px_rgba(188,38,245,0.2)] transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Date selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-syne text-[10px] font-bold text-gray-400 uppercase tracking-wider">Дата визита</label>
                        <div className="relative">
                          <input
                            type="date"
                            min={today}
                            required
                            value={formData.date || today}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-bg-dark border border-brand-purple/15 rounded-xl text-sm text-white focus:outline-none focus:border-brand-purple transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Time selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-syne text-[10px] font-bold text-gray-400 uppercase tracking-wider">Время визита</label>
                        <input
                          type="time"
                          required
                          placeholder="20:00"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="px-4 py-3 bg-brand-bg-dark border border-brand-purple/15 rounded-xl text-sm text-white focus:outline-none focus:border-brand-purple transition-all duration-300"
                        />
                      </div>

                      {/* Guests number */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-syne text-[10px] font-bold text-gray-400 uppercase tracking-wider">Количество гостей</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="px-4 py-3 bg-brand-bg-dark border border-brand-purple/15 rounded-xl text-sm text-white focus:outline-none focus:border-brand-purple transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="1">1 гость</option>
                          <option value="2">2 гостя</option>
                          <option value="3">3 гостя</option>
                          <option value="4">4 гостя</option>
                          <option value="5-8">5 - 8 гостей</option>
                          <option value="9+">Более 9 гостей</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-syne text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(188,38,245,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                          <span>Резервируем...</span>
                        </>
                      ) : (
                        <>
                          <CalendarDays size={16} />
                          <span>Подтвердить бронирование</span>
                        </>
                      )}
                    </button>
                    
                    {/* Secure policy consent notice */}
                    <p className="text-[10px] text-gray-500 font-light text-center">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Администратор свяжется с вами по указанному телефону.
                    </p>
                  </motion.form>
                ) : (
                  /* Success Booking State */
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    >
                      <CheckCircle size={44} />
                    </motion.div>

                    <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide mb-2">
                      Стол забронирован!
                    </h3>
                    
                    <p className="font-sans text-sm text-gray-300 font-light max-w-lg mb-8 leading-relaxed">
                      Прекрасный выбор, <strong className="text-white font-semibold">{formData.name}</strong>. Мы зарезервировали зону для компании из <strong className="text-brand-purple font-semibold">{formData.guests} {formData.guests === "1" ? "гостя" : "гостей"}</strong> на <strong className="text-brand-gold font-semibold">{formData.date || today}</strong> в <strong className="text-brand-gold font-semibold">{formData.time}</strong>. Наш администратор перезвонит вам на номер <span className="text-white font-medium">{formData.phone}</span> в течение 5 минут для подтверждения.
                    </p>

                    {/* Summary visual card */}
                    <div className="w-full max-w-md bg-brand-bg-dark/85 border border-brand-purple/10 rounded-2xl p-5 mb-8 flex flex-col gap-3 text-left">
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                        <span className="text-gray-500 font-syne uppercase tracking-wider font-semibold">Детали визита</span>
                        <span className="text-brand-purple font-syne uppercase tracking-wider font-bold flex items-center gap-1">
                          <Sparkles size={11} className="animate-pulse" /> BLADE Club
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Гость:</span>
                        <span className="text-white font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Контакты:</span>
                        <span className="text-white font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Дата & Время:</span>
                        <span className="text-brand-gold font-medium">{formData.date || today} — {formData.time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Стол на:</span>
                        <span className="text-white font-medium">{formData.guests} {formData.guests === "1" ? "человека" : "человек"}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-brand-bg hover:bg-white/5 border border-white/10 text-gray-300 font-syne text-xs font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      Забронировать еще раз
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
