import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CodingProfilesDashboard from "@/components/CodingProfilesDashboard";
import CodolioAwardsSection from "@/components/CodolioAwardsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AchievementsSection from "@/components/AchievementsSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent">
      <AnimatedBackground />
      <div className="relative z-10 text-foreground overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CodingProfilesDashboard />
        <CodolioAwardsSection />
        <CertificationsSection />
        <AchievementsSection />
        <GitHubSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
