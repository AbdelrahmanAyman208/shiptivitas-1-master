export const BOARD_STORAGE_KEY = 'shiptivitas-board-v1';

export const DEFAULT_CLIENT_ROWS = [
  { id: 'SR-001', title: 'Expedite warehouse stock replenishment for Region 4', tag: 'Warehouse', assignee: 'JL', priority: 'High', due: '2025-04-03', status: 'backlog' },
  { id: 'SR-002', title: 'Coordinate customs clearance for inbound EU shipment', tag: 'Customs', assignee: 'PR', priority: 'High', due: '2025-04-05', status: 'backlog' },
  { id: 'SR-003', title: 'Review carrier contract renewal with FedEx freight', tag: 'Carrier', assignee: 'AK', priority: 'Medium', due: '2025-04-12', status: 'backlog' },
  { id: 'SR-004', title: 'Investigate delayed parcel batch #BX-7742', tag: 'Ops', assignee: 'MO', priority: 'High', due: '2025-04-02', status: 'backlog' },
  { id: 'SR-005', title: 'Update cold-chain packaging spec for pharma tier', tag: 'Packaging', assignee: 'TN', priority: 'Medium', due: '2025-04-18', status: 'backlog' },
  { id: 'SR-006', title: 'Prepare Q3 cross-dock capacity forecast report', tag: 'Planning', assignee: 'SB', priority: 'Low', due: '2025-04-25', status: 'backlog' },
  { id: 'SR-007', title: 'Resolve billing discrepancy on invoice INV-20941', tag: 'Finance', assignee: 'DR', priority: 'Medium', due: '2025-04-08', status: 'backlog' },
  { id: 'SR-008', title: 'Onboard new last-mile delivery partner for Southeast region', tag: 'Carrier', assignee: 'JL', priority: 'Low', due: '2025-04-30', status: 'backlog' },
];

function inferNextRequestNum(clients) {
  let max = 0;
  [...clients.backlog, ...clients.inProgress, ...clients.complete].forEach((c) => {
    if (c && typeof c.id === 'string') {
      const m = /^SR-(\d+)$/i.exec(c.id.trim());
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
  });
  return max + 1;
}

export function createDefaultBoardState() {
  return {
    clients: {
      backlog: DEFAULT_CLIENT_ROWS.map((c) => ({ ...c, status: 'backlog' })),
      inProgress: [],
      complete: [],
    },
    nextRequestNum: 9,
  };
}

function normalizeClient(c, laneStatus) {
  if (!c || typeof c !== 'object') return null;
  const id = String(c.id || '').trim();
  const title = String(c.title || '').trim();
  if (!id || !title) return null;
  return {
    id,
    title,
    tag: c.tag || 'Ops',
    assignee: c.assignee || 'AK',
    priority: ['High', 'Medium', 'Low'].includes(c.priority) ? c.priority : 'Medium',
    due: c.due || new Date().toISOString().slice(0, 10),
    status: laneStatus,
  };
}

export function loadBoardState() {
  try {
    const raw = localStorage.getItem(BOARD_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !data.clients) return null;
    const src = data.clients;
    const backlog = (Array.isArray(src.backlog) ? src.backlog : [])
      .map((c) => normalizeClient(c, 'backlog'))
      .filter(Boolean);
    const inProgress = (Array.isArray(src.inProgress) ? src.inProgress : [])
      .map((c) => normalizeClient(c, 'in-progress'))
      .filter(Boolean);
    const complete = (Array.isArray(src.complete) ? src.complete : [])
      .map((c) => normalizeClient(c, 'complete'))
      .filter(Boolean);
    if (backlog.length + inProgress.length + complete.length === 0) return null;

    let nextRequestNum = data.nextRequestNum;
    if (typeof nextRequestNum !== 'number' || nextRequestNum < 1) {
      nextRequestNum = inferNextRequestNum({ backlog, inProgress, complete });
    }
    return {
      clients: { backlog, inProgress, complete },
      nextRequestNum,
    };
  } catch (e) {
    return null;
  }
}

export function saveBoardState(clients, nextRequestNum) {
  try {
    localStorage.setItem(
      BOARD_STORAGE_KEY,
      JSON.stringify({
        v: 1,
        clients,
        nextRequestNum,
      })
    );
  } catch (e) {
    /* quota / private mode */
  }
}
