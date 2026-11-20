export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
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

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://leetcode.com/'
      },
      body: JSON.stringify({
        query,
        variables: { username: 'amitsharma4_5' }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ success: false, error: 'LeetCode API failed', details: text });
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ success: true, payload: data, lastUpdated: new Date().toISOString() });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
