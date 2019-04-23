import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import NotificationAlert from '../helpers/NotificationAlert.js'

import './History.css'

const API_BASE = 'http://localhost:8000';

const HistoryListItem = (props) => {
  const dateTime = new Date(props.historyItem.time);
  return (
    <tr className="historyRow">
      <td className="col-md-1"/>
      <td className="col-md-2">{dateTime.toLocaleDateString()}</td>
      <td className="col-md-2">{dateTime.toLocaleTimeString()}</td>
      <td className="col-md-2">{props.historyItem.provider ? props.historyItem.provider.username : "NA"}</td>
      <td className="col-md-2">{props.historyItem.location ? props.historyItem.location.name : "NA"}</td>
      <td className="col-md-2">
        <ButtonGroup aria-label="CRUD buttons">
          <Button variant="primary" size="sm">
            <i className="fa fa-eye"/> View
          </Button>
          <Button variant="danger" size="sm">
            <i className="fa fa-trash"/> Delete
          </Button>
        </ButtonGroup>
      </td>
      <td className="col-md-1"/>
    </tr>
  );
}

const HistoryList = (props) => {
  const historyItems = props.history.map((historyItem) => {
    return (
      <HistoryListItem historyItem={historyItem}
                       key={historyItem.id}
                       onDelete={props.onDelete}
                       onEdit={props.onEdit} />
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
            <th className="col-md-2">Actions</th>
            <th className="col-md-1"/>
          </tr>
        </thead>
        <tbody>
          {historyItems}
        </tbody>
      </table>
    </div>
  );
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyItems: [],
      formMode: "new",
      history: {time:"", provider:"", location:"", id: "999999"},
      alertActive: false,
      alertVariant: '',
      alertText: ''
    };
    this.setAlert = this.setAlert.bind(this);
    this.setAlertError = this.setAlertError.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.loadHistory = this.loadHistory.bind(this);
    this.removeHistory = this.removeHistory.bind(this);
  }

  render() {
    return (
      <div className="history">
        <h1> Session History </h1>
        <NotificationAlert active={this.state.alertActive}
                           variant={this.state.alertVariant}
                           text={this.state.alertText} />
        <HistoryList history={this.state.historyItems}
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

  componentDidMount() {
    console.log('History mounted!')
    this.loadHistory();
  }

  loadHistory() {
    axios
      .get(`${API_BASE}/sessions.json`)
      .then(res => {
              this.setState({ historyItems: res.data });
              this.clearAlert();
              console.log(`Data loaded! = ${this.state.historyItems.length}`);
            })
      .catch(err => {
               console.log(err);
               this.setAlert('danger', err);
               this.setAlertError(err, "Could not load current history.");
             });
  }

  removeHistory(id) {
    let filteredArray = this.state.history.filter(item => item.id !== id)
    this.setState({history: filteredArray});
    axios
      .delete(`${API_BASE}/history/${id}.json`)
      .then(res => {
              console.log(`Record Deleted`);
              this.clearAlert();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not remove history.");
             });
  }
};

export default History;
