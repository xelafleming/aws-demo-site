import React, { Component } from "react";
import {AuthClass as Auth} from "@aws-amplify/auth/lib/Auth";
import PostMessage from "./message/PostMessage";
import MessageFeed from "./message/MessageFeed";

export class InternalApp extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    var auth = new Auth()
    auth.signOut();
  }

  render() {
    if (this.props.authState === "signedIn") {
      return (
          <>
            <nav className="navbar navbar-dark bg-dark">
              <span className="navbar-brand">AWS Demo</span>
              <button className="btn btn-primary" type="submit" onClick={this.signOut}>Sign out!</button>
            </nav>
            <PostMessage />
            <MessageFeed />
          </>
      );
    } else {
      return null;
    }
  }
}