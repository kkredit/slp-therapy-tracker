import React from 'react';
import Nav from 'react-bootstrap/Nav'
import './Navbar.css';

class Navbar extends React.Component {
  handleSelect(eventKey) {
    // event.preventDefault();
    alert(`selected ${eventKey}`);
  }

  render() {
    return (
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/history">History</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/session">Session</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
};

export default Navbar;
