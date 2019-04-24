
import axios from 'axios'

export default class Database {
  constructor(props) {
    // Class data
    this.apiBase = props.apiBase;
    this.initialLoadCb = props.initialLoadCb;
    this.updatedCb = props.updatedCb;

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
    this.getSessionFromId = this.getSessionFromId.bind(this);
    this.getStudentsFromSession = this.getStudentsFromSession.bind(this);
    this.getGoalsFromStudent = this.getGoalsFromStudent.bind(this);
    this.getAttemptsFromGoal = this.getAttemptsFromGoal.bind(this);

    this.loadAll = this.loadAll.bind(this);
    this.dbUpdatedCb = this.dbUpdatedCb.bind(this);

    // Generic GET, DELETE, POST, and PUT
    this.getResource = this.getResource.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
    this.postResource = this.postResource.bind(this);
    this.putResource = this.putResource.bind(this);

    // Specific GETs
    this.getLocations = this.getLocations.bind(this);
    this.getProviders = this.getProviders.bind(this);
    this.getSessions = this.getSessions.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.getGoals = this.getGoals.bind(this);
    this.getAttempts = this.getAttempts.bind(this);

    // Specific DELETEs
    this.deleteLocation = this.deleteLocation.bind(this);
    this.deleteProvider = this.deleteProvider.bind(this);
    this.deleteSession = this.deleteSession.bind(this);

    // Specific POSTs
    this.postLocation = this.postLocation.bind(this);
    this.postProvider = this.postProvider.bind(this);
    this.postSession = this.postSession.bind(this);

    // Specific PUTs
    this.putLocation = this.putLocation.bind(this);
    this.putProvider = this.putProvider.bind(this);
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
    return sessionData;
  }

  getLocationFromId(id) {
    return this.locations.filter(location => location.id === id)[0];
  }

  getProviderFromId(id) {
    return this.providers.filter(provider => provider.id === id)[0];
  }

  getSessionFromId(id) {
    return this.sessions.filter(session => session.id === id)[0];
  }

  getStudentsFromSession(session) {
    return this.students.filter(student => student.session_id === session.id);
  }

  getGoalsFromStudent(student) {
    return this.goals.filter(goal => goal.student_id === student.id);
  }

  getAttemptsFromGoal(goal) {
    return this.attempts.filter(attempt => attempt.goal_id === goal.id);
  }

  loadAll() {
    const initLoadCb = this.initialLoadCb;
    const attemptsGetter = this.getAttempts;
    const thenGetAttempts = function () {
      attemptsGetter(initLoadCb, Function.prototype);
    };
    const goalsGetter = this.getGoals;
    const thenGetGoals = function () {
      goalsGetter(thenGetAttempts, Function.prototype);
    };
    const studentsGetter = this.getStudents;
    const thenGetStudents = function () {
      studentsGetter(thenGetGoals, Function.prototype);
    };
    const sessionsGetter = this.getSessions;
    const thenGetSessions = function () {
      sessionsGetter(thenGetStudents, Function.prototype);
    };
    const providersGetter = this.getProviders;
    const thenGetProviders = function () {
      providersGetter(thenGetSessions, Function.prototype);
    };

    this.getLocations(thenGetProviders, Function.prototype);
  }

  dbUpdatedCb() {
    this.updatedCb();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           Generic GET, DELETE, POST, and PUT //
  //////////////////////////////////////////////////////////////////////////////////////////////////
  getResource(name, apiUrl, setFunc, thenCb, catchCb) {
    axios
      .get(`${this.apiBase}${apiUrl}`)
      .then(res => {
              setFunc(res.data);
              console.log(`${name} loaded [${res.data.length}]`);
              console.log(res.data);
              this.dbUpdatedCb();
              thenCb();
            })
      .catch(err => {
               console.log(`Could not load ${name}.`);
               console.log(err.message);
               catchCb(err);
             });
  }

  deleteResource(name, apiUrl, resourceArray, id, filteredCb, thenCb, catchCb) {
    const filteredArray = resourceArray.filter(item => item.id !== id);
    filteredCb(filteredArray);
    this.dbUpdatedCb();
    axios
      .delete(`${this.apiBase}${apiUrl}`)
      .then(res => {
              console.log(`${name} deleted`);
              thenCb();
            })
      .catch(err => {
               console.log(`Could not delete ${name}.`);
               console.log(err.message);
               catchCb(err);
             });
  }

  postResource(name, apiUrl, resourceArray, resource, thenCb, catchCb) {
    axios
      .post(`${this.apiBase}${apiUrl}`, resource)
      .then(res => {
              resource.id = res.data.id;
              resourceArray.push(resource);
              console.log(`${name} added`);
              this.dbUpdatedCb();
              thenCb(res.data);
            })
      .catch(err => {
               console.log(`Could not add ${name}.`);
               console.log(err.message);
               catchCb(err);
             });
  }

  putResource(name, apiUrl, resource, updateCb, thenCb, catchCb) {
    axios
      .put(`${this.apiBase}${apiUrl}`, resource)
      .then(res => {
              updateCb();
              console.log(`${name} updated`);
              this.dbUpdatedCb();
              thenCb();
            })
      .catch(err => {
               console.log(`Could not update ${name}.`);
               console.log(err.message);
               catchCb(err);
             });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                Specific GETs //
  //////////////////////////////////////////////////////////////////////////////////////////////////
  getLocations(thenCb, catchCb) {
    this.getResource('locations', '/locations.json', ((data) => {this.locations = data}), thenCb, (err) => {catchCb(err)});
  }

  getProviders(thenCb, catchCb) {
    this.getResource('providers', '/providers.json', ((data) => {this.providers = data}), thenCb, (err) => {catchCb(err)});
  }

  getSessions(thenCb, catchCb) {
    this.getResource('sessions', '/sessions.json', ((data) => {this.sessions = data}), thenCb, (err) => {catchCb(err)});
  }

  getStudents(thenCb, catchCb) {
    this.getResource('students', '/students.json', ((data) => {this.students = data}), thenCb, (err) => {catchCb(err)});
  }

  getGoals(thenCb, catchCb) {
    this.getResource('goals', '/goals.json', ((data) => {this.goals = data}), thenCb, (err) => {catchCb(err)});
  }

  getAttempts(thenCb, catchCb) {
    this.getResource('attempts', '/attempts.json', ((data) => {this.attempts = data}), thenCb, (err) => {catchCb(err)});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                             Specific DELETEs //
  //////////////////////////////////////////////////////////////////////////////////////////////////
  deleteLocation(id, thenCb, catchCb) {
    this.deleteResource(`location ${id}`, `/locations/${id}.json`, this.locations, id,
                        (filteredArray) => {
                          this.locations = filteredArray;
                        },
                        thenCb, (err) => {catchCb(err)});
  }

  deleteProvider(id, thenCb, catchCb) {
    this.deleteResource(`provider ${id}`, `/providers/${id}.json`, this.providers, id,
                        (filteredArray) => {
                          this.providers = filteredArray;
                        },
                        thenCb, (err) => {catchCb(err)});
  }

  deleteSession(id, thenCb, catchCb) {
    const sessionData = this.buildSessionData(this.getSessionFromId(id));

    // TODO: if can get on-cascade-delete to work, maybe don't need this?
    sessionData.students.forEach(student => {
      student.goals.forEach(goal => {
        goal.attempts.forEach(attempt => {
          this.deleteResource(`attempt ${attempt.id}`, `/attempts/${attempt.id}.json`, this.attempts, attempt.id,
                              (filteredArray) => {
                                this.attempts = filteredArray;
                              },
                              thenCb, (err) => {this.getSessions(); catchCb(err)});
        });
        this.deleteResource(`goal ${goal.id}`, `/goals/${goal.id}.json`, this.goals, goal.id,
                            (filteredArray) => {
                              this.goals = filteredArray;
                            },
                            thenCb, (err) => {this.getSessions(); catchCb(err)});
      });
      this.deleteResource(`student ${student.id}`, `/students/${student.id}.json`, this.students, student.id,
                          (filteredArray) => {
                            this.students = filteredArray;
                          },
                          thenCb, (err) => {this.getSessions(); catchCb(err)});
    });
    this.deleteResource(`session ${id}`, `/sessions/${id}.json`, this.sessions, id,
                        (filteredArray) => {
                          this.sessions = filteredArray;
                        },
                        thenCb, (err) => {this.getSessions(Function.prototype, (err) => {catchCb(err)}); catchCb(err)});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                               Specific POSTs //
  //////////////////////////////////////////////////////////////////////////////////////////////////
  postLocation(newLocation, thenCb, catchCb) {
    this.postResource(`location ${newLocation.id}`, '/locations.json', this.locations, newLocation,
                      (data) => {thenCb(data)}, (err) => {catchCb(err)});
  }

  postProvider(newProvider, thenCb, catchCb) {
    this.postResource(`provider ${newProvider.id}`, '/providers.json', this.providers, newProvider,
                      (data) => {thenCb(data)}, (err) => {catchCb(err)});
  }

  postSession(location, provider, students, thenCb, catchCb) {
    const sessionObj = {
      time: new Date(),
      // id: "999999",
      provider_id: provider.id,
      location_id: location.id,
    };

    const resourcePoster = this.postResource;
    var attemptsArr = this.attempts;
    var goalsArr = this.goals;
    var studentsArr = this.students;

    const thenPostAttempts = function (goal, catchCb) {
      var num = 0;
      goal.attempts.forEach(attempt => {
          const attemptObj = {
            // id: "999999",
            goal_id: goal.id,
            number: num,
            status: attempt,
          };
          num++;
          resourcePoster(`attempt ${attemptObj.number}`, '/attempts.json', attemptsArr, attemptObj,
                         Function.prototype, (err) => {catchCb(err)});
      });
    }

    const thenPostGoals = function (student, catchCb) {
      student.goals.forEach(goal => {
          const goalObj = {
            // id: "999999",
            student_id: student.id,
            number: goal.number
          };
          resourcePoster(`goal ${goalObj.number}`, '/goals.json', goalsArr, goalObj,
                         (data) => {
                           goal.id = data.id;
                           thenPostAttempts(goal, (err) => {catchCb(err)});
                           thenCb();
                         }, (err) => {catchCb(err)});
      });
    }

    const thenPostStudents = function (sessionId, catchCb) {
      students.forEach(student => {
          const studentObj = {
            // id: "999999",
            session_id: sessionId,
            number: student.number
          };
          resourcePoster(`student ${studentObj.number}`, '/students.json', studentsArr, studentObj,
                         (data) => {
                           student.id = data.id;
                           thenPostGoals(student, (err) => {catchCb(err)});
                         }, (err) => {catchCb(err)});
      });
    }

    this.postResource(`session ${sessionObj.time}`, '/sessions.json', this.sessions, sessionObj,
                      (data) => {
                        thenPostStudents(data.id, (err) => {catchCb(err)});
                        thenCb();
                      }, (err) => {catchCb(err)});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                Specific PUTs //
  //////////////////////////////////////////////////////////////////////////////////////////////////
  putLocation(location, thenCb, catchCb) {
    this.putResource(`location ${location.id}`, `/locations/${location.id}.json`, location,
                     () => {
                       this.locations.filter(locationN => locationN.id === location.id)[0].name = location.name;
                     },
                     thenCb, (err) => {catchCb(err)});
  }

  putProvider(provider, thenCb, catchCb) {
    this.putResource(`provider ${provider.id}`, `/providers/${provider.id}.json`, provider,
                     () => {
                       this.providers.filter(providerN => providerN.id === provider.id)[0].fname = provider.fname;
                       this.providers.filter(providerN => providerN.id === provider.id)[0].lname = provider.lname;
                       this.providers.filter(providerN => providerN.id === provider.id)[0].username = provider.username;
                       this.providers.filter(providerN => providerN.id === provider.id)[0].email = provider.email;
                     },
                     thenCb, (err) => {catchCb(err)});
  }
}
