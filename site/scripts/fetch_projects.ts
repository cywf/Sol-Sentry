import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'cywf/Sol-Sentry';

async function fetchProjects() {
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
    // Fetch open issues as fallback
    const issuesResponse = await fetch(`https://api.github.com/repos/${REPO}/issues?state=all&per_page=100`, { headers });
    const issues = await issuesResponse.json();

    // Group issues by status labels
    const lanes: Record<string, any[]> = {
      todo: [],
      doing: [],
      done: [],
    };

    for (const issue of issues) {
      if (issue.pull_request) continue; // Skip pull requests

      const labels = issue.labels.map((l: any) => l.name.toLowerCase());
      const issueData = {
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        labels: issue.labels.map((l: any) => l.name),
        state: issue.state,
      };

      // Categorize by labels
      if (labels.includes('status:todo') || (issue.state === 'open' && !labels.some((l: string) => l.startsWith('status:')))) {
        lanes.todo.push(issueData);
      } else if (labels.includes('status:doing') || labels.includes('in progress')) {
        lanes.doing.push(issueData);
      } else if (labels.includes('status:done') || issue.state === 'closed') {
        lanes.done.push(issueData);
      } else {
        lanes.todo.push(issueData);
      }
    }

    const projectData = { lanes };

    const outputDir = path.join(__dirname, '../public/data');
    fs.mkdirSync(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'projects.json');
    fs.writeFileSync(outputFile, JSON.stringify(projectData, null, 2));
    
    console.log(`Successfully organized ${issues.length} issues into project board`);
    console.log(`Todo: ${lanes.todo.length}, Doing: ${lanes.doing.length}, Done: ${lanes.done.length}`);
  } catch (error) {
    console.error('Error fetching project data:', error);
    // Write empty lanes on error
    const outputDir = path.join(__dirname, '../public/data');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'projects.json'), JSON.stringify({ lanes: { todo: [], doing: [], done: [] } }, null, 2));
  }
}

fetchProjects();
