import React from 'react'
import './Session.css'
import NotificationAlert from '../helpers/NotificationAlert.js'
import { STUDENTS_MIN } from './Student.js'
import SessionSetup from './SessionSetup.js'
import DataEntry from './DataEntry.js'

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertActive: false,
      alertVariant: '',
      alertText: '',
      inSetup: true,
      numStudents: STUDENTS_MIN
    };
    this.setAlert = this.setAlert.bind(this);
    this.setAlertError = this.setAlertError.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <h1> Record a Session </h1>
        <NotificationAlert active={this.state.alertActive}
                           variant={this.state.alertVariant}
                           text={this.state.alertText} />
        <SessionSetup active={this.state.inSetup} />
        <DataEntry active={!this.state.inSetup} />
      </React.Fragment>
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
};

export default Session;
