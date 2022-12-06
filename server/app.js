// https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc
const express = require("express");
const app = express();
const configRoutes = require("./routes");
const cors = require('cors')
const session = require('express-session');

const PORT = 8080;

app.use(cors())
app.use(express.json());

app.use(
    session({
      name: 'OgieBank',
      secret: "This is a secret.. shhh don't tell anyone",
      saveUninitialized: false,
      resave: false,
      cookie: {maxAge: 60000}
    })
  );

configRoutes(app);

app.listen(PORT, async () => {
    // await client.connect();
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:8080');
});
