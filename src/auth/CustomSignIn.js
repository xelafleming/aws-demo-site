import React from "react";
import {AuthClass as Auth} from "@aws-amplify/auth/lib/Auth";

export class CustomSignIn extends React.Component {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this._auth = new Auth();
    this.signIn = this.signIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.state = {};
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.signIn();
  }

  async signIn() {
    const username = this.inputs.username;
    const password = this.inputs.password;
    await this._auth.signIn(username, password);
    this.props.onStateChange("signedIn", {});
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {};
    const {name, value, type, checked} = evt.target;
    const check_type = ["radio", "checkbox"].includes(type);
    this.inputs[name] = check_type ? checked : value;
    this.inputs["checkedValue"] = check_type ? value : null;
    this.setState({error: ""});
  }

  render() {
    if (this._validAuthStates.includes(this.props.authState)) {
      return (
          <div className="row">
            <div className="card mx-auto mt-5">
              <div className="card-body">
                <h4 className="card-title">AWS Demo</h4>
                <h6 className="card-title">Please sign in</h6>
                <form className="mx-auto p-5">
                  <div className="form-group row">
                    <label htmlFor="email">Username/Email:</label>
                    <input type="email"
                           id="username"
                           key="username"
                           name="username"
                           onChange={this.handleInputChange}
                           className="form-control"
                           placeholder="example@example.com"/>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                           id="password"
                           key="password"
                           name="password"
                           onChange={this.handleInputChange}
                           className="form-control"
                           placeholder="********"/>
                  </div>
                  <div className="row">
                    <button type="submit"
                            onClick={this.handleFormSubmission}
                            className="btn btn-primary">Sign in!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      );
    } else {
      return null;
    }
  }
}