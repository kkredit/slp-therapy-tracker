import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import NotificationAlert from '../helpers/NotificationAlert.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import './Providers.css'

function getClearFormId(currentId) {
  return (currentId === "999999") ? "888888" : "999999";
}

class ProviderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.provider.username,
      fname: props.provider.fname,
      lname: props.provider.lname,
      email: props.provider.email,
      id: props.provider.id,
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
      <div className="provider-form">
        <h3> Create new provider </h3>

        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                name="fname"
                defaultValue={this.state.fname}
                onChange={e => this.handleInputChange(e)}
                required
                type="text"
                autoComplete='given-name'
                placeholder="First"
                pattern="[a-zA-Z]{1,20}"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name between 1 and 20 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="lname"
                defaultValue={this.state.lname}
                onChange={e => this.handleInputChange(e)}
                required
                type="text"
                autoComplete='family-name'
                placeholder="Last"
                pattern="[a-zA-Z]{1,20}"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name between 1 and 20 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                defaultValue={this.state.username}
                onChange={e => this.handleInputChange(e)}
                type="text"
                placeholder="Username"
                pattern="[a-zA-Z.0-9]{5,20}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username between 5 and 20 characters. You may use letters, numbers,
                and '.'s.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                defaultValue={this.state.email}
                onChange={e => this.handleInputChange(e)}
                type="email"
                autoComplete='email'
                placeholder="name@example.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
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
        fname: this.state.fname,
        lname: this.state.lname,
        username: this.state.username,
        email: this.state.email,
        id: this.state.id,
      });
      event.preventDefault();
    }
    this.setState({ validated: true });
  }

  handleCancel(event) {
    this.props.onCancel("new", {fname:"", lname:"", username: "", email:"",
                                id: getClearFormId(this.state.provider.id)});
    event.preventDefault();
  }
}

const ProviderListItem = (props) => {
  return (
    <tr>
      <td className="col-md-2">{props.fname}</td>
      <td className="col-md-2">{props.lname}</td>
      <td className="col-md-2">{props.username}</td>
      <td className="col-md-2">{props.email}</td>
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

const ProviderList = (props) => {
  const providerItems = props.providers.map((provider) => {
    return (
      <ProviderListItem
        fname={provider.fname}
        lname={provider.lname}
        username={provider.username}
        email={provider.email}
        id={provider.id}
        key={provider.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="provider-list">
      <h3> Current providers </h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-2">First Name</th>
            <th className="col-md-2">Last Name</th>
            <th className="col-md-2">Username</th>
            <th className="col-md-2">Email</th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {providerItems}
        </tbody>
      </table>
    </div>
  );
}

export default class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: props.db,
      formMode: "new",
      provider: {lname:"", fname:"", username:"", email:"", id: "999999"},
      alertActive: false,
      alertVariant: '',
      alertText: ''
    };
    this.setAlert = this.setAlert.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
    this.removeProvider = this.removeProvider.bind(this);
    this.addProvider = this.addProvider.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      db: props.db
    };
  }

  render() {
    return (
      <div className="providers">
        <h1> Providers </h1>
        <NotificationAlert active={this.state.alertActive}
                           variant={this.state.alertVariant}
                           text={this.state.alertText} />
        <ProviderForm
          onSubmit={(provider) => this.formSubmitted(provider)}
          onCancel={(mode,provider) => this.updateForm(mode,provider)}
          formMode={this.state.formMode}
          provider={this.state.provider}
          key={this.state.provider.id}
        />
        <ProviderList
          providers={this.state.db.providers}
          onDelete={(id) => this.removeProvider(id)}
          onEdit={(mode,provider) => this.updateForm(mode,provider)}
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
                    {err.message}: {err.response ? err.response.statusText : "No response"}<br />
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

  updateForm(mode, providerVals) {
    this.clearAlert();
    this.setState({
      provider: Object.assign({}, providerVals),
      formMode: mode,
    });
  }

  clearForm() {
    this.clearAlert();
    this.updateForm("new", {fname:"", lname:"", email:"", username:"",
                            id: getClearFormId(this.state.provider.id)});
  }

  formSubmitted(provider) {
    if(this.state.formMode === "new") {
      this.addProvider(provider);
    } else {
      this.updateProvider(provider);
    }
  }

  addProvider(newProvider) {
    this.state.db.postProvider(newProvider, this.clearForm,
                               (err) => {
                                 this.setAlertError(err, "Could not add provider. Try a different username.");
                               });
  }

  updateProvider(provider) {
    this.state.db.putProvider(provider, this.clearForm,
                              (err) => {
                                this.setAlertError(err, "Could not update provider. Try a different username.");
                              });
  }

  removeProvider(id) {
    this.state.db.deleteProvider(id, this.clearAlert,
                                 (err) => {
                                   this.setAlertError(err, "Could not delete provider.");
                                 });
  }
};
