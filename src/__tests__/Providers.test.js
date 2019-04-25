import React from 'react';
import ReactDOM from 'react-dom';
import Provider from '../settings/Providers.js';
import GetTestDb from '../__test_helpers__/SetupDb.js'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Provider db={GetTestDb()} />
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
        <Provider db={db} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(Provider)._fiber.stateNode;
  });

  afterEach(() => {
    tree = null;
    instance = null;
  });

  test('Initial setup', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Add row with 2nd provider setup', () => {
    let updatedDb = GetTestDb();

    updatedDb.providers.push({
      username: "testusername2",
      fname: "michael",
      lname: "boss",
      email: "mb@mail.org",
      id: 2,
    })

    // Must create new instance, since getDerivedStateFromProps() wipes out direct state db udpates
    tree = create(
      <BrowserRouter>
        <Provider db={updatedDb} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(Provider)._fiber.stateNode;

    expect(instance.state.db.providers.length).toBe(2);
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
