import React, { useEffect, useState } from 'react';

interface DocSection {
  title: string;
  content: string;
  level: number;
}

const Documentation: React.FC = () => {
  const [sections, setSections] = useState<DocSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    loadDocumentation();
  }, []);

  const loadDocumentation = async () => {
    try {
      setLoading(true);
      
      // For now, we'll display a simple version
      // In the actual implementation, this would parse markdown files
      const docs: DocSection[] = [
        {
          title: 'Sol-Sentry',
          content: `Welcome to Sol-Sentry, an innovative AI tool designed for enhancing the security and efficiency of Solana smart contract development. Utilizing advanced AI analysis through GPT-4, Sol-Sentry offers in-depth analysis, predictive threat modeling, and best practice recommendations to fortify blockchain projects.`,
          level: 1,
        },
        {
          title: 'Installation',
          content: `To start using Sol-Sentry, clone the repository and set up your environment:

\`\`\`bash
git clone https://github.com/cywf/Sol-Sentry.git
cd Sol-Sentry
\`\`\`

Follow the setup instructions specific to your system.`,
          level: 2,
        },
        {
          title: 'Usage',
          content: `Sol-Sentry offers various interfaces for users to analyze their Solana smart contracts, providing flexibility and accessibility.`,
          level: 2,
        },
        {
          title: 'Streamlit Interface',
          content: `The Streamlit interface provides a user-friendly web application to interact with Sol-Sentry. To use it:

1. Navigate to the Sol-Sentry directory
2. Run the Streamlit app: \`streamlit run scripts/app.py\`
3. Follow the on-screen instructions to upload or paste your smart contract code for analysis`,
          level: 3,
        },
        {
          title: 'CLI Tool',
          content: `Sol-Sentry can also be used via a command-line interface. To analyze your smart contracts:

\`\`\`bash
sol-sentry analyze <path-to-your-contract>
\`\`\`

Replace \`<path-to-your-contract>\` with the path to the Solana program file you wish to analyze.`,
          level: 3,
        },
        {
          title: 'Continuous Integration',
          content: `Integrate Sol-Sentry into your CI/CD pipeline for automated code analysis. Example with GitHub Actions:

\`\`\`yaml
name: Solana Smart Contract CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Install Sol-Sentry
      run: |
        # Add installation commands here
    - name: Analyze Smart Contracts
      run: sol-sentry analyze src/program.rs
\`\`\`

Note: The CI automation does not expose secrets client-side. All sensitive operations occur server-side during the build process.`,
          level: 2,
        },
        {
          title: 'Contributing',
          content: `Contributions are welcome! If you have suggestions or want to add new features, please open an issue or submit a pull request. See our CONTRIBUTING.md for guidelines.`,
          level: 2,
        },
        {
          title: 'License',
          content: `Sol-Sentry is released under the MIT License.`,
          level: 2,
        },
      ];

      setSections(docs);
    } catch (err) {
      console.error('Error loading documentation:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    );
  }

  const toc = sections.filter((s) => s.level <= 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Table of Contents */}
      <div className="lg:col-span-1">
        <div className="card bg-base-200 shadow-xl sticky top-24">
          <div className="card-body">
            <h3 className="card-title text-sm">Table of Contents</h3>
            <ul className="menu menu-compact">
              {toc.map((section, idx) => (
                <li key={idx}>
                  <a
                    href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`text-sm ${section.level === 2 ? 'pl-4' : ''}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="lg:col-span-3">
        <div className="prose prose-invert max-w-none">
          {sections.map((section, idx) => (
            <div
              key={idx}
              id={section.title.toLowerCase().replace(/\s+/g, '-')}
              className="mb-8"
            >
              {section.level === 1 && (
                <h1 className="text-4xl font-bold mb-4">{section.title}</h1>
              )}
              {section.level === 2 && (
                <h2 className="text-3xl font-bold mb-3 mt-8">{section.title}</h2>
              )}
              {section.level === 3 && (
                <h3 className="text-2xl font-bold mb-2 mt-6">{section.title}</h3>
              )}
              <div className="whitespace-pre-wrap opacity-90">{section.content}</div>
            </div>
          ))}
        </div>

        {/* Additional Links */}
        <div className="mt-12 card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Additional Resources</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/cywf/Sol-Sentry"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                GitHub Repository
              </a>
              <a
                href="https://github.com/cywf/Sol-Sentry/blob/main/docs/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                Contributing Guide
              </a>
              <a
                href="https://github.com/cywf/Sol-Sentry/blob/main/docs/SECURITY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline"
              >
                Security Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
