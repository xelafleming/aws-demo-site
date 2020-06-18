import React from "react";
import {Auth} from "aws-amplify";

export class CustomSignIn extends React.Component {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.signIn = this.signIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.state = {};
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.signIn();
  }

  signIn() {
    Auth.federatedSignIn();
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
                  <div className="row">
                    <button type="submit"
                            onClick={this.handleFormSubmission}
                            className="btn btn-primary">Sign in with Roorise!
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