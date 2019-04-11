import React from 'react';
import Nav from 'react-bootstrap/Nav'
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: window.location.pathname
    };
  }

  handleSelect(eventKey) {
    this.setState({activeTab: eventKey});
  }

  render() {
    return (
      <Nav className="Navbar" variant="pills" activeKey={this.state.activeTab} onSelect={k => this.handleSelect(k)}>
        <Nav.Item>
          <Nav.Link eventKey="/" href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/history" href="/history">History</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/session" href="/session">Session</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
};

export default Navbar;
