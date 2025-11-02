import React, { useEffect, useState } from 'react';

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

interface GPTFunction {
  fileName: string;
  path: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  required: string[];
}

interface TerraformModule {
  path: string;
  name: string;
  files: string[];
  variables: Array<{
    name: string;
    type?: string;
    description?: string;
    default?: any;
  }>;
}

type TabType = 'contracts' | 'gpt-functions' | 'terraform';

const AuditExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('contracts');
  const [contracts, setContracts] = useState<ContractInfo[]>([]);
  const [gptFunctions, setGptFunctions] = useState<GPTFunction[]>([]);
  const [terraformModules, setTerraformModules] = useState<TerraformModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.BASE_URL || '/Sol-Sentry';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [contractsRes, gptRes, terraformRes] = await Promise.all([
        fetch(`${baseUrl}/explorer/contracts.json`).catch(() => ({ ok: false, json: async () => [] })),
        fetch(`${baseUrl}/explorer/gpt_functions.json`).catch(() => ({ ok: false, json: async () => [] })),
        fetch(`${baseUrl}/explorer/terraform.json`).catch(() => ({ ok: false, json: async () => [] })),
      ]);

      if (contractsRes.ok) {
        const data = await contractsRes.json();
        setContracts(data);
      }

      if (gptRes.ok) {
        const data = await gptRes.json();
        setGptFunctions(data);
      }

      if (terraformRes.ok) {
        const data = await terraformRes.json();
        setTerraformModules(data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading audit data:', err);
      setError('Failed to load audit data. The indexes may not have been generated yet.');
      setLoading(false);
    }
  };

  const filteredContracts = contracts.filter(
    (c) =>
      c.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGptFunctions = gptFunctions.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTerraformModules = terraformModules.filter(
    (m) =>
      m.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <a
          className={`tab ${activeTab === 'contracts' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contracts')}
        >
          Contracts ({contracts.length})
        </a>
        <a
          className={`tab ${activeTab === 'gpt-functions' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('gpt-functions')}
        >
          GPT Functions ({gptFunctions.length})
        </a>
        <a
          className={`tab ${activeTab === 'terraform' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('terraform')}
        >
          Terraform ({terraformModules.length})
        </a>
      </div>

      {/* Search Bar */}
      <div className="form-control mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'contracts' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredContracts.length === 0 ? (
            <div className="alert alert-info">No contracts found.</div>
          ) : (
            filteredContracts.map((contract, idx) => (
              <div key={idx} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{contract.fileName}</h3>
                  <p className="text-sm opacity-70">{contract.path}</p>
                  <div className="flex flex-wrap gap-2 my-2">
                    <div className="badge badge-neutral">{contract.lines} lines</div>
                    <div className="badge badge-neutral">{(contract.size / 1024).toFixed(1)} KB</div>
                    {contract.hasAnchorLang && <div className="badge badge-primary">Anchor</div>}
                    {contract.hasProgram && <div className="badge badge-secondary">#[program]</div>}
                    {contract.hasAccount && <div className="badge badge-accent">#[account]</div>}
                    {contract.hasEntrypoint && <div className="badge badge-info">entrypoint</div>}
                  </div>
                  <details className="collapse collapse-arrow bg-base-300">
                    <summary className="collapse-title">Preview (first 120 lines)</summary>
                    <div className="collapse-content">
                      <pre className="text-xs overflow-x-auto bg-base-100 p-4 rounded">
                        <code>{contract.preview}</code>
                      </pre>
                    </div>
                  </details>
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={`https://github.com/cywf/Sol-Sentry/blob/main/${contract.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'gpt-functions' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredGptFunctions.length === 0 ? (
            <div className="alert alert-info">No GPT functions found.</div>
          ) : (
            filteredGptFunctions.map((func, idx) => (
              <div key={idx} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{func.name}</h3>
                  <p>{func.description}</p>
                  <div className="divider"></div>
                  <div>
                    <h4 className="font-bold mb-2">Parameters:</h4>
                    <div className="overflow-x-auto">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(func.parameters).map(([key, value]: [string, any]) => (
                            <tr key={key}>
                              <td className="font-mono">{key}</td>
                              <td>{value.type}</td>
                              <td>{func.required.includes(key) ? '✓' : ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={`https://github.com/cywf/Sol-Sentry/blob/main/${func.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View JSON
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'terraform' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredTerraformModules.length === 0 ? (
            <div className="alert alert-info">No Terraform modules found.</div>
          ) : (
            filteredTerraformModules.map((module, idx) => (
              <div key={idx} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{module.name}</h3>
                  <p className="text-sm opacity-70">{module.path}</p>
                  <div className="badge badge-neutral mb-2">{module.files.length} files</div>
                  {module.variables.length > 0 && (
                    <>
                      <div className="divider"></div>
                      <div>
                        <h4 className="font-bold mb-2">Variables ({module.variables.length}):</h4>
                        <div className="overflow-x-auto">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Default</th>
                              </tr>
                            </thead>
                            <tbody>
                              {module.variables.map((variable, vidx) => (
                                <tr key={vidx}>
                                  <td className="font-mono">{variable.name}</td>
                                  <td>{variable.type || 'unknown'}</td>
                                  <td className="text-xs">
                                    {variable.default !== undefined
                                      ? JSON.stringify(variable.default)
                                      : '-'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={`https://github.com/cywf/Sol-Sentry/tree/main/${module.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AuditExplorer;
