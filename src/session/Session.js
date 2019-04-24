import React from 'react'
import './Session.css'
import NotificationAlert from '../helpers/NotificationAlert.js'
import SessionSetup from './SessionSetup.js'
import DataEntry from './DataEntry.js'
import { ATTEMPT_SUCC, ATTEMPT_CUED, ATTEMPT_FAIL } from './Student.js'

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: props.db,
      alertActive: false,
      alertVariant: '',
      alertText: '',
      provider: null,
      location: null,
      inSetup: true,
      students: []
    };
    this.startCallback = this.startCallback.bind(this);
    this.endCallback = this.endCallback.bind(this);
    this.submitSession = this.submitSession.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.setAlertError = this.setAlertError.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      db: props.db
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1> Record a Session </h1>
        <NotificationAlert active={this.state.alertActive}
                           variant={this.state.alertVariant}
                           text={this.state.alertText} />
        <SessionSetup active={this.state.inSetup}
                      startCallback={this.startCallback}
                      providers={this.state.db.providers}
                      locations={this.state.db.locations} />
        <DataEntry active={!this.state.inSetup}
                   students={this.state.students}
                   provider={this.state.provider}
                   location={this.state.location}
                   endCallback={this.endCallback} />
      </React.Fragment>
    );
  }

  startCallback(startStudents, startProvider, startLocation) {
    this.setState({
      students: startStudents,
      provider: startProvider,
      location: startLocation,
      inSetup: false
    });
  }

  endCallback(endProvider, endLocation, endStudents) {
    this.setState({
      provider: endProvider,
      location: endLocation,
      students: endStudents,
      inSetup: true
    });
    console.log("session ended; students = ");
    console.log(endStudents);
    console.log("student 0 goal 0 attempts:");
    const attempts = endStudents[0].goals[0].attempts;
    const succ = attempts.filter(function(a){return a === ATTEMPT_SUCC}).length;
    const cued = attempts.filter(function(a){return a === ATTEMPT_CUED}).length;
    const fail = attempts.filter(function(a){return a === ATTEMPT_FAIL}).length;
    console.log("success: " + succ + ", cued: " + cued + ", fail: " + fail);
    console.log("provider ID = " + endProvider.id + ", location ID = " + endLocation.id);

    this.submitSession(endProvider, endLocation, endStudents);
  }

  submitSession(endProvider, endLocation, endStudents) {
    // const newSession = {
    //   time: new Date(),
    //   provider_id: endProvider.id,
    //   location_id: endLocation.id,
    //   students: endStudents
    // };
    this.state.db.postSession(endLocation, endProvider, endStudents,
                              Function.prototype, Function.prototype);

    // axios
    //   .post(`${API_BASE}/sessions.json`, newSession)
    //   .then(res => {
    //           res.data.key = res.data.id;
    //           console.log("Session submitted!");
    //         })
    //   .catch(err => {
    //            console.log(err);
    //            this.setAlertError(err, "Could not submit the session.");
    //          });
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
                    {err.message}: {err.response ? err.response.statusText : "No response"}<br />
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
};

export default Session;
