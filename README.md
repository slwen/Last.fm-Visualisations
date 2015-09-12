Last.fm App
======================

A fun app that consumes data from the Last.fm API to display music listening stats, trends and visualisations for a user. Built with [Webpack](https://github.com/webpack/webpack) and [React](https://github.com/facebook/react).

### Requirements

- [Node.js](https://nodejs.org/en/) (v0.10.x)

### Setup

```sh
$ git clone https://github.com/slwen/lastfm-app.git
$ cd lastfm-app
$ npm install webpack -g
$ npm install
```

### Run Dev

* Add a `credentials.json` file to `src/api/` including your Last.fm API key and secret, e.g.

```json
{
  "key": "YOUR_API_KEY",
  "secret": "YOUR_API_SECRET"
}
```

* `npm start`

* Visit: [http://localhost:8080/](http://localhost:8080/)

### Export production bundle.js

`npm run build`

### Test

Tests are written in [jest](https://github.com/facebook/jest).

- `npm test` to run all component tests.
- `npm test COMPONENT_NAME` to run just the test for a single component.
