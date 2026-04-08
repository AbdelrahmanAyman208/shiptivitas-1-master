import React from 'react';
import './Analytics.css';

const TEAM_PERFORMANCE_ROWS = [
  { initials: 'JL', name: 'Jamie L.', avatarBg: '#e0e7ff', avatarFg: '#3730a3', assigned: 17, completed: 14, completionRate: 82, avgTimeDays: 2.1, onTimePct: 96 },
  { initials: 'PR', name: 'Priya R.', avatarBg: '#fce7f3', avatarFg: '#9d174d', assigned: 12, completed: 8, completionRate: 67, avgTimeDays: 3.5, onTimePct: 88 },
  { initials: 'AK', name: 'Alex K.', avatarBg: '#ede9fe', avatarFg: '#4f46e5', assigned: 9, completed: 8, completionRate: 89, avgTimeDays: 1.8, onTimePct: 100 },
  { initials: 'MO', name: 'Marco O.', avatarBg: '#fef3c7', avatarFg: '#b45309', assigned: 14, completed: 11, completionRate: 79, avgTimeDays: 2.6, onTimePct: 93 },
  { initials: 'TN', name: 'Tanya N.', avatarBg: '#d1fae5', avatarFg: '#065f46', assigned: 6, completed: 6, completionRate: 100, avgTimeDays: 1.4, onTimePct: 100 },
  { initials: 'SB', name: 'Sam B.', avatarBg: '#ffedd5', avatarFg: '#c2410c', assigned: 8, completed: 5, completionRate: 63, avgTimeDays: 2.9, onTimePct: 90 },
];

function completionBarColor(rate) {
  if (rate >= 90) return '#16a34a';
  if (rate >= 75) return '#2563eb';
  if (rate >= 60) return '#d97706';
  return '#dc2626';
}

function onTimeTextColor(pct) {
  if (pct >= 93) return '#15803d';
  if (pct >= 88) return '#b45309';
  return '#c2410c';
}

function sortTeamRows(rows, key, dir) {
  const sign = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case 'name':
        cmp = a.name.localeCompare(b.name);
        break;
      case 'assigned':
        cmp = a.assigned - b.assigned;
        break;
      case 'completed':
        cmp = a.completed - b.completed;
        break;
      case 'rate':
        cmp = a.completionRate - b.completionRate;
        break;
      case 'time':
        cmp = a.avgTimeDays - b.avgTimeDays;
        break;
      case 'ontime':
        cmp = a.onTimePct - b.onTimePct;
        break;
      default:
        cmp = 0;
    }
    if (cmp !== 0) return sign * cmp;
    return a.name.localeCompare(b.name);
  });
}

export default class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: '30d',
      teamSortKey: 'rate',
      teamSortDir: 'desc',
    };
  }

  setRange = (range) => {
    this.setState({ range });
  };

  setTeamSort = (key) => {
    this.setState((prev) => {
      if (prev.teamSortKey === key) {
        return { teamSortDir: prev.teamSortDir === 'asc' ? 'desc' : 'asc' };
      }
      return { teamSortKey: key, teamSortDir: key === 'name' ? 'asc' : 'desc' };
    });
  };

  render() {
    const { range, teamSortKey, teamSortDir } = this.state;
    const teamRowsSorted = sortTeamRows(TEAM_PERFORMANCE_ROWS, teamSortKey, teamSortDir);

    // Data based on range
    const chartData = {
      '7d': {
        bars: [
          { created: 40, completed: 35, label: 'Mar 27' },
          { created: 50, completed: 45, label: 'Mar 28' },
          { created: 45, completed: 50, label: 'Mar 29' },
          { created: 55, completed: 40, label: 'Mar 30' },
          { created: 50, completed: 55, label: 'Mar 31' },
          { created: 45, completed: 40, label: 'Apr 1' },
          { created: 40, completed: 45, label: 'Apr 2' }
        ],
        pie: { backlog: 35, inProgress: 30, complete: 35 },
        kpis: { total: 98, completion: 71.4, ontime: 92.8, avgTime: '2.1d' }
      },
      '30d': {
        bars: [
          { created: 60, completed: 50, label: 'Mar 3' },
          { created: 80, completed: 60, label: 'Mar 10' },
          { created: 70, completed: 75, label: 'Mar 17' },
          { created: 95, completed: 70, label: 'Mar 24' },
          { created: 75, completed: 90, label: 'Mar 31' },
          { created: 65, completed: 60, label: 'Apr 2' }
        ],
        pie: { backlog: 47, inProgress: 22, complete: 31 },
        kpis: { total: 148, completion: 73.6, ontime: 94.2, avgTime: '2.4d' }
      },
      '90d': {
        bars: [
          { created: 120, completed: 100, label: 'Jan 3' },
          { created: 140, completed: 130, label: 'Jan 31' },
          { created: 130, completed: 140, label: 'Feb 28' },
          { created: 150, completed: 120, label: 'Mar 31' },
          { created: 135, completed: 150, label: 'Apr 2' }
        ],
        pie: { backlog: 45, inProgress: 25, complete: 30 },
        kpis: { total: 420, completion: 75.2, ontime: 95.1, avgTime: '2.6d' }
      },
      '1y': {
        bars: [
          { created: 500, completed: 450, label: 'Q1' },
          { created: 550, completed: 520, label: 'Q2' },
          { created: 520, completed: 540, label: 'Q3' },
          { created: 580, completed: 500, label: 'Q4' }
        ],
        pie: { backlog: 40, inProgress: 30, complete: 30 },
        kpis: { total: 1680, completion: 76.8, ontime: 96.2, avgTime: '2.8d' }
      }
    };

    const data = chartData[range];
    const maxBar = Math.max(...data.bars.map(b => Math.max(b.created, b.completed)));
    const scale = 120 / maxBar; // max height 120px

    const total = data.pie.backlog + data.pie.inProgress + data.pie.complete;
    const backlogAngle = (data.pie.backlog / total) * 360;
    const inProgressAngle = (data.pie.inProgress / total) * 360;
    const completeAngle = (data.pie.complete / total) * 360;

    return (
      <div className="analytics-wrap">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="page-title">Analytics</h1>
              <p className="page-sub">Performance overview across all shipping operations.</p>
            </div>
            <div className="hero-visual">
              <div className="hero-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" fill="url(#analyticsGradient)" opacity="0.1"/>
                  <rect x="16" y="20" width="32" height="24" rx="4" fill="url(#analyticsGradient)" opacity="0.8"/>
                  <rect x="20" y="26" width="8" height="4" rx="2" fill="white" opacity="0.9"/>
                  <rect x="20" y="34" width="12" height="4" rx="2" fill="white" opacity="0.7"/>
                  <rect x="36" y="26" width="8" height="4" rx="2" fill="white" opacity="0.9"/>
                  <rect x="36" y="34" width="8" height="4" rx="2" fill="white" opacity="0.7"/>
                  <circle cx="24" cy="40" r="2" fill="url(#analyticsGradient)"/>
                  <circle cx="32" cy="40" r="2" fill="url(#analyticsGradient)"/>
                  <circle cx="40" cy="40" r="2" fill="url(#analyticsGradient)"/>
                  <defs>
                    <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#0ea5e9"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="range-tabs">
            <button
              className={`range-tab ${range === '7d' ? 'active' : ''}`}
              onClick={() => this.setRange('7d')}
            >
              7 days
            </button>
            <button
              className={`range-tab ${range === '30d' ? 'active' : ''}`}
              onClick={() => this.setRange('30d')}
            >
              30 days
            </button>
            <button
              className={`range-tab ${range === '90d' ? 'active' : ''}`}
              onClick={() => this.setRange('90d')}
            >
              90 days
            </button>
            <button
              className={`range-tab ${range === '1y' ? 'active' : ''}`}
              onClick={() => this.setRange('1y')}
            >
              1 year
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="kpi-strip">
          <div className="kpi-mini">
            <div className="kpi-mini-val">{data.kpis.total}</div>
            <div className="kpi-mini-label">Total requests</div>
            <div className="kpi-mini-delta up">↑ 12% vs prev. period</div>
          </div>
          <div className="kpi-mini">
            <div className="kpi-mini-val" style={{ color: '#16a34a' }}>{data.kpis.completion}%</div>
            <div className="kpi-mini-label">Completion rate</div>
            <div className="kpi-mini-delta up">↑ 4.2 pts vs prev. period</div>
          </div>
          <div className="kpi-mini">
            <div className="kpi-mini-val" style={{ color: '#2563eb' }}>{data.kpis.ontime}%</div>
            <div className="kpi-mini-label">On-time rate</div>
            <div className="kpi-mini-delta down">↓ 0.8 pts vs prev. period</div>
          </div>
          <div className="kpi-mini">
            <div className="kpi-mini-val">{data.kpis.avgTime}</div>
            <div className="kpi-mini-label">Avg. resolution time</div>
            <div className="kpi-mini-delta up">↑ improved by 0.3 days</div>
          </div>
        </div>

        {/* Performance cards */}
        <div className="two-col">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Requests over time</div>
                <div className="card-sub">Created vs completed per {range === '1y' ? 'quarter' : 'week'}</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', gap: '8px', height: '200px' }}>
                {data.bars.map((bar, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '14px', height: `${bar.created * scale}px`, background: '#4f46e5', borderRadius: '2px' }}></div>
                    <div style={{ width: '14px', height: `${bar.completed * scale}px`, background: '#22c55e', borderRadius: '2px' }}></div>
                    <span style={{ fontSize: '10px', color: '#9896ab', marginTop: '8px' }}>{bar.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '16px', fontSize: '12px', justifyContent: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '3px', background: '#4f46e5', borderRadius: '1px', display: 'inline-block' }}></span> Created
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '3px', background: '#22c55e', borderRadius: '1px', display: 'inline-block' }}></span> Completed
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <div>
                <div className="card-title">Status breakdown</div>
                <div className="card-sub">Current distribution</div>
              </div>
            </div>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', flex: 1 }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1"/>
                  </filter>
                </defs >
                <circle cx="80" cy="80" r="70" fill="none" stroke="#4f46e5" strokeWidth="20" strokeDasharray={`${(backlogAngle / 360) * 439.6}`} strokeDashoffset="0" transform="rotate(-90 80 80)" filter="url(#shadow)"/>
                <circle cx="80" cy="80" r="70" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray={`${(inProgressAngle / 360) * 439.6}`} strokeDashoffset={`-${(backlogAngle / 360) * 439.6}`} transform="rotate(-90 80 80)" filter="url(#shadow)"/>
                <circle cx="80" cy="80" r="70" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray={`${(completeAngle / 360) * 439.6}`} strokeDashoffset={`-${((backlogAngle + inProgressAngle) / 360) * 439.6}`} transform="rotate(-90 80 80)" filter="url(#shadow)"/>
              </svg>
            </div>
            <div className="donut-legend" style={{ padding: '0 18px 18px' }}>
              <div className="legend-row">
                <div className="legend-left">
                  <span className="legend-swatch" style={{ background: '#4f46e5' }}></span>Backlog
                </div>
                <span className="legend-pct">{data.pie.backlog}%</span>
              </div>
              <div className="legend-row">
                <div className="legend-left">
                  <span className="legend-swatch" style={{ background: '#3b82f6' }}></span>In Progress
                </div>
                <span className="legend-pct">{data.pie.inProgress}%</span>
              </div>
              <div className="legend-row">
                <div className="legend-left">
                  <span className="legend-swatch" style={{ background: '#22c55e' }}></span>Complete
                </div>
                <span className="legend-pct">{data.pie.complete}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* On-time rate + category breakdown */}
        <div className="three-col">
          <div className="card">
            <div className="card-header"><div className="card-title">On-time vs delayed</div></div>
            <div className="gauge-wrap">
              <svg width="180" height="100" viewBox="0 0 180 100">
                <circle cx="90" cy="100" r="70" fill="none" stroke="#fef2f2" strokeWidth="16"/>
                <circle cx="90" cy="100" r="70" fill="none" stroke="#22c55e" strokeWidth="16" strokeDasharray="119.7" strokeDashoffset="0" transform="rotate(-90 90 100)"/>
              </svg>
              <div className="gauge-val">94.2%</div>
              <div className="gauge-label">On-time delivery rate</div>
              <div className="gauge-sub">Target is 95%.<br />7 shipments delayed this period.</div>
            </div>
            <div style={{ padding: '0 18px 16px', display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, background: '#dcfce7', borderRadius: '7px', padding: '10px 12px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#15803d' }}>139</div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: '500', marginTop: '2px' }}>On time</div>
              </div>
              <div style={{ flex: 1, background: '#fef2f2', borderRadius: '7px', padding: '10px 12px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#dc2626' }}>7</div>
                <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: '500', marginTop: '2px' }}>Delayed</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">By category</div></div>
            <div className="card-body">
              {[
                { name: 'Carrier', width: 85, color: '#4f46e5', count: 34 },
                { name: 'Customs', width: 60, color: '#3b82f6', count: 24 },
                { name: 'Warehouse', width: 55, color: '#22c55e', count: 22 },
                { name: 'Ops', width: 45, color: '#f97316', count: 18 },
                { name: 'Finance', width: 35, color: '#a78bfa', count: 14 },
                { name: 'Packaging', width: 25, color: '#f59e0b', count: 10 },
                { name: 'Planning', width: 15, color: '#9896ab', count: 6 }
              ].map((cat, idx) => (
                <div key={idx} className="cat-row">
                  <span className="cat-name">{cat.name}</span>
                  <div className="cat-track">
                    <div className="cat-fill" style={{ width: `${cat.width}%`, background: cat.color }}></div>
                  </div>
                  <span className="cat-count" style={{ color: cat.color }}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Priority distribution</div></div>
            <div className="card-body" style={{ padding: '10px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '6px', height: '160px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '14px', height: '50px', background: '#4f46e5', borderRadius: '2px' }}></div>
                  <div style={{ width: '14px', height: '35px', background: '#3b82f6', borderRadius: '2px' }}></div>
                  <div style={{ width: '14px', height: '75px', background: '#22c55e', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '10px', color: '#9896ab', marginTop: '6px' }}>High</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '14px', height: '42px', background: '#4f46e5', borderRadius: '2px' }}></div>
                  <div style={{ width: '14px', height: '25px', background: '#3b82f6', borderRadius: '2px' }}></div>
                  <div style={{ width: '14px', height: '83px', background: '#22c55e', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '10px', color: '#9896ab', marginTop: '6px' }}>Medium</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '14px', height: '33px', background: '#4f46e5', borderRadius: '2px' }}></div>
                  <div style={{ width: '14px', height: '12px', background: '#3b82f6', borderRadius: '2px' }}></div>
                  <div style={{ width: '14px', height: '50px', background: '#22c55e', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '10px', color: '#9896ab', marginTop: '6px' }}>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team performance */}
        <div className="card team-performance-card">
          <div className="card-header">
            <div className="card-title">Team performance</div>
            <div className="card-sub">Requests handled per person this period · click a column to sort</div>
          </div>
          <div className="team-table-scroll">
            <table className="team-table">
              <thead>
                <tr>
                  <th scope="col" className="team-th team-th-member">
                    <button
                      type="button"
                      className={`team-sort-btn${teamSortKey === 'name' ? ' is-active' : ''}`}
                      onClick={() => this.setTeamSort('name')}
                    >
                      Team member
                      {teamSortKey === 'name' ? <span className="team-sort-indicator">{teamSortDir === 'asc' ? '↑' : '↓'}</span> : null}
                    </button>
                  </th>
                  <th scope="col" className="team-th team-th-num">
                    <button
                      type="button"
                      className={`team-sort-btn${teamSortKey === 'assigned' ? ' is-active' : ''}`}
                      onClick={() => this.setTeamSort('assigned')}
                    >
                      Assigned
                      {teamSortKey === 'assigned' ? <span className="team-sort-indicator">{teamSortDir === 'asc' ? '↑' : '↓'}</span> : null}
                    </button>
                  </th>
                  <th scope="col" className="team-th team-th-num">
                    <button
                      type="button"
                      className={`team-sort-btn${teamSortKey === 'completed' ? ' is-active' : ''}`}
                      onClick={() => this.setTeamSort('completed')}
                    >
                      Completed
                      {teamSortKey === 'completed' ? <span className="team-sort-indicator">{teamSortDir === 'asc' ? '↑' : '↓'}</span> : null}
                    </button>
                  </th>
                  <th scope="col" className="team-th team-th-rate">
                    <button
                      type="button"
                      className={`team-sort-btn${teamSortKey === 'rate' ? ' is-active' : ''}`}
                      onClick={() => this.setTeamSort('rate')}
                    >
                      Completion rate
                      {teamSortKey === 'rate' ? <span className="team-sort-indicator">{teamSortDir === 'asc' ? '↑' : '↓'}</span> : null}
                    </button>
                  </th>
                  <th scope="col" className="team-th team-th-num">
                    <button
                      type="button"
                      className={`team-sort-btn${teamSortKey === 'time' ? ' is-active' : ''}`}
                      onClick={() => this.setTeamSort('time')}
                    >
                      Avg. time
                      {teamSortKey === 'time' ? <span className="team-sort-indicator">{teamSortDir === 'asc' ? '↑' : '↓'}</span> : null}
                    </button>
                  </th>
                  <th scope="col" className="team-th team-th-num">
                    <button
                      type="button"
                      className={`team-sort-btn${teamSortKey === 'ontime' ? ' is-active' : ''}`}
                      onClick={() => this.setTeamSort('ontime')}
                    >
                      On-time
                      {teamSortKey === 'ontime' ? <span className="team-sort-indicator">{teamSortDir === 'asc' ? '↑' : '↓'}</span> : null}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamRowsSorted.map((member) => {
                  const barColor = completionBarColor(member.completionRate);
                  const ontimeColor = onTimeTextColor(member.onTimePct);
                  return (
                    <tr key={member.initials}>
                      <td className="team-td-member">
                        <span className="team-member-pill">
                          <span className="team-av" style={{ background: member.avatarBg, color: member.avatarFg }}>
                            {member.initials}
                          </span>
                          <span className="team-member-name">{member.name}</span>
                        </span>
                      </td>
                      <td className="team-td-num">{member.assigned}</td>
                      <td className="team-td-num">{member.completed}</td>
                      <td className="team-td-rate">
                        <div className="team-rate-row">
                          <div className="team-bar-track" role="presentation">
                            <div
                              className="team-bar-fill"
                              style={{ width: `${member.completionRate}%`, background: barColor }}
                            />
                          </div>
                          <span className="team-rate-pct">{member.completionRate}%</span>
                        </div>
                      </td>
                      <td className="team-td-num team-td-mono">{member.avgTimeDays.toFixed(1)}d</td>
                      <td className="team-td-num">
                        <span className="team-ontime" style={{ color: ontimeColor }}>
                          {member.onTimePct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

