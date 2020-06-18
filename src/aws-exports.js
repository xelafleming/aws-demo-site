const awsConfig = {
  Auth: {
    region: "eu-west-1",
    userPoolId: "eu-west-1_3GiYISyAa",
    userPoolWebClientId: "7p6vdu3te9h494vilkglhnppk",
    oauth: {
      domain: "auth.roorise.dev",
      scope: [
        "profile",
        "openid"
      ],
      redirectSignIn: "http://demo.roorise.dev",
      redirectSignOut: "http://demo.roorise.dev",
      responseType: "code"
    }
  }
};

export default awsConfig;