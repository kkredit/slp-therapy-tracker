import React from 'react';
import ReactDOM from 'react-dom';
import History from '../session/History.js';
import { ATTEMPT_SUCC, ATTEMPT_CUED, ATTEMPT_FAIL } from '../session/Student.js'
import GetTestDb from '../__test_helpers__/SetupDb.js'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <History db={GetTestDb()} />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  var tree;
  var instance;

  beforeEach(() => {
    let db = GetTestDb();

    tree = create(
      <BrowserRouter>
        <History db={db} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(History)._fiber.stateNode;
  });

  afterEach(() => {
    tree = null;
    instance = null;
  });

  test('Initial setup', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Add row with session data', () => {
    let updatedDb = GetTestDb();

    updatedDb.sessions = [
      {
        id: 1,
        time: new Date(),
        provider_id: updatedDb.providers[0].id,
        location_id: updatedDb.locations[0].id,
      }
    ];
    updatedDb.students = [
      {
        id: 1,
        number: 0,
        session_id: 1,
      }
    ];
    updatedDb.goals = [
      {
        id: 1,
        number: 0,
        student_id: 1,
      }
    ];
    updatedDb.attempts = [
      {
        goal_id: 1,
        status: ATTEMPT_SUCC,
      },
      {
        goal_id: 1,
        status: ATTEMPT_SUCC,
      },
      {
        goal_id: 1,
        status: ATTEMPT_CUED,
      },
      {
        goal_id: 1,
        status: ATTEMPT_FAIL,
      },
    ];

    // Must create new instance, since getDerivedStateFromProps() wipes out direct state db udpates
    tree = create(
      <BrowserRouter>
        <History db={updatedDb} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(History)._fiber.stateNode;
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
