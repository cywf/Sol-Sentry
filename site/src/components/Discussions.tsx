import React, { useEffect, useState } from 'react';

interface Discussion {
  id: number;
  title: string;
  url: string;
  author: string;
  createdAt: string;
  category: string;
  comments: number;
}

const Discussions: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const baseUrl = import.meta.env.BASE_URL || '/Sol-Sentry';

  useEffect(() => {
    loadDiscussions();
  }, []);

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/data/discussions.json`);
      if (response.ok) {
        const data = await response.json();
        setDiscussions(data);
      } else {
        setError('Discussions data not available yet. Run the CI workflow to generate it.');
      }
    } catch (err) {
      console.error('Error loading discussions:', err);
      setError('Failed to load discussions.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDiscussions = discussions.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-24 w-full"></div>
        ))}
      </div>
    );
  }

  if (error || discussions.length === 0) {
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
          <span>{error || 'No discussions available yet.'}</span>
        </div>
        <a
          href="https://github.com/cywf/Sol-Sentry/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Discussions on GitHub
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="form-control mb-6">
        <input
          type="text"
          placeholder="Search discussions..."
          className="input input-bordered"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Discussions List */}
      <div className="flex flex-col gap-4">
        {filteredDiscussions.length === 0 ? (
          <div className="alert alert-info">No discussions match your search.</div>
        ) : (
          filteredDiscussions.map((discussion) => (
            <div key={discussion.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="card-title">
                      <a
                        href={discussion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-hover"
                      >
                        {discussion.title}
                      </a>
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="badge badge-primary">{discussion.category}</div>
                      <div className="badge badge-ghost">{discussion.author}</div>
                      <div className="badge badge-ghost">
                        {discussion.comments} comment{discussion.comments !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <p className="text-sm opacity-70 mt-2">
                      {new Date(discussion.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={discussion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/cywf/Sol-Sentry/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          View All Discussions on GitHub
        </a>
      </div>
    </div>
  );
};

export default Discussions;
