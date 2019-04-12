import React from 'react';
import axios from 'axios';

import './Providers.css';

const API_BASE = 'http://localhost:8000/';

class ProviderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.provider.username,
      fname: props.provider.fname,
      lname: props.provider.lname,
      email: props.provider.email,
      id: props.provider.id
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  renderButtons() {
    if (this.props.formMode === "new") {
      return(
        <button type="submit" id="createButton" className="btn btn-primary">Create</button>
      );
    } else {
      return(
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="provider-form">
        <h3> Create new provider </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" autoComplete='given-name'
              name="fname" id="fname" placeholder="First Name"
              value={this.state.fname} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" className="form-control" autoComplete='family-name'
              name="lname" id="lname" placeholder="Last Name"
              value={this.state.lname} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" autoComplete='username'
              name="username" id="username" placeholder="Username"
              value={this.state.username} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" autoComplete='email'
                name="email" id="email" placeholder="name@example.com"
                value={this.state.email} onChange={this.handleInputChange}/>
          </div>
          {this.renderButtons()}
        </form>
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
    this.props.onSubmit({
      fname: this.state.fname,
      lname: this.state.lname,
      username: this.state.username,
      email: this.state.email,
      id: this.state.id,
    });
    event.preventDefault();
  }

  handleCancel(event) {
    this.props.onCancel("new", {fname:"", lname:"", username: "", email:""});
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
      <td className="col-md-2 btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
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

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      formMode: "new",
      provider: {lname:"", fname:"", username:"", email:"", id: "9999999"}
    };
    this.updateForm = this.updateForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.loadProviders = this.loadProviders.bind(this);
    this.removeProvider = this.removeProvider.bind(this);
    this.addProvider = this.addProvider.bind(this);
    this.updateProvider = this.updateProvider.bind(this);
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  render() {
    return (
      <div className="providers">
        <h1> Providers </h1>
        <ProviderForm
          onSubmit={(provider) => this.formSubmitted(provider)}
          onCancel={(mode,provider) => this.updateForm(mode,provider)}
          formMode={this.state.formMode}
          provider={this.state.provider}
          key={this.state.provider.id}
        />
        <ProviderList
          providers={this.state.providers}
          onDelete={(id) => this.removeProvider(id)}
          onEdit={(mode,provider) => this.updateForm(mode,provider)}
        />
      </div>
    );
  }

  componentDidMount() {
    console.log('Providers mounted!')
    this.loadProviders();
  }

  updateForm(mode, providerVals) {
    this.setState({
      provider: Object.assign({}, providerVals),
      formMode: mode,
    });
  }

  clearForm() {
    console.log("clear form");
    this.updateForm("new", {fname:"", lname:"", email:"", username:"", id: "99999999"});
  }

  loadProviders() {
    axios
      .get(`${API_BASE}/providers.json`)
      .then(res => {
              this.setState({ providers: res.data });
              console.log(`Data loaded! = ${this.state.providers}`)
            })
      .catch(err => console.log(err));
  }

  addProvider(newProvider) {
    axios
      .post(`${API_BASE}/providers.json`, newProvider)
      .then(res => {
              res.data.key = res.data.id;
              this.setState({ providers: [...this.state.providers, res.data] });
            })
      .catch(err => console.log(err));
    }

  updateProvider(provider) {
    axios
      .put(`${API_BASE}/providers/${provider.id}.json`, provider)
      .then(res => {
              this.loadProviders();
            })
      .catch(err => console.log(err));
  }

  removeProvider(id) {
    let filteredArray = this.state.providers.filter(item => item.id !== id)
    this.setState({providers: filteredArray});
    axios
      .delete(`${API_BASE}/providers/${id}.json`)
      .then(res => {
              console.log(`Record Deleted`);
              //this.clearForm();
            })
      .catch(err => console.log(err));
  }

  formSubmitted(provider) {
    if(this.state.formMode === "new") {
      this.addProvider(provider);
    } else {
      this.updateProvider(provider);
    }
    this.clearForm();
  }
};

export default Providers;

//////////////////////////
// import axios from 'axios';

// const API_BASE = 'https://bugtracker-kk.herokuapp.com';

// class ProviderForm extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       fname: props.provider.fname,
//       lname: props.provider.lname,
//       email: props.provider.email,
//       id: props.provider.id
//     };
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleCancel = this.handleCancel.bind(this);
//   }
//
//   renderButtons() {
//     if (this.props.formMode === "new") {
//       return(
//         <button type="submit" className="btn btn-primary">Create</button>
//       );
//     } else {
//       return(
//         <div className="form-group">
//           <button type="submit" className="btn btn-primary">Save</button>
//           <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
//         </div>
//       );
//     }
//   }
//
//   render() {
//     return (
//       <div className="provider-form">
//         <h1> Providers </h1>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label>First Name</label>
//             <input type="text" className="form-control" autoComplete='given-name'
//               name="fname" id="fname" placeholder="First Name"
//               value={this.state.fname} onChange={this.handleInputChange}/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="lname">Last Name</label>
//             <input type="text" className="form-control" autoComplete='family-name'
//               name="lname" id="lname" placeholder="Last Name"
//               value={this.state.lname} onChange={this.handleInputChange}/>
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email address</label>
//               <input type="email" className="form-control" autoComplete='email'
//                 name="email" id="email" placeholder="name@example.com"
//                 value={this.state.email} onChange={this.handleInputChange}/>
//           </div>
//           {this.renderButtons()}
//         </form>
//       </div>
//     );
//   }
//
//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     });
//   }
//
//   handleSubmit(event) {
//     this.props.onSubmit({
//       fname: this.state.fname,
//       lname: this.state.lname,
//       email: this.state.email,
//       id: this.state.id,
//     });
//     event.preventDefault();
//   }
//
//   handleCancel(event) {
//     this.props.onCancel("new", {fname:"", lname:"", email:""});
//     event.preventDefault();
//   }
// }
//
// const ProviderList = (props) => {
//   const providerItems = props.providers.map((provider) => {
//     return (
//       <ProviderListItem
//         fname={provider.fname}
//         lname={provider.lname}
//         email={provider.email}
//         id={provider.id}
//         key={provider.id}
//         onDelete={props.onDelete}
//         onEdit={props.onEdit}
//       />
//     )
//   });
//
//   return (
//     <div className="provider-list">
//       <table className="table table-hover">
//         <thead>
//           <tr>
//             <th className="col-md-3">First Name</th>
//             <th className="col-md-3">Last Name</th>
//             <th className="col-md-3">Email</th>
//             <th className="col-md-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {providerItems}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const ProviderListItem = (props) => {
//   return (
//     <tr>
//       <td className="col-md-3">{props.fname}</td>
//       <td className="col-md-3">{props.lname}</td>
//       <td className="col-md-3">{props.email}</td>
//       <td className="col-md-3 btn-toolbar">
//         <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props)}>
//           <i className="glyphicon glyphicon-pencil"></i> Edit
//         </button>
//         <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
//           <i className="glyphicon glyphicon-remove"></i> Delete
//         </button>
//       </td>
//     </tr>
//   );
// }

// class Providers extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       providers: [],
//       formMode: "new",
//       provider: {lname:"", fname:"", email:"", id: "9999999"}
//     };
//     this.updateForm = this.updateForm.bind(this);
//     this.clearForm = this.clearForm.bind(this);
//     this.loadProviders = this.loadProviders.bind(this);
//     this.removeProvider = this.removeProvider.bind(this);
//     this.addProvider = this.addProvider.bind(this);
//     this.updateProvider = this.updateProvider.bind(this);
//     this.formSubmitted = this.formSubmitted.bind(this);
//   }
//
//   render() {
//     return (
//       <div className="providers">
//         <ProviderForm
//           onSubmit={(provider) => this.formSubmitted(provider)}
//           onCancel={(mode,provider) => this.updateForm(mode,provider)}
//           formMode={this.state.formMode}
//           provider={this.state.provider}
//           key={this.state.provider.id}
//         />
//         <ProviderList
//           providers={this.state.providers}
//           onDelete={(id) => this.removeProvider(id)}
//           onEdit={(mode,provider) => this.updateForm(mode,provider)}
//         />
//       </div>
//     );
//   }
//
//   componentDidMount() {
//     console.log('Providers mounted!')
//     this.loadProviders();
//   }
//
//   updateForm(mode, providerVals) {
//     this.setState({
//       provider: Object.assign({}, providerVals),
//       formMode: mode,
//     });
//   }
//
//   clearForm() {
//     console.log("clear form");
//     this.updateForm("new",{fname:"",lname:"",email:"", id: "99999999"});
//   }
//
//   loadProviders() {
//     axios
//       .get(`${API_BASE}/providers.json`)
//       .then(res => {
//               this.setState({ providers: res.data });
//               console.log(`Data loaded! = ${this.state.providers}`)
//             })
//       .catch(err => console.log(err));
//   }
//
//   addProvider(newProvider) {
//     axios
//       .post(`${API_BASE}/providers.json`, newProvider)
//       .then(res => {
//               res.data.key = res.data.id;
//               this.setState({ providers: [...this.state.providers, res.data] });
//             })
//       .catch(err => console.log(err));
//     }
//
//   updateProvider(provider) {
//     axios
//       .put(`${API_BASE}/providers/${provider.id}.json`, provider)
//       .then(res => {
//               this.loadProviders();
//             })
//       .catch(err => console.log(err));
//   }
//
//   removeProvider(id) {
//     let filteredArray = this.state.providers.filter(item => item.id !== id)
//     this.setState({providers: filteredArray});
//     axios
//       .delete(`${API_BASE}/providers/${id}.json`)
//       .then(res => {
//               console.log(`Record Deleted`);
//               //this.clearForm();
//             })
//       .catch(err => console.log(err));
//   }
//
//   formSubmitted(provider) {
//     if(this.state.formMode === "new") {
//       this.addProvider(provider);
//     } else {
//       this.updateProvider(provider);
//     }
//     this.clearForm();
//   }
// }
