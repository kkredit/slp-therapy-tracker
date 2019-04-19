import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import NotificationAlert from '../helpers/NotificationAlert.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import './Locations.css'

const API_BASE = 'http://localhost:8000';

function getClearFormId(currentId) {
  return (currentId === "999999") ? "888888" : "999999";
}

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.location.name,
      id: props.location.id,
      validated: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  renderButtons() {
    if (this.props.formMode === "new") {
      return(
        <Button type="submit" variant="primary">
          <i className="fa fa-plus-square-o"/> Create
        </Button>
      );
    } else {
      return(
        <ButtonGroup className="form-group" aria-label="new-crud-buttons">
          <Button type="submit" variant="success">
            <i className="fa fa-save"/> Save
          </Button>
          <Button type="submit" variant="warning" onClick={this.handleCancel}>
            <i className="fa fa-undo"/> Cancel
          </Button>
        </ButtonGroup>
      );
    }
  }

  render() {
    const { validated } = this.state;
    return (
      <div className="location-form">
        <h3> Create new location </h3>

        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationLocationName">
              <Form.Label>Location name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={this.state.name}
                onChange={e => this.handleInputChange(e)}
                type="text"
                placeholder="e.g., 'Lincoln Memorial Elementary School' or 'LMES'"
                pattern="[a-zA-Z.0-9 ]{3,60}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a name between 3 and 60 characters. You may use letters, numbers,
                and '.'s.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {this.renderButtons()}
        </Form>
      </div>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ validated: false });
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      this.props.onSubmit({
        name: this.state.name,
        id: this.state.id,
      });
      event.preventDefault();
    }
    this.setState({ validated: true });
  }

  handleCancel(event) {
    this.props.onCancel("new", {name:"", id: getClearFormId(this.state.id)});
    event.preventDefault();
  }
}

const LocationListItem = (props) => {
  return (
    <tr>
      <td className="col-md-10">{props.name}</td>
      <td className="col-md-2">
        <ButtonGroup aria-label="CRUD buttons">
          <Button variant="info" size="sm" onClick={event => props.onEdit("edit",props)}>
            <i className="fa fa-edit"/> Edit
          </Button>
          <Button variant="danger" size="sm" onClick={event => props.onDelete(props.id)}>
            <i className="fa fa-trash-o"/> Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}

const LocationList = (props) => {
  const locationItems = props.locations.map((location) => {
    return (
      <LocationListItem
        name={location.name}
        id={location.id}
        key={location.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="location-list">
      <h3> Current locations </h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-10">Location Name</th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locationItems}
        </tbody>
      </table>
    </div>
  );
}

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      formMode: "new",
      location: {name:"", id: "999999"},
      alertActive: false,
      alertVariant: '',
      alertText: ''
    };
    this.setAlert = this.setAlert.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.loadLocations = this.loadLocations.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  render() {
    return (
      <div className="locations">
        <h1> Locations </h1>
        <NotificationAlert active={this.state.alertActive}
                           variant={this.state.alertVariant}
                           text={this.state.alertText} />
        <LocationForm
          onSubmit={(location) => this.formSubmitted(location)}
          onCancel={(mode,location) => this.updateForm(mode,location)}
          formMode={this.state.formMode}
          location={this.state.location}
          key={this.state.location.id}
        />
        <LocationList
          locations={this.state.locations}
          onDelete={(id) => this.removeLocation(id)}
          onEdit={(mode,location) => this.updateForm(mode,location)}
        />
      </div>
    );
  }

  setAlert(variant, text) {
    this.setState({
      alertActive: true,
      alertVariant: '' + variant,
      alertText: text
    });
  }

  setAlertError(err, text) {
    this.setAlert('danger',
                  <React.Fragment>
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"/><br />
                    {err.message}: {err.response.statusText}<br />
                    {text}
                  </React.Fragment>
                  );
  }

  clearAlert() {
    this.setState({
      alertActive: false,
      alertVariant: '',
      alertText: ''
    });
  }

  componentDidMount() {
    console.log('Locations mounted!')
    this.loadLocations();
  }

  updateForm(mode, locationVals) {
    this.clearAlert();
    this.setState({
      location: Object.assign({}, locationVals),
      formMode: mode,
    });
  }

  clearForm() {
    this.clearAlert();
    console.log("clear form");
    this.updateForm("new", {name: "", id: getClearFormId(this.state.location.id)});
  }

  loadLocations() {
    axios
      .get(`${API_BASE}/locations.json`)
      .then(res => {
              this.setState({ locations: res.data });
              this.clearAlert();
              console.log(`Data loaded! = ${this.state.locations}`);
            })
      .catch(err => {
               console.log(err);
               this.setAlert('danger', err);
               this.setAlertError(err, "Could not load current locations.");
             });
  }

  addLocation(newLocation) {
    axios
      .post(`${API_BASE}/locations.json`, newLocation)
      .then(res => {
              res.data.key = res.data.id;
              this.setState({ locations: [...this.state.locations, res.data] });
              this.clearForm();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not add location. Try a different name.");
             });
    }

  updateLocation(location) {
    axios
      .put(`${API_BASE}/locations/${location.id}.json`, location)
      .then(res => {
              this.loadLocations();
              this.clearForm();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not update location. Try a different name.");
             });
  }

  removeLocation(id) {
    let filteredArray = this.state.locations.filter(item => item.id !== id)
    this.setState({locations: filteredArray});
    axios
      .delete(`${API_BASE}/locations/${id}.json`)
      .then(res => {
              console.log(`Record Deleted`);
              this.clearAlert();
            })
      .catch(err => {
               console.log(err);
               this.setAlertError(err, "Could not remove location.");
             });
  }

  formSubmitted(location) {
    if(this.state.formMode === "new") {
      this.addLocation(location);
    } else {
      this.updateLocation(location);
    }
  }
};

export default Locations;
