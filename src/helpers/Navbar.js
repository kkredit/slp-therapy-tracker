import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: window.location.pathname
    };
  }

  // handleSelect(eventKey) {
  //   this.setState({activeTab: eventKey});
  // }

  render() {
    return (
      <Nav className="Navbar" variant="pills" activeKey={this.state.activeTab}>
        <Nav.Item>
          <NavLink className="nav-link" exact to="/">Home</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" exact to="/history">History</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className="nav-link" exact to="/session">Session</NavLink>
        </Nav.Item>
      </Nav>
    );
  }
};

export default Navbar;
