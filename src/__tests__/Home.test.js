import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../home/Home.js';
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  test('Static page', () => {
    let tree = create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      );
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
