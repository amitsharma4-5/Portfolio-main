import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Activity,
  Award,
  ExternalLink,
  RefreshCw,
  Star,
  Trophy,
  Flame,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Shield,
  Medal,
  Terminal,
} from "lucide-react";
import { useCodingProfiles } from "@/hooks/useCodingProfiles";
import { HeatmapDay, PlatformData } from "@/services/codingProfileService";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-white/[0.03] border border-white/[0.05]";
  if (count <= 2) return "bg-violet-500/30 border border-violet-500/20";
  if (count <= 5) return "bg-violet-500/55 border border-violet-500/30";
  if (count <= 8) return "bg-violet-400/80 border border-violet-400/40 shadow-[0_0_6px_rgba(139,92,246,0.4)]";
  return "bg-violet-400 border border-violet-300/50 shadow-[0_0_10px_rgba(139,92,246,0.6)]";
};

const CodingProfilesDashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data, isLoading, isLive, errorMessage, lastSyncTime, refresh } = useCodingProfiles();
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);

  const platforms = data?.platforms || [];
  const heatmapData = data?.heatmapData || [];
  const globalStats = data?.globalStats || {
    totalSubmissions: 0,
    totalSolvedAggregated: 0,
    totalActiveDays: 0,
    maxStreak: 0,
  };

  // Format weeks for heatmap
  const weeks: HeatmapDay[][] = [];
  const monthLabels: { month: string; weekIndex: number }[] = [];
  let currentMonth = -1;

  if (heatmapData.length > 0) {
    const firstDay = new Date(heatmapData[0].date).getDay();
    const padded: HeatmapDay[] = [];
    for (let i = 0; i < firstDay; i++) {
      padded.push({ date: "", count: -1 });
    }
    const allDays = [...padded, ...heatmapData];

    for (let i = 0; i < allDays.length; i += 7) {
      const week = allDays.slice(i, i + 7);
      weeks.push(week);
      const firstValid = week.find((d) => d.date !== "");
      if (firstValid) {
        const m = new Date(firstValid.date).getMonth();
        if (m !== currentMonth) {
          currentMonth = m;
          monthLabels.push({ month: MONTHS[m], weekIndex: weeks.length - 1 });
        }
      }
    }
  }

  const handleCellHover = (e: React.MouseEvent, day: HeatmapDay) => {
    if (day.count < 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      date: day.date,
      count: day.count,
    });
  };

  return (
    <section id="coding-profiles" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Activity size={13} />
            <span>Competitive Programming & Problem Solving</span>
          </div>
          <h2 className="section-title">Coding Profiles & Live Activity</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live public data synchronized from LeetCode, CodeChef, HackerRank, and Codolio profiles
          </p>

          {/* Sync & Live Status Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
              <div className="relative">
                <div className={`w-2.5 h-2.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-yellow-400"}`} />
                {isLive && <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />}
              </div>
              <span className="font-medium text-foreground">
                {isLive ? "Live Public Data" : "Baseline Verified Data"}
              </span>
              {lastSyncTime && (
                <span className="text-muted-foreground">· Synced at {lastSyncTime}</span>
              )}
            </div>

            <button
              onClick={() => refresh()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-xs font-semibold transition-all disabled:opacity-50"
              title="Force Refresh Live Data"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              <span>{isLoading ? "Syncing..." : "Sync Live Data"}</span>
            </button>
          </div>
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {isLoading && platforms.length === 0 ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border border-white/10 h-64 animate-pulse" />
            ))
          ) : (
            platforms.map((p, idx) => (
              <motion.div
                key={p.platform}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className={`glass-card p-6 rounded-3xl border ${p.borderColor} flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all relative overflow-hidden`}
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.color }} />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">@{p.handle}</p>
                    </div>
                    <a
                      href={p.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-foreground/80 hover:text-primary transition-colors"
                      title={`Visit ${p.name} Profile`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Primary Stats */}
                  <div className="space-y-3 pt-2">
                    {p.stats.totalSolved !== null && (
                      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                        <div className="text-2xl font-extrabold text-foreground" style={{ color: p.color }}>
                          {p.stats.totalSolved}
                        </div>
                        <div className="text-[11px] font-medium text-muted-foreground mt-0.5">
                          Problems Solved
                        </div>
                      </div>
                    )}

                    {p.stats.rating && (
                      <div className="flex items-center justify-between text-xs px-2 py-1 bg-white/[0.02] rounded-xl">
                        <span className="text-muted-foreground">Contest Rating</span>
                        <span className="font-bold text-yellow-400">{p.stats.rating}</span>
                      </div>
                    )}

                    {/* LeetCode Difficulty Distribution */}
                    {p.platform === "leetcode" && p.stats.easy !== undefined && (
                      <div className="grid grid-cols-3 gap-1.5 pt-1 text-center text-[10px]">
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                          <div>{p.stats.easy}</div>
                          <div className="text-[9px] font-normal text-muted-foreground">Easy</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                          <div>{p.stats.medium}</div>
                          <div className="text-[9px] font-normal text-muted-foreground">Med</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-bold">
                          <div>{p.stats.hard}</div>
                          <div className="text-[9px] font-normal text-muted-foreground">Hard</div>
                        </div>
                      </div>
                    )}

                    {/* Badges & Certifications Count */}
                    {(p.badges.length > 0 || p.certificates.length > 0) && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {p.badges.slice(0, 2).map((b, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-muted-foreground truncate max-w-full"
                          >
                            🏅 {b.displayName || b.name}
                          </span>
                        ))}
                        {p.certificates.slice(0, 2).map((c, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-muted-foreground truncate max-w-full"
                          >
                            📜 {c.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link */}
                <a
                  href={p.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-xs font-semibold inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: p.color }}
                >
                  <span>View Full Profile</span>
                  <ExternalLink size={11} />
                </a>
              </motion.div>
            ))
          )}
        </div>

        {/* 365-Day Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative glass-card rounded-3xl p-6 md:p-8 border border-primary/20 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Flame size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">365-Day Submission Calendar</h3>
                <p className="text-xs text-muted-foreground">Aggregated daily problem-solving consistency across platforms</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-white/[0.03] border border-white/[0.05]" />
                <div className="w-3 h-3 rounded-sm bg-violet-500/30 border border-violet-500/20" />
                <div className="w-3 h-3 rounded-sm bg-violet-500/55 border border-violet-500/30" />
                <div className="w-3 h-3 rounded-sm bg-violet-400/80 border border-violet-400/40" />
                <div className="w-3 h-3 rounded-sm bg-violet-400 border border-violet-300/50 shadow-[0_0_6px_rgba(139,92,246,0.4)]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Heatmap Grid Container */}
          {isLoading && heatmapData.length === 0 ? (
            <div className="py-16 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <div className="inline-block min-w-max">
                {/* Month labels */}
                <div className="flex ml-8 mb-1.5">
                  {monthLabels.map((label, idx) => {
                    const prevWeekIdx = idx > 0 ? monthLabels[idx - 1].weekIndex : 0;
                    const gap = idx === 0 ? label.weekIndex : label.weekIndex - prevWeekIdx;
                    return (
                      <div
                        key={`${label.month}-${idx}`}
                        className="text-[10px] text-muted-foreground/70"
                        style={{ width: `${gap * 14}px` }}
                      >
                        {label.month}
                      </div>
                    );
                  })}
                </div>

                {/* Day rows */}
                <div className="flex gap-0">
                  <div className="flex flex-col gap-[2px] pr-1.5 pt-0">
                    {DAY_LABELS.map((label, i) => (
                      <div key={i} className="h-[11px] flex items-center">
                        <span className="text-[9px] text-muted-foreground/60 w-6 text-right">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-[2px]">
                    {weeks.map((week, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-[2px]">
                        {week.map((day, rowIndex) => (
                          <div
                            key={`${colIndex}-${rowIndex}`}
                            className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-150 ${
                              day.count < 0
                                ? "bg-transparent"
                                : `${getIntensityClass(day.count)} hover:scale-[1.6] hover:z-20 cursor-pointer`
                            }`}
                            onMouseEnter={(e) => day.count >= 0 && handleCellHover(e, day)}
                            onMouseLeave={() => setTooltip(null)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[100] pointer-events-none px-3 py-2 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/15 shadow-2xl text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-bold text-foreground">
            {tooltip.count} submission{tooltip.count !== 1 ? "s" : ""}
          </div>
          <div className="text-muted-foreground text-[11px]">
            {new Date(tooltip.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CodingProfilesDashboard;
