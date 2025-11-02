import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'cywf/Sol-Sentry';

async function fetchRepoData() {
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN not found in environment');
    process.exit(1);
  }

  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // Fetch repo basic info
    const repoResponse = await fetch(`https://api.github.com/repos/${REPO}`, { headers });
    const repoData = await repoResponse.json();

    // Fetch languages
    const langsResponse = await fetch(`https://api.github.com/repos/${REPO}/languages`, { headers });
    const langsData = await langsResponse.json();

    // Fetch commit activity (last 12 weeks)
    const statsResponse = await fetch(`https://api.github.com/repos/${REPO}/stats/participation`, { headers });
    const statsData = await statsResponse.json();

    const stats = {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      watchers: repoData.watchers_count || 0,
      openIssues: repoData.open_issues_count || 0,
      languages: langsData || {},
      commitActivity: statsData.all
        ? statsData.all.slice(-12).map((commits: number, idx: number) => ({
            week: `Week ${idx + 1}`,
            commits,
          }))
        : [],
    };

    const outputDir = path.join(__dirname, '../public/data');
    fs.mkdirSync(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'stats.json');
    fs.writeFileSync(outputFile, JSON.stringify(stats, null, 2));
    
    console.log('Successfully fetched repository statistics');
    console.log(`Stars: ${stats.stars}, Forks: ${stats.forks}`);
  } catch (error) {
    console.error('Error fetching repository data:', error);
    process.exit(1);
  }
}

fetchRepoData();
