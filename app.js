// https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const PORT = process.env.PORT || 8080;
const APPNAME = 'Ogie Bank'

app.use(cors())
app.use(express.json());

app.use(
    session({
      name: 'OgieBank',
      secret: "This is a secret.. shhh don't tell anyone",
      saveUninitialized: false,
      resave: false,
      cookie: {maxAge: 18000000}
    })
  );

configRoutes(app);

// static file declaration
if (process.env.NODE_ENV === 'production') {
  // prod mode
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
else {
  app.use(express.static('client/public'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
  })
}

app.listen(PORT, async () => {
    // await client.connect();
      console.log('\x1b[32m%s\x1b[0m', `*************************************\n${APPNAME} Application Started Smoothly on port ${PORT}\n`)
      console.log('\x1b[32m%s\x1b[0m', `Your routes will be running on ${PORT}\n*************************************`)
});
