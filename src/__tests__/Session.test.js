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
  test('Initial setup', () => {
    let tree = create(
      <BrowserRouter>
        <Session db={GetTestDb()} />
      </BrowserRouter>
    )
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Blank data entry when inSetup is false', () => {
    let tree = create(
      <BrowserRouter>
        <Session db={GetTestDb()} />
      </BrowserRouter>
    )
    let instance = tree.root.findByType(Session)._fiber.stateNode;
    instance.state.inSetup = false;
    expect(tree.toJSON()).toMatchSnapshot();
  })
})

describe("Loading screen should give way to the app", () => {

  // test('Simulate loading the db', () => {
  //   let tree = create(<App />);
  //   let instance = tree.getInstance();
  //   expect(tree.toJSON()).toMatchSnapshot();
  //
  //   expect(instance.state.dbLoaded).toBe(false);
  //   instance.dbInitialLoadCb();
  //   expect(instance.state.dbLoaded).toBe(true);
  //
  //   expect(tree.toJSON()).toMatchSnapshot();
  // })
})
