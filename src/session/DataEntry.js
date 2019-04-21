import React from 'react'
import './Session.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

const GoalButton = (props) => {
  return (
    <Button variant="light" size="lg" className="goalButton" onClick={props.onClick}>
      <i className={props.faClass} />
    </Button>
  );
}

const GoalCarouselItem = (props) => {
  return (
    <Container>
      <Row>
        <Col xs>
          <h4 className="goalNum"> Goal {props.goal.number + 1} </h4>
        </Col>
      </Row>
      <Row>
        <Col xs/>
        <Col xs={3}>
          <GoalButton faClass="fa fa-3x fa-check" onClick={props.goal.addSuccess} />
        </Col>
        <Col xs={3}>
          <GoalButton faClass="fa fa-3x fa-circle-o" onClick={props.goal.addCued} />
        </Col>
        <Col xs={3}>
          <GoalButton faClass="fa fa-3x fa-times" onClick={props.goal.addFail} />
        </Col>
        <Col xs/>
      </Row>
    </Container>
  );
}

const GoalsCarousel = (props) => {
  const goalCarouselItems = props.goals.map((goal) => {
    return (
      <Carousel.Item key={goal.number}>
        <GoalCarouselItem goal={goal} />
      </Carousel.Item>
    );
  });

  return (
    <Carousel className="goalsCarousel"
              interval={null}
              indicators={false}
              prevIcon={<i className="fa fa-3x fa-angle-left carouselDirections" />}
              nextIcon={<i className="fa fa-3x fa-angle-right carouselDirections" />} >
      {goalCarouselItems}
    </Carousel>
  );
}

const StudentRow = (props) => {
  return (
    <Row>
      <Col xs={1}>
        <h4 className="studentName"> Student {props.student.number + 1} </h4>
      </Col>
      <Col xs={11}>
        <GoalsCarousel goals={props.student.goals} />
      </Col>
    </Row>
  );
}

const StudentRows = (props) => {
  const studentRowEntries = props.students.map((student) => {
    return (
      <StudentRow key={student.number} student={student} />
    );
  });

  return (
    <React.Fragment>
      {studentRowEntries}
    </React.Fragment>
  );
}

class DataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      students: props.students,
      provider: props.provider,
      location: props.location,
      endCallback: props.endCallback
    };

    this.sessionDiscard = this.sessionDiscard.bind(this);
    this.sessionSubmit = this.sessionSubmit.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      active: props.active,
      students: props.students,
      provider: props.provider,
      location: props.location,
    };
  }

  render() {
    if (!this.state.active) {
      return null;
    }
    else {
      return (
        <Container id="dataContainer">
          <Row>
            <Col xs={1}/>
            <Col xs={2}>
              <h3 className="nameLocation"> {this.state.provider.fname} {this.state.provider.lname} </h3>
            </Col>
            <Col xs={2}>
              <h3 className="nameLocation"> {this.state.location.name} </h3>
            </Col>
            <Col xs={4}/>
            <Col xs={1}>
              <Button variant="outline-danger" className="endButton" onClick={this.sessionDiscard}>
                <i className="fa fa-trash" /> Discard
              </Button>
            </Col>
            <Col xs={1}>
              <Button variant="outline-success" className="endButton" onClick={this.sessionSubmit}>
                <i className="fa fa-save" /> Submit
              </Button>
            </Col>
            <Col xs={1} />
          </Row>
          <Row>
            <Col xs={1}>
              <h3 className="dataColHdr"> Students </h3>
            </Col>
            <Col xs={1} />
            <Col xs={9}>
              <h3 className="dataColHdr"> Goals </h3>
            </Col>
            <Col xs={1} />
          </Row>
          <StudentRows students={this.state.students} />
        </Container>
      );
    }
  }

  sessionDiscard() {
    this.state.endCallback(this.state.students);
  }

  sessionSubmit() {
    this.state.endCallback(this.state.students);
  }
}

export default DataEntry;
