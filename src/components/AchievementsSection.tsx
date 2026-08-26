import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Sparkles, CheckCircle2, Award, Code2, ShieldCheck } from "lucide-react";
import { useCodingProfiles } from "@/hooks/useCodingProfiles";

interface AchievementItem {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  year: string;
  icon: any;
  color: string;
  badgeBg: string;
  border: string;
  glow: string;
  highlights: string[];
}

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data } = useCodingProfiles();
  const leetcodeData = data?.platforms.find(p => p.platform === "leetcode");
  const lcSolved = leetcodeData?.stats?.totalSolved || "800+"; // Graceful fallback

  const achievements: AchievementItem[] = [
    {
      title: "GATE 2026 Qualified",
      category: "National Examination",
      subtitle: "Computer Science & Information Technology",
      year: "2026",
      description:
        "Successfully qualified the Graduate Aptitude Test in Engineering (GATE 2026) in Computer Science & Information Technology, demonstrating rigorous theoretical mastery in computer science fundamentals.",
      highlights: [
        "Mastery of core CS: Algorithms, Operating Systems, Computer Architecture, DBMS, Networks",
        "Rigorous problem-solving under strict timed competitive conditions",
        "Demonstrated depth in Discrete Mathematics and Theory of Computation",
      ],
      icon: Trophy,
      color: "text-orange-400",
      badgeBg: "bg-orange-500/15 text-orange-400 border-orange-500/30",
      border: "border-orange-500/30",
      glow: "rgba(249,115,22,0.25)",
    },
    {
      title: `LeetCode ${lcSolved} Problems Solved`,
      category: "Competitive Programming",
      subtitle: "Data Structures & Algorithmic Problem Solving",
      year: "2023 - Present",
      description:
        `Solved ${lcSolved} algorithmic problems across diverse categories on LeetCode with active daily streaks, building strong intuition for complex time and space complexity optimizations.`,
      highlights: [
        "Extensive coverage of Arrays, Binary Trees, Graph Traversal, Recursion, Dynamic Programming",
        "Active contest participation and continuous platform advancement",
        "Live data tracking ensuring authentic representation of skills",
      ],
      icon: Code2,
      color: "text-emerald-400",
      badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      border: "border-emerald-500/30",
      glow: "rgba(16,185,129,0.25)",
    },
    {
      title: "Certified Full-Stack Architect",
      category: "Industry Certifications",
      subtitle: "System Design & Web Technologies",
      year: "2025",
      description:
        "Earned extensive industry-recognized certifications spanning Web Architecture, Backend Engineering, Cloud Infrastructure, and advanced deployment strategies.",
      highlights: [
        "Architecting robust monoliths and microservices",
        "Implementing secure authentication flows and database schemas",
        "Automated CI/CD pipelines and deployment best practices",
      ],
      icon: ShieldCheck,
      color: "text-primary",
      badgeBg: "bg-primary/15 text-primary border-primary/30",
      border: "border-primary/30",
      glow: "rgba(139,92,246,0.25)",
    },
  ];

  return (
    <section id="achievements" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Award size={13} />
            <span>Milestones & Recognition</span>
          </div>
          <h2 className="section-title">Certifications & Achievements</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Verified academic milestones and continuous learning accomplishments
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`glass-card p-6 rounded-3xl border ${item.border} flex flex-col h-full hover:shadow-xl transition-all relative overflow-hidden`}
                style={{ boxShadow: `0 10px 30px ${item.glow.replace('0.25', '0.05')}` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${item.color} shadow-sm`}>
                    <Icon size={24} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${item.badgeBg}`}>
                    {item.year}
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${item.color}`}>
                    {item.category}
                  </p>
                  <h3 className="text-xl font-bold font-display text-foreground mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="mt-auto space-y-3 border-t border-white/5 pt-5">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex gap-2 items-start">
                      <CheckCircle2 size={14} className={`${item.color} shrink-0 mt-0.5`} />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
