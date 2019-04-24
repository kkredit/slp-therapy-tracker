import Database from '../helpers/Database'

const DUMMY_API_BASE = '127.0.0.1:8000'

export default function GetTestDb() {

  const dbInitialLoadCb = function() {
    console.log('test database called dbInitialLoadCb()');
  }

  const dbUpdatedCb = function() {
    console.log('test database called dbUpdatedCb()');
  }

  let db = new Database({
    apiBase: DUMMY_API_BASE,
    initialLoadCb: dbInitialLoadCb,
    updatedCb: dbUpdatedCb,
  });

  db.locations = [];
  db.providers = [];
  db.sessions = [];
  db.students = [];
  db.goals = [];
  db.attempts = [];

  return db;
}
