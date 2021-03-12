export interface Config {
  isDevelopment: boolean;
  gqlHttpUrl: string;
}

// Application build config. We don't check if variables are passed, due to
// this logic is placed in prebuild.js file
const config: Config = {
  isDevelopment: Boolean(process.env.NODE_ENV === 'development'),
  gqlHttpUrl: process.env.REACT_APP_GQL_HTTP_URL || '',
};

export default config;
