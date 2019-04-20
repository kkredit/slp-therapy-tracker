import React from 'react'
import axios from 'axios'
import './Session.css'
import NotificationAlert from '../helpers/NotificationAlert.js'
import SessionSetup from './SessionSetup.js'
import DataEntry from './DataEntry.js'

const API_BASE = 'http://localhost:8000';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertActive: false,
      alertVariant: '',
      alertText: '',
      providers: null,
      locations: null,
      provider: null,
      location: null,
      inSetup: true,
      students: []
    };
    this.loadProviders = this.loadProviders.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.startCallback = this.startCallback.bind(this);
    this.endCallback = this.endCallback.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.setAlertError = this.setAlertError.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
  }

  componentDidMount() {
    this.loadProviders();
    this.loadLocations();
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
                      providers={this.state.providers}
                      locations={this.state.locations} />
        <DataEntry active={!this.state.inSetup}
                   students={this.state.students}
                   provider={this.state.provider}
                   location={this.state.location}
                   endCallback={this.endCallback} />
      </React.Fragment>
    );
  }

  loadProviders() {
    axios
      .get(`${API_BASE}/providers.json`)
      .then(res => {
              this.setState({ providers: res.data });
              this.clearAlert();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not load providers.");
             });
  }

  loadLocations() {
    axios
      .get(`${API_BASE}/locations.json`)
      .then(res => {
              this.setState({ locations: res.data });
              this.clearAlert();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not load locations.");
             });
  }

  startCallback(startStudents, startProvider, startLocation) {
    this.setState({
      students: startStudents,
      provider: startProvider,
      location: startLocation,
      inSetup: false
    });
  }

  endCallback(endStudents) {
    this.setState({
      students: endStudents,
      inSetup: true
    });
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
