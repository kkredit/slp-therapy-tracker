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
          Kevin Kredit wrote this application as a part of GVSU's CIS Web Architectures class. The
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
          <a href="https://slpttb.herokuapp.com/">
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
          The backend is exposes the following API. All data is accessible as JSON and XML. Crude
          HTML pages may exist, but are not officially supported.
        </p>
        <ul>
          <li><b>/providers :</b> Create, read, update, and delete provider first and last names, usernames, and emails.</li>
          <li><b>/locations :</b> Create, read, update, and delete location names.</li>
          <li><b>/sessions :</b> Create, read, update, and delete session times and their associated providers and locations.</li>
          <li><b>/students :</b> Create, read, update, and delete student numbers and their associated sessions.</li>
          <li><b>/goals :</b> Create, read, update, and delete goal numbers and their associated students.</li>
          <li><b>/attempts :</b> Create, read, update, and delete attempt performances and their associated goals.</li>
        </ul>

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
