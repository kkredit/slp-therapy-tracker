import React from 'react';
import ReactDOM from 'react-dom';
import Includes from '../helpers/Includes.js';
import { create } from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Includes />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  test('Static page', () => {
    let tree = create(<Includes />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
