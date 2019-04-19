import React from 'react';
import './Home.css';

class Developer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>
          Developer Info
        </h1>

        <h3 className="subheader">About</h3>
        <p>
          Kevin Kredit wrote this application as a part of GVSU's CIS Web Technologies class. The
          project description is available at GVSU's&nbsp;
          <a href="https://cis.gvsu.edu/~kurmasz/Teaching/Courses/W19/CIS658/project.html">
            website
          </a>.
        </p>

        <h3 className="subheader">Links</h3>
        <p>
          You've already found the frontend app. The code is available&nbsp;
          <a href="https://github.com/kkredit/slp-therapy-tracker">
            <i className="fa fa-github"/> here
          </a>.
          The backend app is hosted&nbsp;
          <a href="/#">
            here
          </a>
          ; the code is available&nbsp;
          <a href="https://github.com/kkredit/slp-therapy-tracker-backend">
            <i className="fa fa-github"/> here
          </a>.
        </p>

        <h3 className="subheader">API</h3>
        <p>
          This application accesses a Ruby on Rails backend via a RESTful API. The API only accepts
          requests from this applications URL, however, so if another party tries to access them
          outside of this application, it will fail. The APIs provided are listed here.
        </p>
        <p>
          The backend is exposes the following API: (TODO fill in detail)
          <ul>
            <li>Providers</li>
            <li>Locations</li>
            <li>Sessions</li>
            <li>Students</li>
            <li>Goals</li>
            <li>Attempts</li>
          </ul>
        </p>

        <h3 className="subheader">Disclaimer</h3>
        <p>
          This app is a class project. There is no authentication. The user is solely responsible
          for all information that is uploaded to this site.
        </p>

      </React.Fragment>
    );
  }
};

export default Developer;
