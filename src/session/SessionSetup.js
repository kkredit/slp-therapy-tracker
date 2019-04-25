import React from 'react'
import './Session.css'
import { Student, STUDENTS_MIN, STUDENTS_MAX, GOALS_MIN, GOALS_MAX } from './Student.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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

const ProvidersList = (props) => {
  if (!props.providers) {
    return null;
  }
  else {
    const providerListItems = props.providers.map((provider) => {
      return (
        <option key={provider.id}>{provider.fname} {provider.lname}</option>
      )
    });

    return (
      <React.Fragment>
        {providerListItems}
      </React.Fragment>
    );
  }
}

const LocationsList = (props) => {
  if (!props.locations) {
    return null;
  }
  else {
    const locationListItems = props.locations.map((location) => {
      return (
        <option key={location.id}>{location.name}</option>
      )
    });

    return (
      <React.Fragment>
        {locationListItems}
      </React.Fragment>
    );
  }
}

class SessionSetup extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.decrStudentCallback = this.decrStudentCallback.bind(this);
    this.incrStudentCallback = this.incrStudentCallback.bind(this);
    this.studentUpdateCb = this.studentUpdateCb.bind(this);
    this.startSession = this.startSession.bind(this);

    this.state = {
      active: props.active,
      providers: props.providers,
      locations: props.locations,
      provider: null,
      location: null,
      students: [new Student(0, this.studentUpdateCb)],
      studentUpdate: false,
      startCallback: props.startCallback
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      active: props.active,
      providers: props.providers,
      provider: props.providers ? props.providers[0] : null,
      locations: props.locations,
      location: props.locations ? props.locations[0] : null,
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
              <Col xs={2}>
                <Link className="sideNavButton btn btn-light btn-lg" type="button" to="/history">
                  <i className="fa fa-2x fa-fw fa-angle-double-left" aria-hidden="true"/>
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
                    <Card.Subtitle className="mb-2 setup-hdr"> Provider </Card.Subtitle>
                    <Form.Control as="select" name="provider" onChange={e => this.handleInputChange(e)}>
                      <ProvidersList providers={this.state.providers} />
                    </Form.Control>
                    <Card.Subtitle className="mb-2 setup-hdr"> Location </Card.Subtitle>
                    <Form.Control as="select" name="location" onChange={e => this.handleInputChange(e)}>
                      <LocationsList locations={this.state.locations} />
                    </Form.Control>
                    <Card.Subtitle className="mb-2 setup-hdr"> Number of students </Card.Subtitle>
                    <SetupButton faClass="fa fa-minus"
                                 disabled={STUDENTS_MIN >= this.state.students.length}
                                 onClick={this.decrStudentCallback} />
                    {this.state.students.length}
                    <SetupButton faClass="fa fa-plus"
                                 disabled={STUDENTS_MAX <= this.state.students.length}
                                 onClick={this.incrStudentCallback} />

                    <Card.Subtitle className="mb-2 setup-hdr"> Number of goals </Card.Subtitle>
                    <StudentGoalList students={this.state.students} />
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={2}>
                <Button className="sideNavButton" variant="success" size="lg" onClick={this.startSession}>
                  <i className="fa fa-2x fa-fw fa-angle-right" aria-hidden="true"/>
                </Button>
              </Col>
              <Col xs></Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("changing " + name + " to " + value);
    this.setState({
      [name]: value
    });
  }

  decrStudentCallback() {
    if (this.state.students.length > STUDENTS_MIN) {
      this.setState({
        students: this.state.students.slice(0, -1)
      });
    }
  }

  incrStudentCallback() {
    if (this.state.students.length < STUDENTS_MAX) {
      this.setState({
        students: this.state.students.concat(
          [new Student(this.state.students.length, this.studentUpdateCb)]
        )
      });
    }
  }

  studentUpdateCb() {
    this.setState({
      studentUpdate: true
    });
  }

  startSession() {
    this.state.startCallback(this.state.students, this.state.provider, this.state.location);
  }
}

export default SessionSetup;
