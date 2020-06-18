import React from 'react';
import './App.css';
import {Auth} from "aws-amplify"
import {Authenticator} from "aws-amplify-react";
import awsConfig from "./aws-exports";
import {AuthWrapper} from "./auth/AuthWrapper";

Auth.configure(awsConfig)

function App() {
  return (
      <div className="App">
          <Authenticator hideDefault={true}>
            <AuthWrapper />
          </Authenticator>
      </div>
  );
}

export default App;
