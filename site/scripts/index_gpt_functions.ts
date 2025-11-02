import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GPTFunctionSpec {
  fileName: string;
  path: string;
  name: string;
  description: string;
  parameters: {
    [key: string]: {
      type: string;
      description?: string;
      enum?: string[];
    };
  };
  required: string[];
  hasExample?: boolean;
}

function walkDirectory(dir: string, baseDir: string, results: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath, baseDir, results);
    } else if (file.endsWith('.json')) {
      results.push(path.relative(baseDir, filePath));
    }
  }
  
  return results;
}

function analyzeGPTFunction(filePath: string): GPTFunctionSpec | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    const parameters: { [key: string]: any } = {};
    
    // Summarize parameters
    if (data.parameters) {
      for (const [key, value] of Object.entries(data.parameters)) {
        if (typeof value === 'object' && value !== null) {
          const param = value as any;
          parameters[key] = {
            type: param.type || 'unknown',
            description: param.description,
            enum: param.enum,
          };
        }
      }
    }
    
    return {
      fileName: path.basename(filePath),
      path: filePath,
      name: data.name || path.basename(filePath, '.json'),
      description: data.description || 'No description available',
      parameters,
      required: data.required || [],
      hasExample: !!data.example || !!data.examples,
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

async function main() {
  const repoRoot = path.resolve(__dirname, '../..');
  const gptFunctionsDir = path.join(repoRoot, 'gpt-functions');
  const outputDir = path.join(__dirname, '../public/explorer');
  const outputFile = path.join(outputDir, 'gpt_functions.json');
  
  if (!fs.existsSync(gptFunctionsDir)) {
    console.error('GPT functions directory not found');
    process.exit(1);
  }
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  const functionFiles = walkDirectory(gptFunctionsDir, repoRoot);
  console.log(`Found ${functionFiles.length} GPT function files`);
  
  const functions: GPTFunctionSpec[] = [];
  
  for (const relativePath of functionFiles) {
    const fullPath = path.join(repoRoot, relativePath);
    const spec = analyzeGPTFunction(fullPath);
    if (spec) {
      spec.path = relativePath; // Use relative path for display
      functions.push(spec);
      console.log(`Indexed: ${relativePath}`);
    }
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(functions, null, 2));
  console.log(`\nWrote ${functions.length} GPT functions to ${outputFile}`);
}

main().catch(console.error);
