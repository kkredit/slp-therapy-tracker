import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'

import Includes from './helpers/Includes.js'
import Database from './helpers/Database.js'
import Navbar from './helpers/Navbar.js'
import Home from './home/Home.js'
import Providers from './settings/Providers.js'
import Locations from './settings/Locations.js'
import History from './session/History.js'
import Session from './session/Session.js'
import Developer from './home/Developer.js'
import './App.css';
import logo from './logo.svg';

const API_BASE = 'http://localhost:8000';

class App extends Component {

  constructor(props) {
    super(props);

    this.dbUpdatedCb = this.dbUpdatedCb.bind(this);
    this.dbInitialLoadCb = this.dbInitialLoadCb.bind(this);

    this.state = {
      db: new Database({
        apiBase: API_BASE,
        initialLoadCb: this.dbInitialLoadCb,
        updatedCb: this.dbUpdatedCb,
      }),
      dbLoaded: false,
      dbHasUpdate: false,
    };
  }

  dbUpdatedCb() {
    this.setState({dbHasUpdate: true});
  }

  dbInitialLoadCb() {
    this.setState({dbLoaded: true});
  }

  componentDidMount() {
    console.log("app mounted");
    this.state.db.loadAll();
  }

  render() {
    if (!this.state.dbLoaded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Loading...
            </p>
          </header>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Container>
            <Includes />
            <BrowserRouter>
              <Navbar />

              <Route exact path="/" component={Home} />
              <Route exact path="/providers" render={(props) => <Providers db={this.state.db} {...props} />} />
              <Route exact path="/locations" render={(props) => <Locations db={this.state.db} {...props} />} />
              <Route exact path="/history" render={(props) => <History db={this.state.db} {...props} />} />
              <Route exact path="/session" render={(props) => <Session db={this.state.db} {...props} />} />
              <Route exact path="/developer" component={Developer} />
            </BrowserRouter>
          </Container>
        </div>
      );
    }
  }
}

export default App;
