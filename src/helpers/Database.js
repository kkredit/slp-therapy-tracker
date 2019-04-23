
import axios from 'axios'

export default class Database {
  constructor(props) {
    // Class data
    this.apiBase = props.apiBase;
    this.loadedCallback = props.loadedCallback;

    // Database data
    this.locations = [];
    this.providers = [];
    this.sessions = [];
    this.students = [];
    this.goals = [];
    this.attempts = [];

    // Functions data
    this.buildSessionData = this.buildSessionData.bind(this);
    this.getLocationFromId = this.getLocationFromId.bind(this);
    this.getProviderFromId = this.getProviderFromId.bind(this);
    this.getStudentsFromSession = this.getStudentsFromSession.bind(this);
    this.getGoalsFromStudent = this.getGoalsFromStudent.bind(this);
    this.getAttemptsFromGoal = this.getAttemptsFromGoal.bind(this);

    this.loadAll = this.loadAll.bind(this);
    this.loadedCallback = this.loadedCallback.bind(this);

    this.getLocations = this.getLocations.bind(this);
    this.getProviders = this.getProviders.bind(this);
    this.getSessions = this.getSessions.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.getGoals = this.getGoals.bind(this);
    this.getAttempts = this.getAttempts.bind(this);
  }

  buildSessionData(session) {
    let students = this.getStudentsFromSession(session);
    students.forEach(student => {
      student.goals = this.getGoalsFromStudent(student);
      student.goals.forEach(goal => {
        goal.attempts = this.getAttemptsFromGoal(goal);
      });
    });
    const sessionData = {
      id: session.id,
      time: session.time,
      location: this.getLocationFromId(session.location_id),
      provider: this.getProviderFromId(session.provider_id),
      students: students,
    };
    console.log(sessionData);
    return sessionData;
  }

  getLocationFromId(id) {
    return this.locations.filter(location => location.id === id)[0];
  }

  getProviderFromId(id) {
    return this.providers.filter(provider => provider.id === id)[0];
  }

  getStudentsFromSession(session) {
    return this.students.filter(student => student.session_id === session.id);
  }

  getGoalsFromStudent(student) {
    return this.goals.filter(student => student.student_id === student.id);
  }

  getAttemptsFromGoal(goal) {
    return this.attempts.filter(attempt => attempt.goal_id === goal.id);
  }

  loadAll() {
    this.getLocations();
  }

  loadedCallback() {
    this.state.loadedCallback();
  }

  getLocations() {
    axios
      .get(`${this.apiBase}/locations.json`)
      .then(res => {
              this.locations = res.data;
              console.log(`locations loaded [${this.locations.length}]`);
              this.getProviders();
            })
      .catch(err => {
               console.log("Could not load locations.");
               console.log(err);
               // this.setAlertError(err, "Could not load locations.");
             });
  }

  getProviders() {
    axios
      .get(`${this.apiBase}/providers.json`)
      .then(res => {
              this.providers = res.data;
              console.log(`providers loaded [${this.providers.length}]`);
              this.getSessions();
            })
      .catch(err => {
               console.log("Could not load providers.");
               console.log(err);
               // this.setAlertError(err, "Could not load  providers.");
             });
  }

  getSessions() {
    axios
      .get(`${this.apiBase}/sessions.json`)
      .then(res => {
              this.sessions = res.data;
              console.log(`sessions loaded [${this.sessions.length}]`);
              this.getStudents();
            })
      .catch(err => {
               console.log("Could not load sessions.");
               console.log(err);
               // this.setAlertError(err, "Could not load sessions.");
             });
  }

  getStudents() {
    axios
      .get(`${this.apiBase}/students.json`)
      .then(res => {
              this.students = res.data;
              console.log(`students loaded [${this.students.length}]`);
              this.getGoals();
            })
      .catch(err => {
               console.log("Could not load students.");
               console.log(err);
               // this.setAlertError(err, "Could not load students.");
             });
  }

  getGoals() {
    axios
      .get(`${this.apiBase}/goals.json`)
      .then(res => {
              this.goals = res.data;
              console.log(`goals loaded [${this.goals.length}]`);
              this.getAttempts();
            })
      .catch(err => {
               console.log("Could not load goals.");
               console.log(err);
               // this.setAlertError(err, "Could not load goals.");
             });
  }

  getAttempts() {
    axios
      .get(`${this.apiBase}/attempts.json`)
      .then(res => {
              this.attempts = res.data;
              console.log(`attempts loaded [${this.attempts.length}]`);
              this.loadedCallback();
            })
      .catch(err => {
               console.log("Could not load attempts.");
               console.log(err);
               // this.setAlertError(err, "Could not load attempts.");
             });
  }
}
