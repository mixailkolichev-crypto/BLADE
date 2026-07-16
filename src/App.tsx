import CustomCursor from "./components/CustomCursor";
import SmokeBackground from "./components/SmokeBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuPhilosophy from "./components/MenuPhilosophy";
import Reviews from "./components/Reviews";
import BookingContacts from "./components/BookingContacts";
import Footer from "./components/Footer";

export default function App() {
  const handleBookingClick = () => {
    const contactsSection = document.getElementById("contacts");
    if (contactsSection) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-gray-100 selection:bg-brand-purple/20 selection:text-white overflow-x-hidden">
      
      {/* Premium Cursor inertia dot and ring */}
      <CustomCursor />

      {/* Atmospheric Canvas particle-smoke simulation */}
      <SmokeBackground />

      {/* Sticky top glassmorphism navigation menu */}
      <Header onBookingClick={handleBookingClick} />

      {/* Main Single Page Website Sections */}
      <main className="relative z-10">
        
        {/* Split Screen Hero with seamlessly overlaid atmosphere video */}
        <Hero onBookingClick={handleBookingClick} />

        {/* Overview of Premium strengths: hookahs, sofas, feeling over brand */}
        <About />

        {/* Menu highlights (five continents, premium bar, teas) + House Rules policy */}
        <MenuPhilosophy />

        {/* Carousel of 3 real customer reviews */}
        <Reviews />

        {/* Dynamic Reservation Form + Contacts list + Call buttons service card */}
        <BookingContacts />

      </main>

      {/* Copyright footer with back-to-top button */}
      <Footer />

    </div>
  );
}
