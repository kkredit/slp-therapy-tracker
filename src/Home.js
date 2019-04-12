import React from 'react';
import { Link } from 'react-router-dom'

import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>SLP Therapy Tracker</h1>

        <Link id="mainButton" className="btn btn-primary btn-lg" to="/session">
          Start a session <i className="fa fa-arrow-circle-o-right"/>
        </Link>

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

        <Link className="navButton btn btn-outline-primary" to="/providers">
          Update Providers <i className="fa fa-arrow-circle-right"/>
        </Link>
        <Link className="navButton btn btn-outline-primary" to="/locations">
          Update Locations <i className="fa fa-arrow-circle-right"/>
        </Link>
      </React.Fragment>
    );
  }
};

export default Home;
