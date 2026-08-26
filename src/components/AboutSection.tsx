import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Code2, Cpu, Globe, Server, Database, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { useCodingProfiles } from "@/hooks/useCodingProfiles";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { data } = useCodingProfiles();
  const leetcodeData = data?.platforms.find(p => p.platform === "leetcode");
  const lcSolved = leetcodeData?.stats?.totalSolved || "800+";

  const corePillars = [
    {
      icon: <Server size={18} className="text-primary" />,
      title: "Backend & REST APIs",
      description: "Building scalable services with Node.js, Express, Flask, and secure SQL/NoSQL architectures.",
    },
    {
      icon: <Globe size={18} className="text-secondary" />,
      title: "Machine Learning & AI",
      description: "Multi-class classification, feature engineering, OpenCV vision pipelines, and NLP systems.",
    },
    {
      icon: <Cpu size={18} className="text-blue-400" />,
      title: "IoT & Embedded Edge",
      description: "Deploying low-latency intelligence on edge hardware like Raspberry Pi with sensor telemetry.",
    },
    {
      icon: <Code2 size={18} className="text-emerald-400" />,
      title: "Data Structures & Algorithms",
      description: `Consistent problem solver with ${lcSolved} problems solved on LeetCode.`,
    },
  ];

  const statItems = [
    {
      icon: <GraduationCap size={22} />,
      label: "Cumulative CGPA",
      value: "8.67",
      subtext: "Parul University",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      icon: <Award size={22} />,
      label: "National Qualification",
      value: "GATE 2026",
      subtext: "CS / IT Paper",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20",
    },
    {
      icon: <Code2 size={22} />,
      label: "LeetCode Solved",
      value: `${lcSolved}`,
      subtext: "Live Verified",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Vadodara",
      subtext: "Gujarat, India",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Sparkles size={13} />
            <span>Profile Overview</span>
          </div>
          <h2 className="section-title">About Me</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technical background, core engineering principles, and academic focus
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl border border-primary/20 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              
              <div className="space-y-5 relative z-10">
                <h3 className="text-2xl font-bold font-display text-foreground">
                  Architecting Reliable Systems & Intelligence
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  I am a Computer Science undergraduate at <strong className="text-primary font-semibold">Parul University</strong> (2023-2027) with a strong academic foundation (CGPA <strong className="text-primary font-semibold">8.67</strong>) and a national qualification in <strong className="text-orange-400 font-semibold">GATE 2026 (CS/IT)</strong>. My focus bridges the gap between theoretical computer science and practical, scalable engineering.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  With a steady habit of competitive programming ({lcSolved} LeetCode problems solved across arrays, trees, graphs, dynamic programming, and recursion), I approach software engineering with algorithmic rigor, clean code habits, and systematic problem solving.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Engineering Pillars</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {corePillars.map((pillar, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                      <div className="p-2 rounded-xl bg-white/5">
                        {pillar.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-foreground mb-1">{pillar.title}</h5>
                        <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {statItems.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-5 rounded-3xl border glass-card hover:shadow-lg transition-all ${stat.border}`}
              >
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs font-semibold mt-1 ${stat.color}`}>{stat.subtext}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
