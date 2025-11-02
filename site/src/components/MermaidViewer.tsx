import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

const MermaidViewer: React.FC = () => {
  const [diagrams, setDiagrams] = useState<string[]>([]);
  const [selectedDiagram, setSelectedDiagram] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.BASE_URL || '/Sol-Sentry';

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
    });
    loadDiagrams();
  }, []);

  useEffect(() => {
    if (selectedDiagram && !loading) {
      renderDiagram();
    }
  }, [selectedDiagram, loading]);

  const loadDiagrams = async () => {
    try {
      setLoading(true);
      // Try to load list of diagrams from a manifest
      const response = await fetch(`${baseUrl}/diagrams/manifest.json`);
      if (response.ok) {
        const data = await response.json();
        setDiagrams(data.diagrams || []);
        if (data.diagrams && data.diagrams.length > 0) {
          setSelectedDiagram(data.diagrams[0]);
        }
      } else {
        // Fallback: show a message that diagrams aren't available
        setError('No diagrams available. Add .mmd files to /mermaid/ directory in the repository.');
      }
    } catch (err) {
      console.error('Error loading diagrams:', err);
      setError('Failed to load diagrams.');
    } finally {
      setLoading(false);
    }
  };

  const renderDiagram = async () => {
    if (!selectedDiagram) return;

    try {
      const response = await fetch(`${baseUrl}/diagrams/${selectedDiagram}`);
      if (!response.ok) throw new Error('Failed to load diagram');

      const diagramText = await response.text();
      const container = document.getElementById('mermaid-diagram');
      if (container) {
        container.innerHTML = diagramText;
        await mermaid.run({
          nodes: container.querySelectorAll('.mermaid'),
        });
      }
    } catch (err) {
      console.error('Error rendering diagram:', err);
    }
  };

  if (loading) {
    return <div className="skeleton h-96 w-full"></div>;
  }

  if (error || diagrams.length === 0) {
    return (
      <div>
        <div className="alert alert-info">
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
          <span>{error || 'No diagrams available yet.'}</span>
        </div>
        <div className="mt-4">
          <p className="mb-4">To add diagrams:</p>
          <ol className="list-decimal list-inside space-y-2 opacity-80">
            <li>Create .mmd files in the /mermaid/ directory</li>
            <li>Run the GitHub Actions workflow to build the site</li>
            <li>Diagrams will be automatically discovered and rendered here</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Diagram Selector */}
      {diagrams.length > 1 && (
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Select Diagram:</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedDiagram || ''}
            onChange={(e) => setSelectedDiagram(e.target.value)}
          >
            {diagrams.map((diagram) => (
              <option key={diagram} value={diagram}>
                {diagram.replace('.mmd', '')}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Diagram Display */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div
            id="mermaid-diagram"
            className="mermaid flex justify-center items-center min-h-[400px] overflow-x-auto"
          ></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 alert alert-info">
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
        <div>
          <p className="font-bold">About Mermaid Diagrams</p>
          <p className="text-sm">
            These diagrams are rendered from .mmd files in the repository using Mermaid.js.
            They visualize project architecture, workflows, and relationships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MermaidViewer;
