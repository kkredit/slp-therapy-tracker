import React from 'react';
import Alert from 'react-bootstrap/Alert'

import './NotificationAlert.css';

function NotificationAlert (props) {
  if (!props.active) {
    return null;
  } else {
    return (
      <Alert className="notification" key={props.key} variant={props.variant}>
        {props.text}
      </Alert>
    );
  }
};

export default NotificationAlert;
