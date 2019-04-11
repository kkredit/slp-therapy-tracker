import React from 'react';
import Button from 'react-bootstrap/Button'

import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>SLP Therapy Tracker</h1>

        <p>
          This app is designed to ease data collection for Speech and Language Pathologists. Made
          with &lt;3 for Kristen.
        </p>

        <Button className="navButton" href="#">Start a session <i className="fas fa-angle-right"/></Button>

        <h3>Setup</h3>
        <ol>
          <li>Enter your data in the "Providers" form</li>
          <li>Enter service location names in the "Locations" form</li>
          <li>Enter session data in the "Session" page</li>
          <li>View historical session data in the "History" page</li>
        </ol>

        <Button className="navButton" variant="outline-primary" href="#">Update Providers</Button>
        <Button className="navButton" variant="outline-primary" href="#">Update Locations</Button>
      </React.Fragment>
    );
  }
};

export default Home;
