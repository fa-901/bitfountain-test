# bitfountain-test

Technical test for Bitfountain. Built with React, TS, Bootstrap

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Running

Open `localhost:1234` in your browser


### Notes/Assumptions:
- The 'access_token' from the API is used in the authorization header. Without an updated access token, the APIs return 403 error.
