import React from 'react';

// May want the below

  // <script src="https://unpkg.com/react/umd/react.production.js" />
  // <script src="https://unpkg.com/react-dom/umd/react-dom.production.js" />
  // <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" />
  // <script>var Alert = ReactBootstrap.Alert;</script>

class Includes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/yeti/bootstrap.min.css"
          integrity="sha384-w6tc0TXjTUnYHwVwGgnYyV12wbRoJQo9iMlC2KdkdmVvntGgzT9jvqNEF/uKaF4m"
          crossOrigin="anonymous"
        />
      </React.Fragment>
    );
  }
};

export default Includes;
