import React from 'react';
import './Card.css';

const ASSIGNEES = {
  JL: { name: 'Jamie L.', bg: '#e0e7ff' },
  PR: { name: 'Priya R.', bg: '#fce7f3' },
  AK: { name: 'Alex K.', bg: '#ede9fe' },
  MO: { name: 'Marco O.', bg: '#fef3c7' },
  TN: { name: 'Tanya N.', bg: '#d1fae5' },
  SB: { name: 'Sam B.', bg: '#ffedd5' },
  DR: { name: 'Dana R.', bg: '#fee2e2' },
};

export default class Card extends React.Component {
  formatDue(ds) {
    const d = new Date(ds), now = new Date();
    now.setHours(0, 0, 0, 0);
    return { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), overdue: d < now };
  }

  render() {
    const task = this.props.client;
    const pc = task.priority === 'High' ? 'p-high' : task.priority === 'Medium' ? 'p-med' : 'p-low';
    const due = this.formatDue(task.due);
    const av = ASSIGNEES[task.assignee] || { name: task.assignee || 'Unassigned', bg: '#e5e7eb' };
    let className = ['Card'];
    if (task.status === 'backlog') {
      className.push('Card-grey');
    } else if (task.status === 'in-progress') {
      className.push('Card-blue');
    } else if (task.status === 'complete') {
      className.push('Card-green');
    }
    return (
      <div className={className.join(' ')} data-id={task.id} data-tag={task.tag} data-priority={task.priority} data-assignee={task.assignee} data-title={task.title.toLowerCase()}>
        <div className="card-top">
          <span className="card-id">{task.id}</span>
          <span className={`priority-badge ${pc}`}>{task.priority}</span>
        </div>
        <div className="card-title">{task.title}</div>
        <div className="card-meta">
          <span className="tag">{task.tag}</span>
          <span className={`due-label${due.overdue ? ' due-overdue' : ''}`}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="1" y="2" width="10" height="9" rx="1.5" />
              <path d="M4 1v2M8 1v2M1 5h10" strokeLinecap="round" />
            </svg>
            {due.overdue ? 'Overdue · ' : ''}{due.label}
          </span>
        </div>
        <div className="card-footer">
          <div className="assignee-row">
            <div className="assignee-avatar" style={{ background: av.bg }}>{task.assignee}</div>
            <span className="assignee-name">{av.name}</span>
          </div>
          <div className="card-actions">
            <button className="card-action-btn" title="Edit">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8.5 1.5l2 2L4 10H2V8L8.5 1.5z" />
              </svg>
            </button>
            <button className="card-action-btn" title="More">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="2.5" r="1" />
                <circle cx="6" cy="6" r="1" />
                <circle cx="6" cy="9.5" r="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}