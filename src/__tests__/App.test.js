import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { create } from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  test('Loading screen', () => {
    let tree = create(<App />)
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Home screen', () => {
    let tree = create(<App />)
    let instance = tree.getInstance();
    instance.dbInitialLoadCb();
    expect(tree.toJSON()).toMatchSnapshot();
  })
})

describe("Loading screen should give way to the app", () => {

  test('Simulate loading the db', () => {
    let tree = create(<App />);
    let instance = tree.getInstance();
    expect(tree.toJSON()).toMatchSnapshot();

    expect(instance.state.dbLoaded).toBe(false);
    instance.dbInitialLoadCb();
    expect(instance.state.dbLoaded).toBe(true);

    expect(tree.toJSON()).toMatchSnapshot();
  })
})
