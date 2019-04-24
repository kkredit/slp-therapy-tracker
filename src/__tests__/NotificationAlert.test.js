import React from 'react';
import ReactDOM from 'react-dom';
import NotificationAlert from '../helpers/NotificationAlert.js';
import { create } from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotificationAlert />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshots',()=>{
  test('No alert is default', () => {
    let tree = create(<NotificationAlert />);
    expect(tree.toJSON()).toMatchSnapshot();
  })

  test('Alert turns on', () => {
    let tree = create(<NotificationAlert active={true} />);
    expect(tree.toJSON()).toMatchSnapshot();
  })
})
