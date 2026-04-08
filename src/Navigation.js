import React from 'react';
import './Navigation.css';

function LogoMark() {
  return (
    <div className="nav-logo-mark" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="5" y="12" width="5" height="2.5" rx="0.5" fill="currentColor" opacity="0.85" />
      </svg>
    </div>
  );
}

export default class Navigation extends React.Component {
  render() {
    const { selectedTab, onClick } = this.props;
    const tabs = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'shipping-requests', label: 'Shipping Requests' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Settings' },
    ];

    return (
      <header className="app-top-header">
        <div className="app-top-header__inner">
          <div className="app-top-header__brand">
            <LogoMark />
            <span className="app-top-header__name">Shiptivitas</span>
          </div>

          <nav className="app-top-header__nav" role="tablist" aria-label="Main">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${tab.id}-tab`}
                aria-selected={selectedTab === tab.id}
                aria-controls={tab.id}
                className={
                  'app-top-header__link' +
                  (selectedTab === tab.id ? ' app-top-header__link--active' : '')
                }
                onClick={() => onClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="app-top-header__actions">
            <button
              type="button"
              className="app-top-header__icon-btn"
              aria-label="Notifications"
            >
              <svg
                className="app-top-header__bell"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="app-top-header__notif-badge" aria-hidden="true" />
            </button>
            <div className="app-top-header__avatar" title="Alex K." aria-label="Account, Alex K.">
              AK
            </div>
          </div>
        </div>
      </header>
    );
  }
}
