import React, { Component } from "react";
import Feed from "./message/Feed";
import {Auth} from "aws-amplify";

export class InternalApp extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    Auth.signOut();
  }

  render() {
    if (this.props.authState === "signedIn") {
      return (
          <>
            <nav className="navbar navbar-dark bg-dark">
              <span className="navbar-brand">AWS Demo</span>
              <button className="btn btn-primary" type="submit" onClick={this.signOut}>Sign out!</button>
            </nav>
            <Feed />
          </>
      );
    } else {
      return null;
    }
  }
}