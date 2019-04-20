import React from 'react'
import './Session.css'

class DataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  render() {
    if (!this.state.active) {
      return null;
    }
    else {
      return (
        <React.Fragment>
          <h3> DataEntry </h3>
        </React.Fragment>
      );
    }
  }
}

export default DataEntry;
