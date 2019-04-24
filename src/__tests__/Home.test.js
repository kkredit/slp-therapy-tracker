import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../home/Home.js';
import { create } from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  test('Static page', () => {
    let tree = create(<Home />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
