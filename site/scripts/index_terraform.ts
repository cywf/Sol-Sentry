import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TerraformVariable {
  name: string;
  type?: string;
  description?: string;
  default?: any;
}

interface TerraformModule {
  path: string;
  name: string;
  files: string[];
  variables: TerraformVariable[];
}

function walkDirectory(dir: string, baseDir: string, results: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDirectory(filePath, baseDir, results);
      } else if (file.endsWith('.tf') || file.endsWith('.tfvars')) {
        results.push(path.relative(baseDir, filePath));
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return results;
}

function parseVariables(content: string): TerraformVariable[] {
  const variables: TerraformVariable[] = [];
  
  // Best-effort parsing of variable blocks
  const variableRegex = /variable\s+"([^"]+)"\s*{([^}]*)}/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const varName = match[1];
    const varBlock = match[2];
    
    // Extract type
    const typeMatch = /type\s*=\s*([^\n]+)/.exec(varBlock);
    const type = typeMatch ? typeMatch[1].trim() : undefined;
    
    // Extract description
    const descMatch = /description\s*=\s*"([^"]+)"/.exec(varBlock);
    const description = descMatch ? descMatch[1] : undefined;
    
    // Extract default
    const defaultMatch = /default\s*=\s*([^\n]+)/.exec(varBlock);
    let defaultValue: any = undefined;
    if (defaultMatch) {
      const defaultStr = defaultMatch[1].trim();
      if (defaultStr === 'true' || defaultStr === 'false') {
        defaultValue = defaultStr === 'true';
      } else if (defaultStr.startsWith('"') && defaultStr.endsWith('"')) {
        defaultValue = defaultStr.slice(1, -1);
      } else {
        defaultValue = defaultStr;
      }
    }
    
    variables.push({
      name: varName,
      type,
      description,
      default: defaultValue,
    });
  }
  
  return variables;
}

function analyzeTerraformModule(files: string[], repoRoot: string): TerraformModule[] {
  const moduleMap = new Map<string, { files: string[]; variables: TerraformVariable[] }>();
  
  for (const file of files) {
    const modulePath = path.dirname(file);
    
    if (!moduleMap.has(modulePath)) {
      moduleMap.set(modulePath, { files: [], variables: [] });
    }
    
    const module = moduleMap.get(modulePath)!;
    module.files.push(path.basename(file));
    
    // Parse variables from variables.tf
    if (path.basename(file) === 'variables.tf') {
      const fullPath = path.join(repoRoot, file);
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const variables = parseVariables(content);
        module.variables.push(...variables);
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
      }
    }
  }
  
  const modules: TerraformModule[] = [];
  for (const [modulePath, data] of moduleMap.entries()) {
    modules.push({
      path: modulePath,
      name: path.basename(modulePath) || 'root',
      files: data.files,
      variables: data.variables,
    });
  }
  
  return modules;
}

async function main() {
  const repoRoot = path.resolve(__dirname, '../..');
  const terraformDir = path.join(repoRoot, 'terraform');
  const outputDir = path.join(__dirname, '../public/explorer');
  const outputFile = path.join(outputDir, 'terraform.json');
  
  if (!fs.existsSync(terraformDir)) {
    console.error('Terraform directory not found');
    process.exit(1);
  }
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  const terraformFiles = walkDirectory(terraformDir, repoRoot);
  console.log(`Found ${terraformFiles.length} Terraform files`);
  
  const modules = analyzeTerraformModule(terraformFiles, repoRoot);
  
  for (const module of modules) {
    console.log(`Indexed module: ${module.path} (${module.variables.length} variables)`);
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(modules, null, 2));
  console.log(`\nWrote ${modules.length} modules to ${outputFile}`);
}

main().catch(console.error);
