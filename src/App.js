import React from 'react';
import './App.css';
import {Authenticator} from "aws-amplify-react";
import awsConfig from "./aws-exports";
import {AuthWrapper} from "./auth/AuthWrapper";
function App() {
  return (
      <div className="App">
          <Authenticator hideDefault={true} amplifyConfig={awsConfig}>
            <AuthWrapper />
          </Authenticator>
      </div>
  );
}

export default App;
