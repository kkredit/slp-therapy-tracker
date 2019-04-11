import React from 'react';

// May want the below

  // <script src="https://unpkg.com/react/umd/react.production.js" />
  // <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" />
  // <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
  // <script>var Alert = ReactBootstrap.Alert;</script>

class Includes extends React.Component {
  render() {
    return (
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    );
  }
};

export default Includes;
