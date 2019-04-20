import React from 'react'
import './Session.css'
// import { Student, STUDENTS_MIN, STUDENTS_MAX, GOALS_MIN, GOALS_MAX } from './Student.js'
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
    <Carousel.Item>
      <Container>
        <Row>
          <Col xs>
            <h4 className="goalNum"> Goal {props.goal.number + 1} </h4>
          </Col>
        </Row>
        <Row>
          <Col xs/>
          <Col xs={3}>
            <GoalButton faClass="fa fa-3x fa-check" />
          </Col>
          <Col xs={3}>
            <GoalButton faClass="fa fa-3x fa-circle-o" />
          </Col>
          <Col xs={3}>
            <GoalButton faClass="fa fa-3x fa-times" />
          </Col>
          <Col xs/>
        </Row>
      </Container>
    </Carousel.Item>
  );
}

class GoalsCarouselSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: props.goals,
    };
  }

  render() {
    const goalCarouselItems = this.state.goals.map((goal) => {
      return (
        <GoalCarouselItem key={goal.key}
                          goal={goal} />
      );
    });

    return (
      <React.Fragment>
        {goalCarouselItems}
      </React.Fragment>
    );
  }
}

class StudentRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: props.student,
    };
  }

  render() {
    return (
      <Row>
        <Col xs={1}>
          <h4 className="studentName"> Student {this.state.student.number + 1} </h4>
        </Col>
        <Col xs={11}>
          <Carousel className="goalsCarousel"
                    interval={null}
                    indicators={false}
                    // nextIcon={<i className="fa fa-angle-right" aria-hidden="false"/>}
                    >
            <GoalsCarouselSet student={this.state.student} goals={this.state.student.goals} />
          </Carousel>
        </Col>
      </Row>
    );
  }
}

class StudentRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: props.students,
    };
  }

  render() {
    const studentRowEntries = this.state.students.map((student) => {
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
}

class DataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  static getDerivedStateFromProps(props) {
    return {active: props.active, students: props.students};
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

          <Container>
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
            <Row>
              <Col xs={1}>
                <h4 className="studentName"> Student {this.state.students[0].number + 1} </h4>
              </Col>
              <Col xs={11}>
                <Carousel className="goalsCarousel"
                          interval={null}
                          indicators={false}
                          // nextIcon={<i className="fa fa-angle-right" aria-hidden="false"/>}
                          >
                  <Carousel.Item>
                    <Container>
                      <Row>
                        <Col xs>
                          <h4 className="goalNum"> Goal {this.state.students[0].goals[0].number + 1} </h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs/>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-check" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-circle-o" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-times" />
                        </Col>
                        <Col xs/>
                      </Row>
                    </Container>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Container>
                      <Row>
                        <Col xs>
                          <h4 className="goalNum"> Goal {this.state.students[0].goals[1].number + 1} </h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs/>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-check" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-circle-o" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-times" />
                        </Col>
                        <Col xs/>
                      </Row>
                    </Container>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            <Row>
              <Col xs={1}>
                <h4 className="studentName"> Student {this.state.students[1].number + 1} </h4>
              </Col>
              <Col xs={11}>
                <Carousel className="goalsCarousel"
                          interval={null}
                          indicators={false}
                          // nextIcon={<i className="fa fa-angle-right" aria-hidden="false"/>}
                          >
                  <Carousel.Item>
                    <Container>
                      <Row>
                        <Col xs>
                          <h4 className="goalNum"> Goal {this.state.students[1].goals[0].number + 1} </h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs/>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-check" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-circle-o" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-times" />
                        </Col>
                        <Col xs/>
                      </Row>
                    </Container>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Container>
                      <Row>
                        <Col xs>
                          <h4 className="goalNum"> Goal {this.state.students[1].goals[1].number + 1} </h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs/>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-check" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-circle-o" />
                        </Col>
                        <Col xs={3}>
                          <GoalButton faClass="fa fa-3x fa-times" />
                        </Col>
                        <Col xs/>
                      </Row>
                    </Container>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default DataEntry;
