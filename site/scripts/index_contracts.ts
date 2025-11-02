import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContractInfo {
  path: string;
  fileName: string;
  size: number;
  lines: number;
  preview: string;
  hasAccount: boolean;
  hasProgram: boolean;
  hasAnchorLang: boolean;
  hasEntrypoint: boolean;
}

function walkDirectory(dir: string, baseDir: string, results: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath, baseDir, results);
    } else if (file.endsWith('.rs')) {
      results.push(path.relative(baseDir, filePath));
    }
  }
  
  return results;
}

function analyzeContract(filePath: string): ContractInfo {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const lineCount = lines.length;
  
  // Get first ~120 lines as preview
  const previewLines = lines.slice(0, 120);
  const preview = previewLines.join('\n');
  
  // Check for Anchor patterns (best-effort regex)
  const hasAccount = /#\[account\]/.test(content);
  const hasProgram = /#\[program\]/.test(content);
  const hasAnchorLang = /anchor_lang/.test(content);
  const hasEntrypoint = /entrypoint!/.test(content);
  
  const stat = fs.statSync(filePath);
  
  return {
    path: filePath,
    fileName: path.basename(filePath),
    size: stat.size,
    lines: lineCount,
    preview,
    hasAccount,
    hasProgram,
    hasAnchorLang,
    hasEntrypoint,
  };
}

async function main() {
  const repoRoot = path.resolve(__dirname, '../..');
  const contractsDir = path.join(repoRoot, 'contracts');
  const outputDir = path.join(__dirname, '../public/explorer');
  const outputFile = path.join(outputDir, 'contracts.json');
  
  if (!fs.existsSync(contractsDir)) {
    console.error('Contracts directory not found');
    process.exit(1);
  }
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  const contractFiles = walkDirectory(contractsDir, repoRoot);
  console.log(`Found ${contractFiles.length} Rust contract files`);
  
  const contracts: ContractInfo[] = [];
  
  for (const relativePath of contractFiles) {
    const fullPath = path.join(repoRoot, relativePath);
    try {
      const info = analyzeContract(fullPath);
      info.path = relativePath; // Use relative path for display
      contracts.push(info);
      console.log(`Indexed: ${relativePath}`);
    } catch (error) {
      console.error(`Error analyzing ${relativePath}:`, error);
    }
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(contracts, null, 2));
  console.log(`\nWrote ${contracts.length} contracts to ${outputFile}`);
}

main().catch(console.error);
