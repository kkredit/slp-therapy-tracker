import React from 'react';
import ReactDOM from 'react-dom';
import Session from '../session/Session.js';
import GetTestDb from '../__test_helpers__/SetupDb.js'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Session db={GetTestDb()} />
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
        <Session db={db} />
      </BrowserRouter>
    )
    instance = tree.root.findByType(Session)._fiber.stateNode;

    instance.setState({
      alertActive: false,
      alertVariant: '',
      alertText: '',
      provider: db.providers[0],
      location: db.locations[0],
      inSetup: true,
      students: []
    });
  });

  afterEach(() => {
    tree = null;
    instance = null;
  });

  test('Initial setup', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Blank data entry when inSetup is false', () => {
    instance.setState({inSetup: false});
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
