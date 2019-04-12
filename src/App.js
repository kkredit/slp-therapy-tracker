import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'

import Includes from './Includes.js'
import Navbar from './Navbar.js'
import Home from './Home.js'
import Providers from './Providers.js'
import Locations from './Locations.js'
import History from './History.js'
import Session from './Session.js'

// import logo from './logo.svg';
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
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
