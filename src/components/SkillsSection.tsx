import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface SkillItem {
  name: string;
  category: "Languages" | "Frameworks" | "Databases" | "Tools" | "DSA Platforms" | "AI/ML";
  icon: string;
  color?: string;
}

// Row 1 Skills
const row1Skills: SkillItem[] = [
  {
    name: "JavaScript",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=js",
    color: "#F7DF1E",
  },
  {
    name: "SQL",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=mysql",
    color: "#00758F",
  },
  {
    name: "Node.js",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=nodejs",
    color: "#339933",
  },
  {
    name: "Express.js",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=express",
    color: "#FFFFFF",
  },
  {
    name: "Flask",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=flask",
    color: "#FFFFFF",
  },
  {
    name: "HTML5",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=html",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    category: "Frameworks",
    icon: "https://skillicons.dev/icons?i=css",
    color: "#1572B6",
  },
  {
    name: "MySQL",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=mysql",
    color: "#4479A1",
  },
  {
    name: "MongoDB",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=mongodb",
    color: "#47A248",
  },
  {
    name: "SQLite",
    category: "Databases",
    icon: "https://skillicons.dev/icons?i=sqlite",
    color: "#003B57",
  },
  {
    name: "Git",
    category: "Tools",
    icon: "https://skillicons.dev/icons?i=git",
    color: "#F05032",
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: "https://skillicons.dev/icons?i=github",
    color: "#FFFFFF",
  },
];

// Row 2 Skills
const row2Skills: SkillItem[] = [
  {
    name: "Python",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=python",
    color: "#3776AB",
  },
  {
    name: "Java",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=java",
    color: "#ED8B00",
  },
  {
    name: "C",
    category: "Languages",
    icon: "https://skillicons.dev/icons?i=c",
    color: "#A8B9CC",
  },
  {
    name: "Jupyter",
    category: "Tools",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    color: "#F37626",
  },
  {
    name: "Google Colab",
    category: "Tools",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
    color: "#F9AB00",
  },
  {
    name: "Raspberry Pi",
    category: "Tools",
    icon: "https://skillicons.dev/icons?i=raspberrypi",
    color: "#C51A4A",
  },
  {
    name: "Docker",
    category: "Tools",
    icon: "https://skillicons.dev/icons?i=docker",
    color: "#2496ED",
  },
  {
    name: "Linux",
    category: "Tools",
    icon: "https://skillicons.dev/icons?i=linux",
    color: "#FCC624",
  },
  {
    name: "VS Code",
    category: "Tools",
    icon: "https://skillicons.dev/icons?i=vscode",
    color: "#007ACC",
  },
  {
    name: "LeetCode",
    category: "DSA Platforms",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
    color: "#FFA116",
  },
  {
    name: "GeeksforGeeks",
    category: "DSA Platforms",
    icon: "https://cdn.simpleicons.org/geeksforgeeks/2F8D46",
    color: "#2F8D46",
  },
  {
    name: "CodeChef",
    category: "DSA Platforms",
    icon: "https://cdn.simpleicons.org/codechef/E3A064",
    color: "#E3A064",
  },
  {
    name: "HackerRank",
    category: "DSA Platforms",
    icon: "https://cdn.simpleicons.org/hackerrank/00EA64",
    color: "#00EA64",
  },
  {
    name: "NumPy",
    category: "AI/ML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
    color: "#013243",
  },
  {
    name: "Pandas",
    category: "AI/ML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    color: "#150458",
  },
  {
    name: "Matplotlib",
    category: "AI/ML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
    color: "#11557c",
  },
  {
    name: "OpenCV",
    category: "AI/ML",
    icon: "https://skillicons.dev/icons?i=opencv",
    color: "#5C3EE8",
  },
  {
    name: "scikit-learn",
    category: "AI/ML",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    color: "#F7931E",
  },
  {
    name: "TensorFlow",
    category: "AI/ML",
    icon: "https://skillicons.dev/icons?i=tensorflow",
    color: "#FF6F00",
  },
  {
    name: "Keras",
    category: "AI/ML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
    color: "#D00000",
  },
];

const allSkills: SkillItem[] = [...row1Skills, ...row2Skills];

const SkillCard = ({ skill }: { skill: SkillItem }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -6,
        boxShadow: "0 12px 30px rgba(139, 92, 246, 0.4)",
        borderColor: "rgba(139, 92, 246, 0.6)",
      }}
      transition={{ duration: 0.25 }}
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2.5 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl cursor-pointer relative overflow-hidden mx-2.5 p-3 transition-all bg-card/70 backdrop-blur-xl border border-white/10 group"
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Background Hover Radial Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(circle at center, rgba(139,92,246,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Top Accent highlight on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon Container */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
        {!imgError ? (
          <img
            src={skill.icon}
            alt={skill.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:brightness-110 transition-all"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full rounded-xl flex items-center justify-center font-bold text-xs text-white"
            style={{ backgroundColor: skill.color || "#8B5CF6" }}
          >
            {skill.name.substring(0, 3).toUpperCase()}
          </div>
        )}
      </div>

      {/* Label Text */}
      <span className="text-xs sm:text-[13px] font-medium text-foreground/90 text-center relative z-10 group-hover:text-white transition-colors truncate max-w-full tracking-wide">
        {skill.name}
      </span>
    </motion.div>
  );
};

// Continuous Infinite Scrolling Row
const MarqueeRow = ({
  skills,
  direction = "left",
  speed = 35,
}: {
  skills: SkillItem[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const tripled = [...skills, ...skills, ...skills];

  return (
    <div className="overflow-hidden relative w-full py-1">
      {/* Left Gradient Fade Mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to right, hsl(var(--background)), transparent)",
        }}
      />
      {/* Right Gradient Fade Mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to left, hsl(var(--background)), transparent)",
        }}
      />

      <motion.div
        className="flex w-max"
        animate={{
          x: direction === "left" ? ["0%", `-${100 / 3}%`] : [`-${100 / 3}%`, "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {tripled.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const categories = [
  "All",
  "Languages",
  "Frameworks",
  "Databases",
  "Tools",
  "DSA Platforms",
  "AI/ML",
] as const;

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="pt-28 pb-20 relative overflow-hidden" ref={ref}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-foreground mb-3">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-14 max-w-4xl mx-auto"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-105"
                    : "glass-card border border-white/10 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Display */}
        {activeCategory === "All" ? (
          /* Two Opposite-Direction Infinite Marquee Rows */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Row 1 moving left */}
            <MarqueeRow skills={row1Skills} direction="left" speed={28} />
            {/* Row 2 moving right */}
            <MarqueeRow skills={row2Skills} direction="right" speed={32} />
          </motion.div>
        ) : (
          /* Filtered Category Grid */
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-5xl mx-auto py-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
