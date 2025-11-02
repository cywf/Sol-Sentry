import React, { useEffect, useState } from 'react';

interface Issue {
  id: number;
  title: string;
  url: string;
  labels: string[];
  state: string;
}

interface ProjectData {
  lanes: Record<string, Issue[]>;
}

const DevelopmentBoard: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.BASE_URL || '/Sol-Sentry';

  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/data/projects.json`);
      if (response.ok) {
        const data = await response.json();
        setProjectData(data);
      } else {
        setError('Project data not available yet. Run the CI workflow to generate it.');
      }
    } catch (err) {
      console.error('Error loading project data:', err);
      setError('Failed to load project data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-96 w-full"></div>
        ))}
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div>
        <div className="alert alert-info mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error || 'No project data available yet.'}</span>
        </div>
        <a
          href="https://github.com/cywf/Sol-Sentry/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Issues on GitHub
        </a>
      </div>
    );
  }

  const lanes = Object.entries(projectData.lanes);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lanes.map(([laneName, issues]) => (
          <div key={laneName} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {laneName.charAt(0).toUpperCase() + laneName.slice(1)}
                <div className="badge badge-neutral">{issues.length}</div>
              </h2>
              <div className="divider my-2"></div>
              <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
                {issues.length === 0 ? (
                  <p className="text-sm opacity-70">No items</p>
                ) : (
                  issues.map((issue) => (
                    <div key={issue.id} className="card bg-base-300 compact">
                      <div className="card-body">
                        <a
                          href={issue.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-hover text-sm"
                        >
                          {issue.title}
                        </a>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {issue.labels.slice(0, 3).map((label) => (
                            <div key={label} className="badge badge-xs badge-outline">
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/cywf/Sol-Sentry/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          View Projects on GitHub
        </a>
      </div>
    </div>
  );
};

export default DevelopmentBoard;
