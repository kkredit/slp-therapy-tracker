import React from 'react';
import ReactDOM from 'react-dom';
import Location from '../settings/Locations.js';
import GetTestDb from '../__test_helpers__/SetupDb.js'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Location db={GetTestDb()} />
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
        <Location db={db} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(Location)._fiber.stateNode;
  });

  afterEach(() => {
    tree = null;
    instance = null;
  });

  test('Initial setup', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Add row with 2nd location setup', () => {
    let updatedDb = GetTestDb();

    updatedDb.locations.push({
      name: "testroom2",
      id: 2,
    })

    // Must create new instance, since getDerivedStateFromProps() wipes out direct state db udpates
    tree = create(
      <BrowserRouter>
        <Location db={updatedDb} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(Location)._fiber.stateNode;

    expect(instance.state.db.locations.length).toBe(2);
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
