import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'

import Includes from './helpers/Includes.js'
import Navbar from './helpers/Navbar.js'
import Home from './home/Home.js'
import Providers from './settings/Providers.js'
import Locations from './settings/Locations.js'
import History from './session/History.js'
import Session from './session/Session.js'
import Developer from './home/Developer.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Includes />
          <BrowserRouter>
            <Navbar />

            <Route exact path="/" component={Home} />
            <Route exact path="/providers" component={Providers} />
            <Route exact path="/locations" component={Locations} />
            <Route exact path="/history" component={History} />
            <Route exact path="/session" component={Session} />
            <Route exact path="/developer" component={Developer} />
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
