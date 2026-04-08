import React from 'react';
import './Settings.css';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'profile',
      toasts: [],
      profile: {
        firstName: 'Alex',
        lastName: 'Kim',
        email: 'alex.kim@shiptivitas.com',
        jobTitle: 'Operations Manager',
        department: 'Operations',
        timezone: 'UTC+3 (Cairo)'
      },
      notifications: {
        emailAssigned: true,
        emailStatusChange: true,
        emailOverdue: true,
        emailWeekly: false,
        inAppCardMoved: true,
        inAppMentions: true,
        inAppAnnouncements: false,
        notifStart: '08:00 AM',
        notifEnd: '06:00 PM',
        notifDays: 'Monday – Friday'
      }
    };
  }

  showSection = (section) => {
    this.setState({ activeSection: section });
  };

  showToast = (msg) => {
    const id = Date.now();
    this.setState(prev => ({ toasts: [...prev.toasts, { id, msg }] }));
    setTimeout(() => {
      this.setState(prev => ({ toasts: prev.toasts.filter(t => t.id !== id) }));
    }, 2400);
  };

  handleProfileChange = (field, value) => {
    this.setState(prev => ({ profile: { ...prev.profile, [field]: value } }));
  };

  handleNotificationChange = (field) => {
    this.setState(prev => ({ notifications: { ...prev.notifications, [field]: !prev.notifications[field] } }));
  };

  handleNotificationTextChange = (field, value) => {
    this.setState(prev => ({ notifications: { ...prev.notifications, [field]: value } }));
  };

  renderProfileSection = () => {
    return (
      <div>
        <div className="section-title">Profile & Account</div>
        <div className="section-sub">Manage your personal information and security settings.</div>

        <div className="scard">
          <div className="scard-header"><div className="scard-title">Personal information</div></div>
          <div className="scard-body">
            <div className="avatar-editor">
              <div className="avatar-large">AK</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Profile photo</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-ghost" onClick={() => this.showToast('Upload photo clicked')}>Upload photo</button>
                  <button className="btn-ghost" style={{ color: '#dc2626', borderColor: '#fecaca' }} onClick={() => this.showToast('Photo removed')}>Remove</button>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input type="text" value={this.state.profile.firstName} onChange={(e) => this.handleProfileChange('firstName', e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input type="text" value={this.state.profile.lastName} onChange={(e) => this.handleProfileChange('lastName', e.target.value)}/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email address</label>
                <input type="email" value={this.state.profile.email} onChange={(e) => this.handleProfileChange('email', e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Job title</label>
                <input type="text" value={this.state.profile.jobTitle} onChange={(e) => this.handleProfileChange('jobTitle', e.target.value)}/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select value={this.state.profile.department} onChange={(e) => this.handleProfileChange('department', e.target.value)}>
                  <option>Operations</option>
                  <option>Logistics</option>
                  <option>Finance</option>
                  <option>Customs</option>
                </select>
              </div>
              <div className="form-group">
                <label>Timezone</label>
                <select value={this.state.profile.timezone} onChange={(e) => this.handleProfileChange('timezone', e.target.value)}>
                  <option>UTC+3 (Cairo)</option>
                  <option>UTC+0 (London)</option>
                  <option>UTC-5 (New York)</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-ghost" onClick={() => this.showToast('Changes discarded')}>Discard</button>
              <button className="btn-primary" onClick={() => this.showToast('Profile saved successfully')}>Save changes</button>
            </div>
          </div>
        </div>

        <div className="scard">
          <div className="scard-header">
            <div className="scard-title">Change password</div>
            <div className="scard-sub">Use a strong password with at least 8 characters.</div>
          </div>
          <div className="scard-body">
            <div className="form-row">
              <div className="form-group full">
                <label>Current password</label>
                <input type="password" placeholder="••••••••"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>New password</label>
                <input type="password" placeholder="••••••••"/>
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input type="password" placeholder="••••••••"/>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={() => this.showToast('Password updated')}>Update password</button>
            </div>
          </div>
        </div>

        <div className="scard">
          <div className="scard-header"><div className="scard-title" style={{ color: '#dc2626' }}>Danger zone</div></div>
          <div className="scard-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>Delete account</div>
                <div style={{ fontSize: '12px', color: '#9896ab', marginTop: '3px' }}>Permanently delete your account and all associated data.</div>
              </div>
              <button className="btn-danger">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderNotificationSection = () => {
    return (
      <div>
        <div className="section-title">Notification preferences</div>
        <div className="section-sub">Choose how and when you get notified about activity.</div>

        <div className="scard">
          <div className="scard-header"><div className="scard-title">Email notifications</div></div>
          <div className="scard-body">
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">Request assigned to me</div>
                <div className="toggle-desc">Get notified when a new shipping request is assigned to you.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.emailAssigned} onChange={() => this.handleNotificationChange('emailAssigned')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">Status changes</div>
                <div className="toggle-desc">Notify me when a request I'm watching moves between swimlanes.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.emailStatusChange} onChange={() => this.handleNotificationChange('emailStatusChange')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">Overdue alerts</div>
                <div className="toggle-desc">Send a daily digest of overdue requests.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.emailOverdue} onChange={() => this.handleNotificationChange('emailOverdue')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">Weekly summary</div>
                <div className="toggle-desc">Receive a weekly performance summary every Monday morning.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.emailWeekly} onChange={() => this.handleNotificationChange('emailWeekly')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="scard">
          <div className="scard-header"><div className="scard-title">In-app notifications</div></div>
          <div className="scard-body">
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">Card moved by teammate</div>
                <div className="toggle-desc">Show a toast notification when someone moves a card you own.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.inAppCardMoved} onChange={() => this.handleNotificationChange('inAppCardMoved')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">Mentions and comments</div>
                <div className="toggle-desc">Alert me when I'm @mentioned on a request.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.inAppMentions} onChange={() => this.handleNotificationChange('inAppMentions')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <div className="toggle-label">System announcements</div>
                <div className="toggle-desc">Maintenance windows and product update notices.</div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={this.state.notifications.inAppAnnouncements} onChange={() => this.handleNotificationChange('inAppAnnouncements')}/>
                <div className="toggle-track"></div>
                <div className="toggle-thumb"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="scard">
          <div className="scard-header">
            <div className="scard-title">Notification schedule</div>
            <div className="scard-sub">Only receive notifications during working hours.</div>
          </div>
          <div className="scard-body">
            <div className="form-row">
              <div className="form-group">
                <label>Start time</label>
                <input type="text" value={this.state.notifications.notifStart} onChange={(e) => this.handleNotificationTextChange('notifStart', e.target.value)}/>
              </div>
              <div className="form-group">
                <label>End time</label>
                <input type="text" value={this.state.notifications.notifEnd} onChange={(e) => this.handleNotificationTextChange('notifEnd', e.target.value)}/>
              </div>
            </div>
            <div className="form-group">
              <label>Days</label>
              <select value={this.state.notifications.notifDays} onChange={(e) => this.handleNotificationTextChange('notifDays', e.target.value)}>
                <option>Monday – Friday</option>
                <option>Monday – Saturday</option>
                <option>Every day</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn-primary" onClick={() => this.showToast('Notification preferences saved')}>Save preferences</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderTeamSection = () => {
    const members = [
      { initials: 'AK', name: 'Alex Kim', email: 'alex.kim@shiptivitas.com', role: 'Admin', bg: '#ede9fe', color: '#4f46e5', you: true },
      { initials: 'JL', name: 'Jamie Lee', email: 'jamie.lee@shiptivitas.com', role: 'Admin', bg: '#e0e7ff', color: '#3730a3' },
      { initials: 'PR', name: 'Priya Rao', email: 'priya.rao@shiptivitas.com', role: 'Member', bg: '#fce7f3', color: '#9d174d' },
      { initials: 'MO', name: 'Marco Osei', email: 'marco.osei@shiptivitas.com', role: 'Member', bg: '#fef3c7', color: '#b45309' },
      { initials: 'TN', name: 'Tanya Novak', email: 'tanya.novak@shiptivitas.com', role: 'Member', bg: '#d1fae5', color: '#065f46' },
      { initials: 'SB', name: 'Sam Brown', email: 'sam.brown@shiptivitas.com', role: 'Member', bg: '#ffedd5', color: '#c2410c' },
      { initials: 'DR', name: 'Dana Reyes', email: 'dana.reyes@shiptivitas.com', role: 'Member', bg: '#fee2e2', color: '#991b1b' }
    ];

    return (
      <div>
        <div className="section-title">Team members</div>
        <div className="section-sub">Manage who has access to your Shiptivitas workspace.</div>

        <div className="scard">
          <div className="scard-header" style={{ justifyContent: 'space-between' }}>
            <div><div className="scard-title">Invite a new member</div></div>
          </div>
          <div className="scard-body">
            <div className="form-row">
              <div className="form-group"><label>Email address</label><input type="email" placeholder="colleague@company.com"/></div>
              <div className="form-group">
                <label>Role</label>
                <select><option>Member</option><option>Admin</option><option>Viewer</option></select>
              </div>
            </div>
            <div className="form-actions" style={{ marginTop: 0, borderTop: 'none', paddingTop: 0 }}>
              <button className="btn-primary" onClick={() => this.showToast('Invitation sent!')}>Send invite</button>
            </div>
          </div>
        </div>

        <div className="scard">
          <div className="scard-header">
            <div className="scard-title">Current members</div>
            <div className="scard-sub">7 members · 2 admins</div>
          </div>
          <div className="scard-body" style={{ padding: '8px 18px' }}>
            {members.map((member, idx) => (
              <div key={idx} className="team-member-row">
                <div className="member-left">
                  <div className="member-av" style={{ background: member.bg, color: member.color }}>{member.initials}</div>
                  <div>
                    <div className="member-name">{member.name} {member.you && <span style={{ fontSize: '11px', color: '#9896ab' }}>(You)</span>}</div>
                    <div className="member-email">{member.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`role-badge ${member.role === 'Admin' ? 'role-admin' : 'role-member'}`}>{member.role}</span>
                  {!member.you && <button className="btn-ghost" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => this.showToast('Opening role editor...')}>Edit</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  renderIntegrationsSection = () => {
    const integrations = [
      { icon: '📦', name: 'FedEx API', desc: 'Real-time tracking and shipping rates', connected: true },
      { icon: '🛳', name: 'Maersk Logistics', desc: 'Sea freight booking and tracking', connected: true },
      { icon: '📊', name: 'SAP ERP', desc: 'Sync orders and inventory data', connected: false },
      { icon: '💬', name: 'Slack', desc: 'Post alerts and updates to Slack channels', connected: false },
      { icon: '📧', name: 'Gmail / Google Workspace', desc: 'Send notifications via your company email', connected: true }
    ];

    return (
      <div>
        <div className="section-title">Integrations & API</div>
        <div className="section-sub">Connect external tools and manage your API access keys.</div>

        <div className="scard">
          <div className="scard-header"><div className="scard-title">Connected services</div></div>
          <div className="scard-body" style={{ padding: '8px 18px' }}>
            {integrations.map((int, idx) => (
              <div key={idx} className="integration-row">
                <div className="int-left">
                  <div className="int-icon">{int.icon}</div>
                  <div>
                    <div className="int-name">{int.name}</div>
                    <div className="int-desc">{int.desc}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`int-status ${int.connected ? 'connected' : 'disconnected'}`}>
                    {int.connected ? 'Connected' : 'Not connected'}
                  </span>
                  {int.connected ? (
                    <button className="btn-disconnect" onClick={() => this.showToast(`${int.name} disconnected`)}>Disconnect</button>
                  ) : (
                    <button className="btn-connect" onClick={() => this.showToast(`Connecting to ${int.name}...`)}>Connect</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scard">
          <div className="scard-header">
            <div className="scard-title">API keys</div>
            <div className="scard-sub">Use these keys to authenticate API requests from your systems.</div>
          </div>
          <div className="scard-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>Production key</div>
              <span className="int-status connected">Active</span>
            </div>
            <div className="api-key-row">
              <span className="api-key-val">sk_live_••••••••••••••••••••••••••••••••••••4f2a</span>
              <button className="copy-btn" onClick={() => this.showToast('API key copied to clipboard')}>Copy</button>
              <button className="copy-btn" onClick={() => this.showToast('Key revealed — keep it secret!')}>Reveal</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px', marginBottom: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>Test key</div>
              <span className="int-status connected">Active</span>
            </div>
            <div className="api-key-row">
              <span className="api-key-val">sk_test_••••••••••••••••••••••••••••••••••••8c1b</span>
              <button className="copy-btn" onClick={() => this.showToast('Test key copied to clipboard')}>Copy</button>
              <button className="copy-btn" onClick={() => this.showToast('Key revealed')}>Reveal</button>
            </div>
            <div className="form-actions">
              <button className="btn-ghost" onClick={() => this.showToast('Regenerating API key...')}>Regenerate keys</button>
              <button className="btn-primary" onClick={() => this.showToast('Webhook URL saved')}>Save webhook URL</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="settings-page">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="page-title">Settings</h1>
              <p className="page-sub">Manage your account, notifications, team, and integrations.</p>
            </div>
            <div className="hero-visual">
              <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=128&q=80" alt="settings illustration" className="hero-img" />
            </div>
          </div>
        </div>

        <div className="settings-wrap">
          {/* Sidebar */}
          <aside className="settings-nav">
          <div className="settings-nav-title">Account</div>
          <button className={`settings-nav-btn ${this.state.activeSection === 'profile' ? 'active' : ''}`} onClick={() => this.showSection('profile')}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" strokeLinecap="round"/></svg>
            Profile & Account
          </button>
          <button className={`settings-nav-btn ${this.state.activeSection === 'notif' ? 'active' : ''}`} onClick={() => this.showSection('notif')}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2a4 4 0 0 1 4 4v3l1 1.5H3L4 9V6a4 4 0 0 1 4-4z"/><path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" strokeLinecap="round"/></svg>
            Notifications
          </button>
          <div className="settings-nav-title" style={{ marginTop: '1.25rem' }}>Workspace</div>
          <button className={`settings-nav-btn ${this.state.activeSection === 'team' ? 'active' : ''}`} onClick={() => this.showSection('team')}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="5.5" cy="5" r="2.5"/><circle cx="10.5" cy="5" r="2.5"/><path d="M1 14c0-2.5 2.01-4.5 4.5-4.5M15 14c0-2.5-2.01-4.5-4.5-4.5M8 14c0-2.21 1.79-4 4-4s4 1.79 4 4" strokeLinecap="round"/></svg>
            Team Members
          </button>
          <button className={`settings-nav-btn ${this.state.activeSection === 'integrations' ? 'active' : ''}`} onClick={() => this.showSection('integrations')}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><path d="M11.5 9v6M9 11.5h5" strokeLinecap="round"/></svg>
            Integrations & API
          </button>
        </aside>

        {/* Main content */}
        <main className="settings-main">
          {this.state.activeSection === 'profile' && this.renderProfileSection()}
          {this.state.activeSection === 'notif' && this.renderNotificationSection()}
          {this.state.activeSection === 'team' && this.renderTeamSection()}
          {this.state.activeSection === 'integrations' && this.renderIntegrationsSection()}
        </main>
      </div>

      {/* Toast container */}
      <div className="toast-container">
        {this.state.toasts.map(t => (
          <div key={t.id} className="toast">{t.msg}</div>
        ))}
      </div>
    </div>
    );
  }
}

