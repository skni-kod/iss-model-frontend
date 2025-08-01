import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import CTASection from "./_components/CTASection";

function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}

export default HomePage;
