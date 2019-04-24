import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ATTEMPT_SUCC, ATTEMPT_CUED, ATTEMPT_FAIL } from './Student.js'
import NotificationAlert from '../helpers/NotificationAlert.js'

import './History.css'

function percent(dividend, divisor) {
  return (100 * dividend / divisor).toFixed(0);
}

function getGoalStats(goal) {
  const total = goal.attempts.length;
  if (total === 0) {
    return "No attempts";
  }
  else {
    const succ = goal.attempts.filter(function(a){return a.status === "correct" || a.status === ATTEMPT_SUCC}).length;
    const cued = goal.attempts.filter(function(a){return a.status === "correct_with_cueing" || a.status === ATTEMPT_CUED}).length;
    const fail = goal.attempts.filter(function(a){return a.status === "incorrect" || a.status === ATTEMPT_FAIL}).length;
    return '' + percent(succ, total) + '% ' + percent(cued, total) + '% ' + percent(fail, total) + '%';
  }
}

const StudentRow = (props) => {
  const numGoals = props.student.goals.length;

  return (
    <Row>
      <Col><p className="modalStudentData">{props.student.number + 1}</p></Col>
      <Col>
        <p className="modalStudentData">
          {numGoals >= 1 ? getGoalStats(props.student.goals[0]) : '-'}
        </p>
      </Col>
      <Col>
        <p className="modalStudentData">
          {numGoals >= 2 ? getGoalStats(props.student.goals[1]) : '-'}
        </p>
      </Col>
      <Col>
        <p className="modalStudentData">
          {numGoals >= 3 ? getGoalStats(props.student.goals[2]) : '-'}
        </p>
      </Col>
      <Col>
        <p className="modalStudentData">
          {numGoals >= 4 ? getGoalStats(props.student.goals[3]) : '-'}
        </p>
      </Col>
    </Row>
  );
}

class SessionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      sessionData: props.sessionData,
      dateTime: new Date(props.sessionData.time),
      onDelete: props.onDelete,
    };
    this.setModalActive = this.setModalActive.bind(this);
    this.setModalInactive = this.setModalInactive.bind(this);
  }

  setModalActive() {
    this.setState({modalActive: true});
  }

  setModalInactive() {
    this.setState({modalActive: false});
  }

  render() {
    const date = this.state.dateTime.toLocaleDateString();
    const time = this.state.dateTime.toLocaleTimeString();
    const fname = this.state.sessionData.provider.fname ? this.state.sessionData.provider.fname : "NA";
    const lname = this.state.sessionData.provider.lname ? this.state.sessionData.provider.lname : "";
    const locationName = this.state.sessionData.location.name ? this.state.sessionData.location.name : "NA";

    const studentRowEntries = this.state.sessionData.students.map((student) => {
      return (
        <StudentRow key={student.number} student={student} />
      );
    });

    return (
      <React.Fragment>
        <tr className="historyRow">
          <td className="col-md-2">{date}</td>
          <td className="col-md-2">{time}</td>
          <td className="col-md-3">{fname}&nbsp;{lname}</td>
          <td className="col-md-2">{locationName}</td>
          <td className="col-md-3">
            <ButtonGroup aria-label="CRUD buttons">
              <Button variant="primary" size="sm" onClick={this.setModalActive}>
                <i className="fa fa-eye"/> View
              </Button>
              <Button variant="danger" size="sm" onClick={event => this.state.onDelete(this.state.sessionData.id)}>
                <i className="fa fa-trash"/> Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>

        <Modal
          size="lg"
          show={this.state.modalActive}
          onHide={this.setModalInactive}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Session details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={2}><h4 className="modalHeader">Date</h4></Col>
                <Col xs={2}><h4 className="modalHeader">Time</h4></Col>
                <Col xs={3}><h4 className="modalHeader">Provider</h4></Col>
                <Col xs={2}><h4 className="modalHeader">Location</h4></Col>
                <Col xs={3}><h4 className="modalHeader">Actions</h4></Col>
              </Row>
              <Row>
                <Col xs={2}><p className="modalData">{date}</p></Col>
                <Col xs={2}><p className="modalData">{time}</p></Col>
                <Col xs={3}><p className="modalData">{fname}&nbsp;{lname}</p></Col>
                <Col xs={2}><p className="modalData">{locationName}</p></Col>
                <Col xs={3}>
                  <p className="modalData">
                    <Button variant="outline-danger" size="sm"
                            onClick={event => this.state.onDelete(this.state.sessionData.id)}>
                      <i className="fa fa-trash"/> Delete
                    </Button>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col><h4 className="modalStudentHeader">Student</h4></Col>
                <Col><h4 className="modalStudentHeader">Goal 1</h4></Col>
                <Col><h4 className="modalStudentHeader">Goal 2</h4></Col>
                <Col><h4 className="modalStudentHeader">Goal 3</h4></Col>
                <Col><h4 className="modalStudentHeader">Goal 4</h4></Col>
              </Row>
              {studentRowEntries}
            </Container>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

const SessionList = (props) => {
  const sessionRows = props.db.sessions.map((session) => {
    let sessionData = props.db.buildSessionData(session);
    return (
      <SessionRow sessionData={sessionData}
                  key={session.id}
                  onDelete={props.onDelete} />
    )
  });

  return (
    <div className="history-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Date</th>
            <th className="col-md-2">Time</th>
            <th className="col-md-3">Provider</th>
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

  removeHistory(id) {
    this.state.db.deleteSession(id, this.clearAlert,
                                (err) => {
                                  this.setAlertError(err, "Could not delete session.");
                                });
  }
};

export default History;
