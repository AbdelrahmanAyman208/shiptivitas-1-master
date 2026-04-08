import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const KPI_DATA = [
    {iconColor:'#ede9fe', iconStroke:'#4f46e5', trend:'up', value:'148', label:'Total Requests', sub:'↑ 16 more than last month', trendLabel:'+12%'},
    {iconColor:'#dbeafe', iconStroke:'#2563eb', trend:'down', value:'32', label:'In Progress', sub:'Avg. 2.4 days per request', trendLabel:'-3%'},
    {iconColor:'#dcfce7', iconStroke:'#16a34a', trend:'up', value:'109', label:'Completed', sub:'73.6% completion rate', trendLabel:'+8%'},
    {iconColor:'#fef3c7', iconStroke:'#b45309', trend:'neu', value:'94.2%', label:'On-Time Rate', sub:'Target: 95% · 7 overdue', trendLabel:'0%'}
  ];

  const recent = [
    {id:'SR-009', title:'Customs clearance batch #12', assignee:'Priya R.', status:'Backlog', statusClass:'s-backlog', priorityClass:'p-high', priority:'High'},
    {id:'SR-004', title:'Investigate delayed parcel #BX-7742', assignee:'Marco O.', status:'Complete', statusClass:'s-complete', priorityClass:'p-high', priority:'High'},
    {id:'SR-006', title:'Q3 cross-dock capacity forecast', assignee:'Sam B.', status:'In Progress', statusClass:'s-progress', priorityClass:'p-low', priority:'Low'},
    {id:'SR-003', title:'FedEx carrier contract renewal', assignee:'Alex K.', status:'Backlog', statusClass:'s-backlog', priorityClass:'p-med', priority:'Medium'},
    {id:'SR-007', title:'Invoice INV-20941 billing discrepancy', assignee:'Dana R.', status:'In Progress', statusClass:'s-progress', priorityClass:'p-med', priority:'Medium'},
  ];

  return (
    <main className="page-wrap">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="page-title">Good morning, Alex <span role="img" aria-label="waving hand">👋</span></h1>
            <p className="page-sub">Here's what's happening across your shipping operations today.</p>
          </div>
          <div className="hero-visual">
            <div className="hero-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" fill="url(#heroGradient)" opacity="0.1"/>
                <path d="M20 24h24v16H20z" fill="url(#heroGradient)" opacity="0.8"/>
                <path d="M16 20h32v4H16z" fill="url(#heroGradient)" opacity="0.6"/>
                <path d="M24 28h16v8H24z" fill="none" stroke="url(#heroGradient)" strokeWidth="2"/>
                <circle cx="28" cy="32" r="2" fill="url(#heroGradient)"/>
                <circle cx="36" cy="32" r="2" fill="url(#heroGradient)"/>
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="date-badge">Thursday, April 2, 2026</div>
      </div>

      <div className="kpi-grid">
        {KPI_DATA.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-top">
              <div className="kpi-icon" style={{background:kpi.iconColor}}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={kpi.iconStroke} strokeWidth="1.5">
                  <circle cx="9" cy="9" r="7" />
                </svg>
              </div>
              <span className={`kpi-trend trend-${kpi.trend}`}>{kpi.trendLabel}</span>
            </div>
            <div className="kpi-val">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-sub">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="main-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Shipment map</span>
            <span style={{fontSize:'11px',color:'#5a5870',fontWeight:500}}>Live route overview</span>
          </div>
          <div className="map-placeholder">
            <div className="map-grid"></div>
            <svg className="map-routes" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.7"/>
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.7"/>
                </linearGradient>
              </defs>
              <path d="M18 58 Q35 38 48 62" stroke="url(#routeGradient)" strokeWidth="2.5" fill="none" strokeDasharray="4,2"/>
              <path d="M48 62 Q60 72 75 56" stroke="url(#routeGradient)" strokeWidth="2.5" fill="none" strokeDasharray="4,2"/>
              <path d="M18 58 Q25 40 32 25" stroke="url(#routeGradient)" strokeWidth="2.5" fill="none" strokeDasharray="4,2"/>
              <path d="M32 25 Q42 18 58 20" stroke="url(#routeGradient)" strokeWidth="2.5" fill="none" strokeDasharray="4,2"/>
              <path d="M58 20 Q70 25 85 30" stroke="url(#routeGradient)" strokeWidth="2.5" fill="none" strokeDasharray="4,2"/>
            </svg>
            <div className="map-dot" style={{left:'18%',top:'57%',background:'#4f46e5'}}></div>
            <div className="map-label" style={{left:'18%',top:'62%'}}>New York</div>
            <div className="map-dot" style={{left:'48%',top:'62%',background:'#3b82f6'}}></div>
            <div className="map-label" style={{left:'48%',top:'67%'}}>London</div>
            <div className="map-dot" style={{left:'85%',top:'30%',background:'#22c55e'}}></div>
            <div className="map-label" style={{left:'85%',top:'35%'}}>Dubai</div>
            <div className="map-dot" style={{left:'32%',top:'25%',background:'#f97316'}}></div>
            <div className="map-label" style={{left:'32%',top:'20%'}}>São Paulo</div>
            <div className="map-dot" style={{left:'58%',top:'20%',background:'#a855f7'}}></div>
            <div className="map-label" style={{left:'58%',top:'15%'}}>Singapore</div>
            <div className="map-stats">
              <div className="map-stat-item">
                <div className="stat-number">24</div>
                <div className="stat-label">Active routes</div>
              </div>
              <div className="map-stat-item">
                <div className="stat-number">156</div>
                <div className="stat-label">Shipments today</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Activity feed</span>
            <button type="button" className="card-action">View all</button>
          </div>
          <div className="feed-list">
            <div className="feed-item">
              <div className="feed-icon" style={{background:'#dcfce7'}}><span>✓</span></div>
              <div className="feed-text">SR-004 marked complete by Marco O.<div className="feed-time">2 minutes ago</div></div>
            </div>
            <div className="feed-item">
              <div className="feed-icon" style={{background:'#dbeafe'}}><span>+</span></div>
              <div className="feed-text">SR-009 created by Priya R. — Customs clearance batch #12<div className="feed-time">18 minutes ago</div></div>
            </div>
            <div className="feed-item">
              <div className="feed-icon" style={{background:'#fef3c7'}}><span>⏱</span></div>
              <div className="feed-text">SR-002 flagged as overdue — customs clearance delayed<div className="feed-time">1 hour ago</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent requests</span>
            <button type="button" className="card-action">View board →</button>
          </div>
          <div className="req-table-wrap">
            <table className="req-table">
              <thead>
                <tr><th>ID</th><th>Title</th><th>Assignee</th><th>Status</th><th>Priority</th></tr>
              </thead>
              <tbody>
                {recent.map(row => (
                  <tr key={row.id}>
                    <td className="id-mono">{row.id}</td>
                    <td>{row.title}</td>
                    <td>{row.assignee}</td>
                    <td><span className={`status-pill ${row.statusClass}`}>{row.status}</span></td>
                    <td><span className={`priority-dot ${row.priorityClass}`}></span>{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Team workload</span>
            <button type="button" className="card-action">Details →</button>
          </div>
          <div className="card-body">
            <div className="team-row"><div className="team-info"><div className="team-av" style={{background:'#e0e7ff',color:'#3730a3'}}>JL</div><div><div className="team-name">Jamie L.</div><div className="team-role">Logistics Lead</div></div></div><div className="team-stat"><div className="team-count">17</div><div className="team-pct">tasks</div></div></div>
            <div className="team-row"><div className="team-info"><div className="team-av" style={{background:'#fce7f3',color:'#9d174d'}}>PR</div><div><div className="team-name">Priya R.</div><div className="team-role">Customs Specialist</div></div></div><div className="team-stat"><div className="team-count">12</div><div className="team-pct">tasks</div></div></div>
            <div className="team-row"><div className="team-info"><div className="team-av" style={{background:'#ede9fe',color:'#4f46e5'}}>AK</div><div><div className="team-name">Alex K.</div><div className="team-role">Operations Mgr</div></div></div><div className="team-stat"><div className="team-count">9</div><div className="team-pct">tasks</div></div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
