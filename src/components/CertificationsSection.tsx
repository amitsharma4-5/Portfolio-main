import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Calendar, Building, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  topics: string[];
  gradient: string;
  border: string;
  badgeBg: string;
  badgeColor: string;
  glow: string;
}

const certifications: CertificationItem[] = [
  {
    title: "ServiceNow Certified System Administrator (CSA)",
    issuer: "ServiceNow",
    date: "2025",
    description:
      "Globally recognized enterprise credential validating end-to-end expertise in ServiceNow platform administration, workflow automations, ITSM lifecycle, and system configuration.",
    topics: ["Platform Administration", "ITSM Workflows", "Service Catalog", "System Configuration", "Data Policies"],
    gradient: "from-blue-500/15 via-indigo-900/10 to-transparent",
    border: "border-blue-500/30",
    badgeBg: "bg-blue-500/15",
    badgeColor: "text-blue-400",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    title: "Computer Networks and Internet Protocol",
    issuer: "NPTEL",
    date: "May 2025",
    credentialId: "NPTEL25CS15S1259700178",
    description:
      "Comprehensive certification covering the TCP/IP architectural model, IP addressing & subnetting, routing protocols (OSPF/BGP), congestion control, and transport layer mechanics.",
    topics: ["TCP/IP Model", "IP Routing & Subnetting", "Flow & Congestion Control", "Network Security", "Application Protocols"],
    gradient: "from-emerald-500/15 via-teal-900/10 to-transparent",
    border: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/15",
    badgeColor: "text-emerald-400",
    glow: "rgba(16,185,129,0.25)",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Sparkles size={13} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">Professional Certifications</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Industry and academic certifications strictly documented on resume
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className={`glass-card rounded-3xl p-7 md:p-8 border ${cert.border} flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all`}
              style={{ boxShadow: `0 10px 30px ${cert.glow}` }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-400 to-secondary" />

              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-xl text-xs font-bold ${cert.badgeBg} ${cert.badgeColor} border border-white/10 flex items-center gap-1.5`}>
                    <ShieldCheck size={14} />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={13} />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground leading-snug mb-3">
                  {cert.title}
                </h3>

                {/* Credential ID if present */}
                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-muted-foreground bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06] mb-3 w-fit">
                    ID: {cert.credentialId}
                  </div>
                )}

                {/* Description */}
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-5">
                  {cert.description}
                </p>

                {/* Key Knowledge Areas */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    Core Domains:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[11px] font-medium text-foreground/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Badge Stamp */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  <span>Verified Credential</span>
                </span>
                <span className="text-muted-foreground/60 text-[11px]">
                  Resume Source of Truth
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
