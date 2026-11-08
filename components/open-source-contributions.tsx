'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, GitMerge, GitPullRequest, GitPullRequestClosed } from 'lucide-react';
import { contributions } from '@/data/experience';

const statusIcons = { merged: GitMerge, open: GitPullRequest, closed: GitPullRequestClosed };
const allPulls = contributions.flatMap(({ repo, pulls }) => pulls.map(pull => ({ ...pull, repo })));
const mergedPulls = allPulls.filter(pull => pull.status === 'merged');

export function OpenSourceContributions() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="patch-board">
      <ul className="patch-list" id="open-source-pulls">
        {(showAll ? allPulls : mergedPulls).map(({ repo, number, status, title }) => {
          const StatusIcon = statusIcons[status];
          return (
            <li key={`${repo}#${number}`}>
              <a className="patch-row" href={`https://github.com/${repo}/pull/${number}`} target="_blank" rel="noreferrer">
                <span className="patch-state" data-status={status} title={status}>
                  <StatusIcon size={14} aria-hidden="true" /><span className="sr-only">{status}</span>
                </span>
                <span className="patch-title">{title}</span>
                <span className="patch-repo" title={repo}>{repo.split('/')[1]}</span>
                <span className="patch-number">#{number}</span>
                <ArrowUpRight size={13} className="patch-arrow" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
      <div className="patch-actions">
        <button type="button" aria-expanded={showAll} aria-controls="open-source-pulls" onClick={() => setShowAll(value => !value)}>
          {showAll ? 'Show merged only' : `Show all ${allPulls.length} PRs`} <ArrowDown size={12} aria-hidden="true" />
        </button>
        <a href="https://github.com/AkshitBhandariCodes" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
