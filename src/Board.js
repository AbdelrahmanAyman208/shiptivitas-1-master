import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Card from './Card';
import NewRequestModal from './NewRequestModal';
import { loadBoardState, saveBoardState, createDefaultBoardState } from './boardStorage';
import './Board.css';
import './Board-modern.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const persisted = loadBoardState();
    const base = persisted || createDefaultBoardState();
    this.state = {
      clients: base.clients,
      nextRequestNum: base.nextRequestNum,
      newRequestOpen: false,
      search: '',
      filterTag: '',
      filterPriority: '',
      activeFilter: 'all',
      toasts: [],
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }
  componentDidMount() {
    this.dragula = Dragula(
      [
        this.swimlanes.backlog.current,
        this.swimlanes.inProgress.current,
        this.swimlanes.complete.current,
      ],
      {
        direction: 'vertical',
        mirrorContainer: document.body,
        revertOnSpill: false,
      }
    );

    this.dragula.on('drag', (el) => {
      el.classList.add('Card--dragging');
      document.body.classList.add('board-dnd-active');
    });

    this.dragula.on('dragend', (el) => {
      el.classList.remove('Card--dragging');
      document.body.classList.remove('board-dnd-active');
      document.querySelectorAll('.swimlane-cards--drop-target').forEach((node) => {
        node.classList.remove('swimlane-cards--drop-target');
      });
      document.querySelectorAll('.Swimlane-column--drop-active').forEach((node) => {
        node.classList.remove('Swimlane-column--drop-active');
      });
    });

    this.dragula.on('over', (el, container) => {
      if (!container) return;
      container.classList.add('swimlane-cards--drop-target');
      const col = container.closest('.Swimlane-column');
      if (col) col.classList.add('Swimlane-column--drop-active');
    });

    this.dragula.on('out', (el, container) => {
      if (!container) return;
      container.classList.remove('swimlane-cards--drop-target');
      const col = container.closest('.Swimlane-column');
      if (col) col.classList.remove('Swimlane-column--drop-active');
    });

    this.dragula.on('drop', (el, target, source, sibling) => {
      const sourceLane = this.getLaneFromRef(source);
      const targetLane = this.getLaneFromRef(target);
      const clientId = el.getAttribute('data-id');

      if (sourceLane !== targetLane) {
        // Move to new lane
        this.moveClient(clientId, sourceLane, targetLane);
      } else {
        // Reorder within lane
        this.reorderClient(clientId, targetLane, sibling);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.clients !== this.state.clients ||
      prevState.nextRequestNum !== this.state.nextRequestNum
    ) {
      saveBoardState(this.state.clients, this.state.nextRequestNum);
    }
  }

  componentWillUnmount() {
    if (this.dragula) {
      this.dragula.destroy();
    }
    document.body.classList.remove('board-dnd-active');
    document.querySelectorAll('.swimlane-cards--drop-target').forEach((node) => {
      node.classList.remove('swimlane-cards--drop-target');
    });
    document.querySelectorAll('.Swimlane-column--drop-active').forEach((node) => {
      node.classList.remove('Swimlane-column--drop-active');
    });
  }

  getLaneFromRef(ref) {
    if (ref === this.swimlanes.backlog.current) return 'backlog';
    if (ref === this.swimlanes.inProgress.current) return 'inProgress';
    if (ref === this.swimlanes.complete.current) return 'complete';
  }

  moveClient(clientId, fromLane, toLane) {
    const client = this.state.clients[fromLane].find(c => c.id === clientId);
    if (!client) return;

    const updatedClient = { ...client, status: toLane === 'inProgress' ? 'in-progress' : toLane === 'complete' ? 'complete' : 'backlog' };

    this.setState(prevState => {
      const newState = {
        ...prevState.clients,
        [fromLane]: prevState.clients[fromLane].filter(c => c.id !== clientId),
        [toLane]: [...prevState.clients[toLane], updatedClient],
      };
      const colNames = { backlog: 'Backlog', inProgress: 'In Progress', complete: 'Complete' };
      const colColors = { backlog: '#9896ab', inProgress: '#3b82f6', complete: '#22c55e' };
      const toast = { id: `${clientId}-${Date.now()}`, msg: `${clientId} moved to ${colNames[toLane]}`, color: colColors[toLane] };
      return {
        clients: newState,
        toasts: [...prevState.toasts, toast],
      };
    });
  }

  reorderClient(clientId, lane, sibling) {
    const clients = [...this.state.clients[lane]];
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex === -1) return;

    const [client] = clients.splice(clientIndex, 1);
    let insertIndex = 0;
    if (sibling) {
      insertIndex = clients.findIndex(c => c.id === sibling.getAttribute('data-id'));
    } else {
      insertIndex = clients.length;
    }
    clients.splice(insertIndex, 0, client);

    this.setState(prevState => ({
      clients: {
        ...prevState.clients,
        [lane]: clients,
      }
    }));
  }
  submitNewRequest = (fields) => {
    const num = this.state.nextRequestNum;
    const id = `SR-${String(num).padStart(3, '0')}`;
    const newClient = {
      id,
      title: fields.title,
      tag: fields.tag,
      assignee: fields.assignee,
      priority: fields.priority,
      due: fields.due,
      status: 'backlog',
    };
    this.setState((prev) => ({
      clients: {
        ...prev.clients,
        backlog: [...prev.clients.backlog, newClient],
      },
      nextRequestNum: prev.nextRequestNum + 1,
      newRequestOpen: false,
    }));
    this.showToast(`${id} added to backlog`, '#4f46e5');
  };

  closeNewRequest = () => {
    this.setState({ newRequestOpen: false });
  };
  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  handleFilterTag = (e) => {
    this.setState({ filterTag: e.target.value });
  }

  handleFilterPriority = (e) => {
    this.setState({ filterPriority: e.target.value });
  }

  setFilter = (val) => {
    this.setState({ activeFilter: val });
  }

  openNew = () => {
    this.setState({ newRequestOpen: true });
  };

  showToast = (msg, color) => {
    const toast = { id: Date.now(), msg, color };
    this.setState(prevState => ({
      toasts: [...prevState.toasts, toast],
    }));
    setTimeout(() => {
      this.setState(prevState => ({
        toasts: prevState.toasts.filter(t => t.id !== toast.id),
      }));
    }, 2600);
  }

  render() {
    const { clients, search, filterTag, filterPriority, activeFilter, toasts, newRequestOpen } = this.state;
    const { backlog, inProgress, complete } = clients;
    const allClients = [...backlog, ...inProgress, ...complete];
    const total = Math.max(allClients.length, 1);
    const prog = inProgress.length;
    const done = complete.length;
    const filteredClients = allClients.filter(client => {
      const matchesSearch = !search || client.title.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !filterTag || client.tag === filterTag;
      const matchesPriority = !filterPriority || client.priority === filterPriority;
      const matchesFilter = activeFilter !== 'mine' || client.assignee === 'AK';
      return matchesSearch && matchesTag && matchesPriority && matchesFilter;
    });

    const backlogFiltered = filteredClients.filter(c => c.status === 'backlog');
    const inProgressFiltered = filteredClients.filter(c => c.status === 'in-progress');
    const completeFiltered = filteredClients.filter(c => c.status === 'complete');

    return (
      <div className="Board board--modern">
        <div className="summary-strip">
          <div className="stat-block">
            <span className="stat-label">Total Requests</span>
            <span className="stat-value">{allClients.length}</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">In Progress</span>
            <span className="stat-value blue">{prog}</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">Completed</span>
            <span className="stat-value green">{done}</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-label">Overall completion</div>
            <div className="progress-track">
              <div className="progress-seg seg-prog" style={{ width: `${(prog / total) * 100}%` }}></div>
              <div className="progress-seg seg-done" style={{ width: `${(done / total) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="toolbar">
          <div className="toolbar-header">
            <div className="toolbar-title">
              <span>Filter & search</span>
            </div>
          </div>

          <div className="toolbar-controls">
            <div className="search-wrap">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5l2.5 2.5" strokeLinecap="round" />
              </svg>
              <input className="search-input" type="text" placeholder="Search requests…" value={search} onChange={this.handleSearch} />
            </div>
            <select className="filter-select" value={filterTag} onChange={this.handleFilterTag}>
              <option value="">All categories</option>
              <option>Warehouse</option>
              <option>Customs</option>
              <option>Carrier</option>
              <option>Ops</option>
              <option>Packaging</option>
              <option>Planning</option>
              <option>Finance</option>
            </select>
            <select className="filter-select" value={filterPriority} onChange={this.handleFilterPriority}>
              <option value="">All priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => this.setFilter('all')}>All tasks</button>
            <button className={`chip ${activeFilter === 'mine' ? 'active' : ''}`} onClick={() => this.setFilter('mine')}>My tasks</button>
            <button className="btn-primary" onClick={this.openNew}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M7 1v12M1 7h12" />
              </svg>
              New Request
            </button>
          </div>
        </div>

        <div className="board">
          <div className="Swimlane-column backlog">
            <div className="col-header">
              <span className="col-dot"></span>
              <span className="col-title">Backlog</span>
              <span className="col-badge">{backlogFiltered.length}</span>
              <button type="button" className="col-add" title="Add to backlog" onClick={this.openNew}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 2v8M2 6h8" />
                </svg>
              </button>
            </div>
            <div className="swimlane-cards" ref={this.swimlanes.backlog}>
              {backlogFiltered.map(client => <Card key={client.id} client={client} />)}
            </div>
          </div>

          <div className="Swimlane-column in-progress">
            <div className="col-header">
              <span className="col-dot"></span>
              <span className="col-title">In Progress</span>
              <span className="col-badge">{inProgressFiltered.length}</span>
              <button type="button" className="col-add" title="Add to in progress" onClick={this.openNew}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 2v8M2 6h8" />
                </svg>
              </button>
            </div>
            <div className="swimlane-cards" ref={this.swimlanes.inProgress}>
              {inProgressFiltered.map(client => <Card key={client.id} client={client} />)}
            </div>
          </div>

          <div className="Swimlane-column complete">
            <div className="col-header">
              <span className="col-dot"></span>
              <span className="col-title">Complete</span>
              <span className="col-badge">{completeFiltered.length}</span>
              <button type="button" className="col-add" title="Add to complete" onClick={this.openNew}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 2v8M2 6h8" />
                </svg>
              </button>
            </div>
            <div className="swimlane-cards" ref={this.swimlanes.complete}>
              {completeFiltered.map(client => <Card key={client.id} client={client} />)}
            </div>
          </div>
        </div>

        <div id="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className="toast">
              <span className="toast-dot" style={{ background: toast.color }}></span>
              {toast.msg}
            </div>
          ))}
        </div>

        <NewRequestModal
          open={newRequestOpen}
          onClose={this.closeNewRequest}
          onSubmit={this.submitNewRequest}
        />
      </div>
    );
  }
}

  