export type ContributionStatus = 'merged' | 'open' | 'closed';

type RepositoryContributions = {
  repo: string;
  pulls: { number: number; title: string; status: ContributionStatus }[];
};

export const contributions: RepositoryContributions[] = [
  {
    repo: 'Noveum/orbit',
    pulls: [
      { number: 379, title: 'Detect duplicate issues with PostgreSQL trigram matching', status: 'merged' },
      { number: 372, title: 'Show workspace updates and document project health', status: 'merged' },
    ],
  },
  {
    repo: 'open-telemetry/opentelemetry-go-compile-instrumentation',
    pulls: [
      { number: 800, title: 'Cover environment variable filtering in integration tests', status: 'merged' },
    ],
  },
  {
    repo: 'open-telemetry/opentelemetry-js',
    pulls: [
      { number: 6885, title: 'Add experimental advisory attributes to metrics', status: 'open' },
      { number: 6884, title: 'Drop stale attribute sets from asynchronous metrics', status: 'open' },
      { number: 6878, title: 'Switch browser entry points to conditional exports', status: 'closed' },
    ],
  },
  {
    repo: 'Noveum/noveum-trace',
    pulls: [
      { number: 86, title: 'Align GenAI tracing attributes with OpenTelemetry conventions', status: 'closed' },
    ],
  },
  {
    repo: 'kyverno/sdk',
    pulls: [
      { number: 129, title: 'Preserve the HTTP context type after CEL Client calls', status: 'open' },
    ],
  },
  {
    repo: 'kyverno/kyverno',
    pulls: [
      { number: 16480, title: 'Use the secret informer cache for image verification policies', status: 'closed' },
    ],
  },
  {
    repo: 'opensource-society/notesvault',
    pulls: [
      { number: 186, title: 'Update the NotesVault homepage UI', status: 'closed' },
      { number: 175, title: 'Build the Browse Notes page', status: 'merged' },
    ],
  },
];
