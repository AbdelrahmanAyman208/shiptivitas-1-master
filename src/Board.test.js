import Board from './Board';
import { BOARD_STORAGE_KEY, createDefaultBoardState } from './boardStorage';

function createBoardInstance() {
  const board = new Board({});
  board.setState = (updater) => {
    const nextPartial = typeof updater === 'function'
      ? updater(board.state, board.props)
      : updater;
    board.state = { ...board.state, ...nextPartial };
  };
  return board;
}

describe('board storage defaults', () => {
  it('starts with all default tasks in backlog lane', () => {
    const initial = createDefaultBoardState();
    expect(initial.clients.backlog.length).toBeGreaterThan(0);
    expect(initial.clients.inProgress).toHaveLength(0);
    expect(initial.clients.complete).toHaveLength(0);
    initial.clients.backlog.forEach((task) => {
      expect(task.status).toBe('backlog');
    });
  });
});

describe('shipping requests lane behavior', () => {
  beforeEach(() => {
    localStorage.removeItem(BOARD_STORAGE_KEY);
  });

  it('moves a card to a new swimlane and updates status', () => {
    const board = createBoardInstance();
    const movingId = board.state.clients.backlog[0].id;

    board.moveClient(movingId, 'backlog', 'inProgress');

    expect(board.state.clients.backlog.some((c) => c.id === movingId)).toBe(false);
    const moved = board.state.clients.inProgress.find((c) => c.id === movingId);
    expect(moved).toBeTruthy();
    expect(moved.status).toBe('in-progress');
  });

  it('reorders cards vertically inside the same swimlane', () => {
    const board = createBoardInstance();
    const [first, second, third] = board.state.clients.backlog;

    board.reorderClient(first.id, 'backlog', {
      getAttribute: (name) => (name === 'data-id' ? third.id : ''),
    });

    expect(board.state.clients.backlog[0].id).toBe(second.id);
    expect(board.state.clients.backlog[1].id).toBe(first.id);
    expect(board.state.clients.backlog[2].id).toBe(third.id);
  });
});
