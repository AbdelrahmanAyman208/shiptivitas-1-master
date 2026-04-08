import React from 'react';
import './NewRequestModal.css';

const TAGS = ['Warehouse', 'Customs', 'Carrier', 'Ops', 'Packaging', 'Planning', 'Finance'];
const ASSIGNEES = [
  { code: 'JL', name: 'Jamie L.' },
  { code: 'PR', name: 'Priya R.' },
  { code: 'AK', name: 'Alex K.' },
  { code: 'MO', name: 'Marco O.' },
  { code: 'TN', name: 'Tanya N.' },
  { code: 'SB', name: 'Sam B.' },
  { code: 'DR', name: 'Dana R.' },
];

function defaultDue() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
}

const emptyForm = () => ({
  title: '',
  tag: 'Warehouse',
  assignee: 'AK',
  priority: 'Medium',
  due: defaultDue(),
  error: '',
});

export default class NewRequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyForm();
  }

  componentDidMount() {
    this.docKey = (e) => {
      if (e.key === 'Escape' && this.props.open) this.props.onClose();
    };
    document.addEventListener('keydown', this.docKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.docKey);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      this.setState(emptyForm());
    }
  }

  handleBackdrop = (e) => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  handleChange = (field) => (e) => {
    const v = e.target.value;
    this.setState({ [field]: v, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.state.title.trim();
    if (!title) {
      this.setState({ error: 'Please enter a short title for the request.' });
      return;
    }
    this.props.onSubmit({
      title,
      tag: this.state.tag,
      assignee: this.state.assignee,
      priority: this.state.priority,
      due: this.state.due || defaultDue(),
    });
  };

  render() {
    const { open, onClose } = this.props;
    if (!open) return null;

    return (
      <div className="new-req-overlay" role="presentation" onMouseDown={this.handleBackdrop}>
        <div
          className="new-req-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-req-title"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="new-req-header">
            <div>
              <h2 id="new-req-title">New shipping request</h2>
              <p className="new-req-sub">Adds a card to Backlog. Drag it to In progress or Complete when ready.</p>
            </div>
            <button type="button" className="new-req-close" onClick={onClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l10 10M14 4L4 14" />
              </svg>
            </button>
          </div>

          <form className="new-req-form" onSubmit={this.handleSubmit}>
            <div className="new-req-field">
              <label htmlFor="new-req-title-input">Title</label>
              <textarea
                id="new-req-title-input"
                value={this.state.title}
                onChange={this.handleChange('title')}
                placeholder="e.g. Schedule pickup for outbound pallet batch"
                autoFocus
              />
            </div>

            <div className="new-req-row">
              <div className="new-req-field">
                <label htmlFor="new-req-tag">Category</label>
                <select id="new-req-tag" value={this.state.tag} onChange={this.handleChange('tag')}>
                  {TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="new-req-field">
                <label htmlFor="new-req-priority">Priority</label>
                <select id="new-req-priority" value={this.state.priority} onChange={this.handleChange('priority')}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="new-req-row">
              <div className="new-req-field">
                <label htmlFor="new-req-assignee">Assignee</label>
                <select id="new-req-assignee" value={this.state.assignee} onChange={this.handleChange('assignee')}>
                  {ASSIGNEES.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.code} — {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="new-req-field">
                <label htmlFor="new-req-due">Due date</label>
                <input id="new-req-due" type="date" value={this.state.due} onChange={this.handleChange('due')} />
              </div>
            </div>

            {this.state.error ? <p className="new-req-error">{this.state.error}</p> : null}

            <div className="new-req-actions">
              <button type="button" className="new-req-btn new-req-btn--ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="new-req-btn new-req-btn--primary">
                Create request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
