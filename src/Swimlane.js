import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          client={client}
          status={client.status}
        />
      );
    })
    return (
      <div className={`Swimlane-column ${this.props.className}`}>
        <div className="col-header">
          <span className="col-dot"></span>
          <span className="col-title">{this.props.name}</span>
          <span className="col-badge">{this.props.clients.length}</span>
          <button className="col-add" title={`Add to ${this.props.name.toLowerCase()}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 2v8M2 6h8" />
            </svg>
          </button>
        </div>
        <div className="swimlane-cards" ref={this.props.dragulaRef}>
          {cards}
        </div>
      </div>);
  }

}
