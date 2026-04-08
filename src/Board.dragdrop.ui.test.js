import React from 'react';
import ReactDOM from 'react-dom';
import { BOARD_STORAGE_KEY } from './boardStorage';

let mockHandlers;
let mockDragulaApi;

jest.mock('dragula', () => (
  jest.fn(() => {
    mockHandlers = {};
    mockDragulaApi = {
      on: jest.fn((event, cb) => {
        mockHandlers[event] = cb;
        return mockDragulaApi;
      }),
      destroy: jest.fn(),
    };
    return mockDragulaApi;
  })
));

import Board from './Board';

describe('board UI drag/drop interactions', () => {
  let div;

  beforeEach(() => {
    localStorage.removeItem(BOARD_STORAGE_KEY);
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      div = null;
    }
    document.body.classList.remove('board-dnd-active');
  });

  it('moves a rendered card to a new lane and updates card color class', () => {
    ReactDOM.render(<Board />, div);

    const lanes = div.querySelectorAll('.swimlane-cards');
    const backlogLane = lanes[0];
    const inProgressLane = lanes[1];
    const card = backlogLane.querySelector('.Card');
    const cardId = card.getAttribute('data-id');

    mockHandlers.drop(card, inProgressLane, backlogLane, null);

    const movedCard = inProgressLane.querySelector(`[data-id="${cardId}"]`);
    expect(movedCard).toBeTruthy();
    expect(movedCard.className).toContain('Card-blue');
    expect(backlogLane.querySelector(`[data-id="${cardId}"]`)).toBeFalsy();
  });

  it('reorders rendered cards within the same lane when dropped with sibling', () => {
    ReactDOM.render(<Board />, div);

    const backlogLane = div.querySelectorAll('.swimlane-cards')[0];
    const cards = backlogLane.querySelectorAll('.Card');
    const movingCard = cards[0];
    const siblingCard = cards[2];
    const movingId = movingCard.getAttribute('data-id');

    mockHandlers.drop(movingCard, backlogLane, backlogLane, siblingCard);

    const reorderedIds = Array.from(backlogLane.querySelectorAll('.Card')).map((node) => node.getAttribute('data-id'));
    expect(reorderedIds[1]).toBe(movingId);
  });
});
