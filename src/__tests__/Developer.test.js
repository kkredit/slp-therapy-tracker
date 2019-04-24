import React from 'react';
import ReactDOM from 'react-dom';
import Developer from '../home/Developer.js';
import { create } from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Developer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  test('Static page', () => {
    let tree = create(<Developer />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
