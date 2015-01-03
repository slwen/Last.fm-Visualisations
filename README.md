Last.fm Visualisations
======================

Useful data visualisations consuming Last.fm API. Built with [webpack](https://github.com/webpack/webpack) and [react.js](https://github.com/facebook/react).

### Install Dependencies

`npm install webpack -g`

`npm install`

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
