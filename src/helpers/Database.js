
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

    this.getResource = this.getResource.bind(this);
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
      location: this.getLocationFromId(session.location_id) || "NA",
      provider: this.getProviderFromId(session.provider_id) || "NA",
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

  getResource(name, apiUrl, setFunc, thenFunc) {
    axios
      .get(`${this.apiBase}${apiUrl}`)
      .then(res => {
              setFunc(res.data);
              console.log(`${name} loaded [${res.data.length}]`);
              console.log(res.data);
              thenFunc();
            })
      .catch(err => {
               console.log(`Could not load ${name}.`);
               console.log(err);
               // this.setAlertError(err, "Could not load ${name}.");
             });
  }

  getLocations() {
    this.getResource('locations', '/locations.json', ((data) => {this.locations = data}), this.getProviders);
  }

  getProviders() {
    this.getResource('providers', '/providers.json', ((data) => {this.providers = data}), this.getSessions);
  }

  getSessions() {
    this.getResource('sessions', '/sessions.json', ((data) => {this.sessions = data}), this.getStudents);
  }

  getStudents() {
    this.getResource('students', '/students.json', ((data) => {this.students = data}), this.getGoals);
  }

  getGoals() {
    this.getResource('goals', '/goals.json', ((data) => {this.goals = data}), this.getAttempts);
  }

  getAttempts() {
    this.getResource('attempts', '/attempts.json', ((data) => {this.attempts = data}), this.loadedCallback);
  }
}
