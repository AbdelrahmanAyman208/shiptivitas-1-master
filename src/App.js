import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './Dashboard';
import Navigation from './Navigation';
import Board from './Board';
import Analytics from './Analytics';
import Settings from './Settings';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'dashboard',
    };
  }
  renderShippingRequests() {
    return (<Board />);
  }

  renderAnalytics() {
    return (<Analytics />);
  }

  renderSettings() {
    return (<Settings />);
  }

  renderNavigation() {
    return (<Navigation
      onClick={(tabName) => this.changeTab(tabName)}
      selectedTab={this.state.selectedTab}
      />);
  }

  renderTabContent() {
    switch(this.state.selectedTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'shipping-requests':
        return this.renderShippingRequests();
      case 'analytics':
        return this.renderAnalytics();
      case 'settings':
        return this.renderSettings();
      default:
        return <Dashboard />;
    }
  }
  render() {
    return (
      <div className="App">
        {this.renderNavigation()}

        <div className="App-body">
          {this.renderTabContent()}
        </div>
      </div>
    );
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
}

export default App;
