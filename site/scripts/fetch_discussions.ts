import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'cywf/Sol-Sentry';

async function fetchDiscussions() {
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN not found in environment');
    process.exit(1);
  }

  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  };

  // GraphQL query to fetch discussions
  const query = `
    query {
      repository(owner: "cywf", name: "Sol-Sentry") {
        discussions(first: 25, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            id
            title
            url
            author {
              login
            }
            createdAt
            category {
              name
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      // Write empty array if discussions aren't available
      const discussions: any[] = [];
      const outputDir = path.join(__dirname, '../public/data');
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, 'discussions.json'), JSON.stringify(discussions, null, 2));
      return;
    }

    const discussions = data.data?.repository?.discussions?.nodes?.map((d: any) => ({
      id: d.id,
      title: d.title,
      url: d.url,
      author: d.author?.login || 'unknown',
      createdAt: d.createdAt,
      category: d.category?.name || 'General',
      comments: d.comments?.totalCount || 0,
    })) || [];

    const outputDir = path.join(__dirname, '../public/data');
    fs.mkdirSync(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'discussions.json');
    fs.writeFileSync(outputFile, JSON.stringify(discussions, null, 2));
    
    console.log(`Successfully fetched ${discussions.length} discussions`);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    // Write empty array on error
    const outputDir = path.join(__dirname, '../public/data');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'discussions.json'), JSON.stringify([], null, 2));
  }
}

fetchDiscussions();
