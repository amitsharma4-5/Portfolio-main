import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import http from 'http';
import https from 'https';

let cachedData: any = null;
let cacheTime = 0;
let cachedLcData: any = null;
let cacheLcTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const codolioProxyPlugin = () => ({
  name: 'codolio-proxy',
  configureServer(server: any) {
    server.middlewares.use('/api/leetcode', (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
      // The middleware mounts at /api/leetcode, so req.url could be '/', '/?refresh=true', or '?refresh=true'
      // We should intercept anything that comes here.
      
      const now = Date.now();
      const urlObj = new URL(req.url || '', `http://${req.headers.host}`);
      const forceRefresh = urlObj.searchParams.get('refresh') === 'true';

      if (!forceRefresh && cachedLcData && (now - cacheLcTime < CACHE_TTL_MS)) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Cache', 'HIT');
        return res.end(JSON.stringify({ success: true, payload: cachedLcData, cachedAt: cacheLcTime, lastUpdated: new Date(cacheLcTime).toISOString() }));
      }

      const query = `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
          userContestRanking(username: $username) {
            rating
            globalRanking
            topPercentage
          }
        }
      `;

      const postData = JSON.stringify({ query, variables: { username: 'amitsharma4_5' } });

      const options = {
        hostname: 'leetcode.com',
        port: 443,
        path: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://leetcode.com/'
        }
      };

      const lcReq = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          try {
            const json = JSON.parse(data);
            cachedLcData = json;
            cacheLcTime = Date.now();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Cache', 'MISS');
            res.end(JSON.stringify({ success: true, payload: json, cachedAt: cacheLcTime, lastUpdated: new Date(cacheLcTime).toISOString() }));
          } catch (e: any) {
            if (cachedLcData) {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('X-Cache', 'STALE');
              return res.end(JSON.stringify({ success: true, payload: cachedLcData, cachedAt: cacheLcTime, lastUpdated: new Date(cacheLcTime).toISOString(), warning: 'Served from stale cache due to parse error' }));
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Failed to parse JSON from LeetCode', details: e.message }));
          }
        });
      });

      lcReq.on('error', (e) => {
        if (cachedLcData) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('X-Cache', 'STALE');
          return res.end(JSON.stringify({ success: true, payload: cachedLcData, cachedAt: cacheLcTime, lastUpdated: new Date(cacheLcTime).toISOString(), warning: 'Served from stale cache due to network error' }));
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Network error connecting to LeetCode', details: e.message }));
      });

      lcReq.write(postData);
      lcReq.end();
    });

    server.middlewares.use('/api/codolio', (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
      const now = Date.now();
      const urlObj = new URL(req.url || '', `http://${req.headers.host}`);
      const forceRefresh = urlObj.searchParams.get('refresh') === 'true';

      if (!forceRefresh && cachedData && (now - cacheTime < CACHE_TTL_MS)) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Cache', 'HIT');
        return res.end(JSON.stringify({ success: true, payload: cachedData, cachedAt: cacheTime, lastUpdated: new Date(cacheTime).toISOString() }));
      }

      const fetchAPI = (url: string) => {
        https.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*'
          }
        }, (response) => {
          if ([301, 302, 307, 308].includes(response.statusCode as number)) {
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
              return fetchAPI(redirectUrl);
            }
          }

          let data = '';
          response.on('data', (chunk) => { data += chunk; });
          response.on('end', () => {
            try {
              const json = JSON.parse(data);
              cachedData = json;
              cacheTime = Date.now();
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('X-Cache', 'MISS');
              res.end(JSON.stringify({ success: true, payload: json, cachedAt: cacheTime, lastUpdated: new Date(cacheTime).toISOString() }));
            } catch (e: any) {
              if (cachedData) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('X-Cache', 'STALE');
                return res.end(JSON.stringify({ success: true, payload: cachedData, cachedAt: cacheTime, lastUpdated: new Date(cacheTime).toISOString(), warning: 'Served from stale cache due to parse error' }));
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Failed to parse JSON from Codolio', details: e.message }));
            }
          });
        }).on('error', (e) => {
          if (cachedData) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Cache', 'STALE');
            return res.end(JSON.stringify({ success: true, payload: cachedData, cachedAt: cacheTime, lastUpdated: new Date(cacheTime).toISOString(), warning: 'Served from stale cache due to network error' }));
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Network error connecting to Codolio', details: e.message }));
        });
      };

      fetchAPI('https://api.codolio.com/profile?userKey=amitsharma4_5');
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), codolioProxyPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
