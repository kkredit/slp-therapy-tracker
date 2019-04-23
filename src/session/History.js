import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import NotificationAlert from '../helpers/NotificationAlert.js'

import './History.css'

const API_BASE = 'http://localhost:8000';

const SessionRow = (props) => {
  const dateTime = new Date(props.sessionData.time);
  return (
    <tr className="historyRow">
      <td className="col-md-1"/>
      <td className="col-md-2">{dateTime.toLocaleDateString()}</td>
      <td className="col-md-2">{dateTime.toLocaleTimeString()}</td>
      <td className="col-md-2">{props.sessionData.provider ? props.sessionData.provider.username : "NA"}</td>
      <td className="col-md-2">{props.sessionData.location ? props.sessionData.location.name : "NA"}</td>
      <td className="col-md-3">
        <ButtonGroup aria-label="CRUD buttons">
          <Button variant="primary" size="sm" onClick={event => props.onView(props.sessionData.id)}>
            <i className="fa fa-eye"/> View
          </Button>
          <Button variant="danger" size="sm" onClick={event => props.onDelete(props.sessionData.id)}>
            <i className="fa fa-trash"/> Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

const SessionList = (props) => {
  const sessionRows = props.db.sessions.map((session) => {
    let sessionData = props.db.buildSessionData(session);
    return (
      <SessionRow sessionData={sessionData}
                  key={session.id}
                  onView={props.onView}
                  onDelete={props.onDelete} />
    )
  });

  return (
    <div className="history-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-1"/>
            <th className="col-md-2">Date</th>
            <th className="col-md-2">Time</th>
            <th className="col-md-2">Provider</th>
            <th className="col-md-2">Location</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessionRows}
        </tbody>
      </table>
    </div>
  );
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: props.db,
      alertActive: false,
      alertVariant: '',
      alertText: ''
    };
    this.setAlert = this.setAlert.bind(this);
    this.setAlertError = this.setAlertError.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.viewHistory = this.viewHistory.bind(this);
    this.removeHistory = this.removeHistory.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      db: props.db
    };
  }

  render() {
    return (
      <div className="history">
        <h1> Session History </h1>
        <NotificationAlert active={this.state.alertActive}
                           variant={this.state.alertVariant}
                           text={this.state.alertText} />
        <SessionList db={this.state.db}
                     onView={(id) => this.viewHistory(id)}
                     onDelete={(id) => this.removeHistory(id)} />
      </div>
    );
  }

  setAlert(variant, text) {
    this.setState({
      alertActive: true,
      alertVariant: '' + variant,
      alertText: text
    });
  }

  setAlertError(err, text) {
    this.setAlert('danger',
                  <React.Fragment>
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"/><br />
                    {err.message}: {err.response.statusText}<br />
                    {text}
                  </React.Fragment>
                  );
  }

  clearAlert() {
    this.setState({
      alertActive: false,
      alertVariant: '',
      alertText: ''
    });
  }

  viewHistory(id) {
    let viewSession = this.state.sessions.filter(session => session.id === id)[0];
    console.log("trying to view history item ID: " + id + ", or " + viewSession.id);
    console.log(viewSession);
  }

  removeHistory(id) {
    let filteredArray = this.state.sessions.filter(item => item.id !== id);
    this.setState({sessions: filteredArray});
    axios
      .delete(`${API_BASE}/sessions/${id}.json`)
      .then(res => {
              console.log(`Record Deleted`);
              this.clearAlert();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not remove session.");
             });
  }
};

export default History;
