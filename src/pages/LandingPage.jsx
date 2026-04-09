import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import CTASection from '../components/sections/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar + Hero – cream background */}
      <div className="bg-[#f0f0eb]">
        <Navbar />
        <HeroSection />
      </div>

      {/* Features – white */}
      <div className="bg-white">
        <FeaturesSection />
      </div>

      {/* CTA + Footer – back to cream */}
      <div className="bg-[#f0f0eb] flex flex-col flex-1">
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
