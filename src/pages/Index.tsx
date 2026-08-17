import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Hero from "@/components/Hero";
import VideoTextBanner from "@/components/VideoTextBanner";
import Benefits from "@/components/Benefits";
import Courses from "@/components/Courses";
import Categories from "@/components/Categories";
import SocialProof from "@/components/SocialProof";
import BlogSection from "@/components/BlogSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PopupDisplay from "@/components/PopupDisplay";
import Reveal from "@/components/Reveal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <SubNav />
      <main>
        <Hero />
        <Reveal>
          <VideoTextBanner />
        </Reveal>
        <Courses />
        <Reveal>
          <Benefits />
        </Reveal>
        <Categories />
        <Reveal>
          <SocialProof />
        </Reveal>
        <Reveal>
          <BlogSection />
        </Reveal>
        <Reveal>
          <FinalCTA />
        </Reveal>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <PopupDisplay />
    </div>
  );
};

export default Index;
