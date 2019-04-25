import React from 'react';
import ReactDOM from 'react-dom';
import DataEntry from '../session/DataEntry.js'
import { Student, Goal } from '../session/Student.js'
import GetTestDb from '../__test_helpers__/SetupDb.js'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  let db = GetTestDb();
  ReactDOM.render(
    <BrowserRouter>
      <DataEntry active={true}
                 students={[new Student(0, null)]}
                 provider={db.providers[0]}
                 location={db.locations[0]}
                 endCallback={null} />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  var tree;
  var instance;

  beforeEach(() => {
    let db = GetTestDb();
    let students = [
      new Student(0, null),
    ];
    students.forEach(student => {
      student.goals = [new Goal(0)];
    });

    tree = create(
      <BrowserRouter>
        <DataEntry active={true}
                   students={students}
                   provider={db.providers[0]}
                   location={db.locations[0]}
                   endCallback={null} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(DataEntry)._fiber.stateNode;
  });

  afterEach(() => {
    tree = null;
    instance = null;
  });

  test('Initial data entry', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('New student row when have 2 students', () => {
    let students = [
      new Student(0, null),
      new Student(1, null),
    ];

    instance.setState({
      students: {students}
    })
    // expect(instance.state.students.length).toBe(2);
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('New goal when have 2 goals', () => {
    let students = [
      new Student(0, null),
    ];
    students.forEach(student => {
      student.goals.push(new Goal(1));
    });

    instance.setState({
      students: {students}
    })
    // expect(instance.state.students[0].goals.length).toBe(2);
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
