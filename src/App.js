import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Amplify} from "aws-amplify";
import awsConfig from "./aws-exports";
import {withAuthenticator} from "aws-amplify-react";

Amplify.configure(awsConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the AWS Demo Site
        </p>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
