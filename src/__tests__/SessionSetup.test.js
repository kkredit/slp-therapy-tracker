import React from 'react';
import ReactDOM from 'react-dom';
import SessionSetup from '../session/SessionSetup.js'
import { Student } from '../session/Student.js'
import GetTestDb from '../__test_helpers__/SetupDb.js'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  let db = GetTestDb();
  ReactDOM.render(
    <BrowserRouter>
      <SessionSetup active={true}
                    startCallback={null}
                    providers={db.providers}
                    locations={db.locations} />
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
        <SessionSetup active={true}
                      startCallback={null}
                      providers={db.providers}
                      locations={db.locations} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(SessionSetup)._fiber.stateNode;
  });

  afterEach(() => {
    tree = null;
    instance = null;
  });

  test('Initial setup', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('New student row when have 2 students', () => {
    instance.incrStudentCallback();
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Max 4 students', () => {
    instance.incrStudentCallback();
    instance.incrStudentCallback();
    instance.incrStudentCallback();
    instance.incrStudentCallback();
    instance.incrStudentCallback();
    instance.incrStudentCallback();
    expect(tree.toJSON()).toMatchSnapshot();
    expect(instance.state.students.length).toBe(4);
  })
})
