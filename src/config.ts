export interface Config {
  gqlHttpUrl: string;
}

// Application build config. We don't check if variables are passed, due to
// this logic is placed in prebuild.js file
const config: Config = {
  gqlHttpUrl: process.env.REACT_APP_GQL_HTTP_URL || '',
};

export default config;
