import React from 'react';
import Button from 'react-bootstrap/Button'

import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>SLP Therapy Tracker</h1>

        <Button id="mainButton" variant="primary" size="lg" href="/session">
          Start a session <i className="fa fa-arrow-circle-o-right"/>
        </Button>

        <p>
          This app is designed to ease data collection for Speech and Language Pathologists. Made
          with &lt;3 for Kristen.
        </p>

        <h3>Setup</h3>
        <ol>
          <li>Enter your data in the "Providers" form</li>
          <li>Enter service location names in the "Locations" form</li>
          <li>Enter session data in the "Session" page</li>
          <li>View historical session data in the "History" page</li>
        </ol>

        <Button className="navButton" variant="outline-primary" href="/providers">
          Update Providers <i className="fa fa-arrow-circle-right"/>
        </Button>
        <Button className="navButton" variant="outline-primary" href="/locations">
          Update Locations <i className="fa fa-arrow-circle-right"/>
        </Button>
      </React.Fragment>
    );
  }
};

export default Home;
