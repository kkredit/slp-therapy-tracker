
export const STUDENTS_MIN = 1;
export const STUDENTS_MAX = 4;
export const GOALS_MIN = 1;
export const GOALS_MAX = 4;

export const ATTEMPT_SUCC = 0;
export const ATTEMPT_FAIL = 1;
export const ATTEMPT_CUED = 2;

export class Goal {
  constructor(number) {
    this.key = number;
    this.number = number;
    this.attempts = [];

    this.addAttempt = this.addAttempt.bind(this);
    this.addSuccess = this.addSuccess.bind(this);
    this.addFail = this.addFail.bind(this);
    this.addCued = this.addCued.bind(this);
  }

  addAttempt(type) {
    this.attempts.push(type);
  }

  addSuccess() {
    this.addAttempt(ATTEMPT_SUCC);
  }

  addFail() {
    this.addAttempt(ATTEMPT_FAIL);
  }

  addCued() {
    this.addAttempt(ATTEMPT_CUED);
  }
}

export class Student {
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
