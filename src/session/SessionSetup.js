import React from 'react'
import './Session.css'
import { Student, STUDENTS_MIN, STUDENTS_MAX, GOALS_MIN, GOALS_MAX } from './Student.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

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

class SessionSetup extends React.Component {
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

export default SessionSetup;
