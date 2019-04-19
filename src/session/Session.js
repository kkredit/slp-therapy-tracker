import React from 'react';
import './Session.css';
import NotificationAlert from '../helpers/NotificationAlert.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const STUDENTS_MIN = 1;
const STUDENTS_MAX = 4;
const GOALS_MIN = 1;
const GOALS_MAX = 4;

const SetupButton = (props) => {
  return (
    <Button variant="primary" size="sm" className="setupButton" disabled={props.disabled} onClick={props.onClick}>
      <i className={props.faClass} aria-hidden="true"/>
    </Button>
  );
}

const StudentGoalListItem = (props) => {
  return (
    <div>
      Student {props.student.number + 1}:
      <SetupButton faClass="fa fa-minus"
                   disabled={GOALS_MIN >= props.student.goals.length}
                   onClick={props.student.delGoal} />
      {props.student.goals.length}
      <SetupButton faClass="fa fa-plus"
                   disabled={GOALS_MAX <= props.student.goals.length}
                   onClick={props.student.addGoal} />
    </div>
  );
}

const StudentGoalList = (props) => {
  const studentGoalItems = props.students.map((student) => {
    return (
      <StudentGoalListItem key={student.key}
                           student={student} />
    )
  });

  return (
    <React.Fragment>
      {studentGoalItems}
    </React.Fragment>
  );
}

const ATTEMPT_SUCC = 0;
const ATTEMPT_FAIL = 1;
const ATTEMPT_CUE = 2;

class Goal {
  constructor(number) {
    this.key = number;
    this.number = number;
    this.attempts = [];
  }
}

class Student {
  constructor(number, updateCb) {
    this.key = number;
    this.number = number;
    this.goals = [new Goal(0)];
    this.updateCb = updateCb;

    this.addGoal = this.addGoal.bind(this);
    this.delGoal = this.delGoal.bind(this);
  }

  addGoal() {
    if (this.goals.length < GOALS_MAX) {
      this.goals.push(new Goal(this.goals.length));
      this.updateCb();
    }
  }

  delGoal() {
    if (this.goals.length > GOALS_MIN) {
      this.goals.pop();
      this.updateCb();
    }
  }
}

class SetupControl extends React.Component {
  constructor(props) {
    super(props);

    this.decrStudentCallback = this.decrStudentCallback.bind(this);
    this.incrStudentCallback = this.incrStudentCallback.bind(this);
    this.studentUpdateCb = this.studentUpdateCb.bind(this);

    this.state = {
      active: props.active,
      numStudents: STUDENTS_MIN,
      students: [new Student(0, this.studentUpdateCb)],
      studentUpdate: false
    };
  }

  render() {
    if (!this.state.active) {
      return null;
    }
    else {
      return (
        <React.Fragment>
          <Container>
            <Row>
              <Col xs></Col>
              <Col xs={1}>
                <Link className="sideNavButton btn btn-light btn-lg" to="/history">
                  <i className="fa fa-2x fa-angle-double-left sideNavButtonText" aria-hidden="true"/>
                </Link>
              </Col>
              <Col xs={4}>
                <Card id="setupCard" border="primary" bg="secondary">
                  <Card.Body>
                    <Card.Title> Setup a new session </Card.Title>
                    <Card.Text>
                      Select how many students will be in this session and how many goals each will
                      have.
                    </Card.Text>
                    <Card.Subtitle className="mb-2"> Number of students </Card.Subtitle>
                    <SetupButton faClass="fa fa-minus"
                                 disabled={STUDENTS_MIN >= this.state.numStudents}
                                 onClick={this.decrStudentCallback} />
                    {this.state.numStudents}
                    <SetupButton faClass="fa fa-plus"
                                 disabled={STUDENTS_MAX <= this.state.numStudents}
                                 onClick={this.incrStudentCallback} />

                    <Card.Subtitle className="mb-2" id="goals-hdr"> Number of goals </Card.Subtitle>
                    <StudentGoalList students={this.state.students} />
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={1}>
                <Button className="sideNavButton" variant="success" size="lg">
                  <i className="fa fa-2x fa-angle-right" aria-hidden="true"/>
                </Button>
              </Col>
              <Col xs></Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  }

  decrStudentCallback() {
    if (this.state.numStudents > STUDENTS_MIN) {
      this.setState({
        numStudents: this.state.numStudents - 1,
        students: this.state.students.slice(0, -1)
      });
    }
  }

  incrStudentCallback() {
    if (this.state.numStudents < STUDENTS_MAX) {
      this.setState({
        numStudents: this.state.numStudents + 1,
        students: this.state.students.concat(
          [new Student(this.state.numStudents, this.studentUpdateCb)]
        )
      });
    }
  }

  studentUpdateCb() {
    this.setState({
      studentUpdate: true
    });
  }
}

class DataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  render() {
    if (!this.state.active) {
      return null;
    }
    else {
      return (
        <React.Fragment>
          <h3> DataEntry </h3>
        </React.Fragment>
      );
    }
  }
}

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
        <SetupControl active={this.state.inSetup} />
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
