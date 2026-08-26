export interface PlatformStats {
  totalSolved: number | null;
  rating: number | null;
  maxRating: number | null;
  easy?: number | null;
  medium?: number | null;
  hard?: number | null;
  stars?: number | string | null;
}

export interface PlatformBadge {
  name: string;
  displayName?: string;
  icon?: string;
  stars?: number;
}

export interface PlatformCertificate {
  name: string;
  type: string;
}

export interface PlatformData {
  platform: string;
  name: string;
  handle: string;
  profileUrl: string;
  color: string;
  glow: string;
  borderColor: string;
  stats: PlatformStats;
  badges: PlatformBadge[];
  certificates: PlatformCertificate[];
}

export interface HeatmapDay {
  date: string;
  count: number;
}

export interface GlobalStats {
  totalSubmissions: number;
  totalSolvedAggregated: number;
  totalActiveDays: number;
  maxStreak: number;
}

export interface CodingProfileResponse {
  success: boolean;
  platforms: PlatformData[];
  heatmapData: HeatmapDay[];
  globalStats: GlobalStats;
  lastUpdated: string | null;
  error?: string;
}

/**
 * Service to fetch and normalize coding platform statistics from external APIs.
 */
export const fetchCodingProfiles = async (forceRefresh = false): Promise<CodingProfileResponse> => {
  try {
    const codolioUrl = forceRefresh ? `/api/codolio?refresh=true&t=${Date.now()}` : `/api/codolio?t=${Date.now()}`;
    const leetcodeUrl = forceRefresh ? `/api/leetcode?refresh=true&t=${Date.now()}` : `/api/leetcode?t=${Date.now()}`;
    
    const [codolioRes, leetcodeRes] = await Promise.allSettled([
      fetch(codolioUrl),
      fetch(leetcodeUrl)
    ]);

    let codolioJson: any = null;
    let leetcodeJson: any = null;

    if (codolioRes.status === 'fulfilled' && codolioRes.value.ok) {
      codolioJson = await codolioRes.value.json().catch(() => null);
    }
    
    if (leetcodeRes.status === 'fulfilled' && leetcodeRes.value.ok) {
      leetcodeJson = await leetcodeRes.value.json().catch(() => null);
    }

    if (!codolioJson?.success && !leetcodeJson?.success) {
      throw new Error("Failed to fetch coding profiles from all sources");
    }

    const rawPlatforms = codolioJson?.payload?.data?.platformProfiles?.platformProfiles || [];
    const parsedPlatforms: PlatformData[] = [];
    const calendarMap: { [timestamp: string]: number } = {};
    let aggregatedSolved = 0;
    let totalSubs = 0;
    let maxStreak = 0;

    // Parse LeetCode directly from the dedicated proxy if available
    let leetcodeStats = null;
    if (leetcodeJson?.success && leetcodeJson?.payload?.data) {
      const matchedUser = leetcodeJson.payload.data.matchedUser;
      const ranking = leetcodeJson.payload.data.userContestRanking;
      
      if (matchedUser?.submitStats?.acSubmissionNum) {
        const stats = matchedUser.submitStats.acSubmissionNum;
        const total = stats.find((s: any) => s.difficulty === "All")?.count || 0;
        const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || 0;
        const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || 0;
        const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || 0;
        
        leetcodeStats = {
          totalSolved: total,
          easy,
          medium,
          hard,
          rating: ranking?.rating ? Math.round(ranking.rating) : null,
          maxRating: ranking?.rating ? Math.round(ranking.rating) : null,
          ranking: ranking?.globalRanking || null,
          topPercentage: ranking?.topPercentage || null
        };
      }
    }

    let leetcodePlatformFound = false;

    rawPlatforms.forEach((p: any) => {
      const platformName = p.platform;
      
      const streak = p.dailyActivityStatsResponse?.maxStreak;
      if (streak && streak > maxStreak) maxStreak = streak;

      const cal = p.dailyActivityStatsResponse?.submissionCalendar;
      if (cal) {
        Object.entries(cal).forEach(([ts, count]) => {
          calendarMap[ts] = (calendarMap[ts] || 0) + (count as number);
        });
      }

      if (platformName === "leetcode") {
        leetcodePlatformFound = true;
        // Use Codolio for heatmap/activity but LeetCode for stats!
        const totalQ = leetcodeStats?.totalSolved ?? (p.totalQuestionStats?.totalQuestionCounts ?? null);
        if (totalQ && typeof totalQ === "number") {
          aggregatedSolved += totalQ;
          totalSubs += totalQ;
        }

        parsedPlatforms.push({
          platform: "leetcode",
          name: "LeetCode",
          handle: p.userStats?.handle || "amitsharma4_5",
          profileUrl: "https://leetcode.com/u/amitsharma4_5/",
          color: "#FFA116",
          glow: "rgba(255,161,22,0.3)",
          borderColor: "border-amber-500/30",
          stats: {
            totalSolved: leetcodeStats?.totalSolved ?? (p.totalQuestionStats?.totalQuestionCounts ?? null),
            rating: leetcodeStats?.rating ?? (p.userStats?.currentRating ?? null),
            maxRating: leetcodeStats?.maxRating ?? (p.userStats?.maxRating ?? null),
            easy: leetcodeStats?.easy ?? (p.totalQuestionStats?.easyQuestionCounts ?? null),
            medium: leetcodeStats?.medium ?? (p.totalQuestionStats?.mediumQuestionCounts ?? null),
            hard: leetcodeStats?.hard ?? (p.totalQuestionStats?.hardQuestionCounts ?? null),
          },
          badges: (p.badgeStats?.badgeList || []).map((b: any) => ({
            name: b.name,
            displayName: b.displayName || b.shortName || b.name,
            icon: b.icon,
          })),
          certificates: [],
        });
      } else if (platformName === "codechef") {
        const totalQ = p.totalQuestionStats?.totalQuestionCounts ?? null;
        if (totalQ && typeof totalQ === "number") {
          aggregatedSolved += totalQ;
          totalSubs += totalQ;
        }
        
        parsedPlatforms.push({
          platform: "codechef",
          name: "CodeChef",
          handle: p.userStats?.handle || "amitsharma4_5",
          profileUrl: "https://www.codechef.com/users/amitsharma4_5",
          color: "#8B6F58",
          glow: "rgba(139,111,88,0.3)",
          borderColor: "border-amber-700/30",
          stats: {
            totalSolved: p.totalQuestionStats?.totalQuestionCounts ?? null,
            rating: p.userStats?.currentRating ?? null,
            maxRating: p.userStats?.maxRating ?? null,
            stars: p.userStats?.stars ? `${p.userStats.stars}★` : null,
          },
          badges: (p.badgeStats?.badgeList || []).map((b: any) => ({
            name: b.name,
            displayName: b.displayName || b.name,
            icon: b.icon,
          })),
          certificates: [],
        });
      } else if (platformName === "hackerrank") {
        const totalQ = p.totalQuestionStats?.totalQuestionCounts ?? null;
        if (totalQ && typeof totalQ === "number") {
          aggregatedSolved += totalQ;
          totalSubs += totalQ;
        }

        parsedPlatforms.push({
          platform: "hackerrank",
          name: "HackerRank",
          handle: p.userStats?.handle || "amitsharma4_5",
          profileUrl: "https://www.hackerrank.com/profile/amitsharma4_5",
          color: "#00EA64",
          glow: "rgba(0,234,100,0.3)",
          borderColor: "border-emerald-500/30",
          stats: {
            totalSolved: p.totalQuestionStats?.totalQuestionCounts ?? null,
            rating: null,
            maxRating: null,
            stars: null,
          },
          badges: (p.badgeStats?.badgeList || []).map((b: any) => ({
            name: b.name,
            displayName: `${b.name} (${b.stars ? b.stars + '★' : 'Badge'})`,
            stars: b.stars,
          })),
          certificates: (p.certificateStats?.certificates || []).map((c: any) => ({
            name: c.name,
            type: c.type || "Skill",
          })),
        });
      }
    });

    // If Codolio completely failed, but LeetCode worked, add LeetCode manually
    if (!leetcodePlatformFound && leetcodeStats) {
      aggregatedSolved += leetcodeStats.totalSolved;
      totalSubs += leetcodeStats.totalSolved;
      parsedPlatforms.push({
        platform: "leetcode",
        name: "LeetCode",
        handle: "amitsharma4_5",
        profileUrl: "https://leetcode.com/u/amitsharma4_5/",
        color: "#FFA116",
        glow: "rgba(255,161,22,0.3)",
        borderColor: "border-amber-500/30",
        stats: {
          totalSolved: leetcodeStats.totalSolved,
          rating: leetcodeStats.rating,
          maxRating: leetcodeStats.maxRating,
          easy: leetcodeStats.easy,
          medium: leetcodeStats.medium,
          hard: leetcodeStats.hard,
        },
        badges: [],
        certificates: [],
      });
    }

    parsedPlatforms.unshift({
      platform: "codolio",
      name: "Codolio (Aggregated)",
      handle: "amitsharma4_5",
      profileUrl: "https://codolio.com/profile/amitsharma4_5",
      color: "#8B5CF6",
      glow: "rgba(139,92,246,0.3)",
      borderColor: "border-primary/30",
      stats: {
        totalSolved: aggregatedSolved || 840,
        rating: null,
        maxRating: null,
      },
      badges: [],
      certificates: [],
    });

    const today = new Date();
    const full365: HeatmapDay[] = [];
    const calTimestampMap = new Map<string, number>();

    Object.entries(calendarMap).forEach(([ts, cnt]) => {
      const d = new Date(parseInt(ts) * 1000);
      const dateStr = d.toISOString().split("T")[0];
      calTimestampMap.set(dateStr, (calTimestampMap.get(dateStr) || 0) + cnt);
    });

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split("T")[0];
      full365.push({
        date: dStr,
        count: calTimestampMap.get(dStr) || 0,
      });
    }

    return {
      success: true,
      platforms: parsedPlatforms,
      heatmapData: full365,
      globalStats: {
        totalSubmissions: totalSubs || 845,
        totalSolvedAggregated: aggregatedSolved || 845,
        totalActiveDays: calTimestampMap.size || 68,
        maxStreak: maxStreak || 35,
      },
      lastUpdated: json.lastUpdated || json.cachedAt ? new Date(json.cachedAt).toISOString() : null,
    };
  } catch (err: any) {
    console.error("CodingProfileService error:", err);
    return {
      success: false,
      platforms: [],
      heatmapData: [],
      globalStats: {
        totalSubmissions: 0,
        totalSolvedAggregated: 0,
        totalActiveDays: 0,
        maxStreak: 0,
      },
      lastUpdated: null,
      error: err.message,
    };
  }
};
