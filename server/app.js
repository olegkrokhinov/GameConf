require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const { initDb } = require('./initDb');


app.use(fileUpload());
app.use('/images/items', express.static(`${__dirname}/images/items`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./api/auth/passport')(app)
require('./appRoutes')(app);


const db_uri = process.env.DB_URI ?
  process.env.DB_URI : 'mongodb://gameconf-db:27017/gameconf';

const port = process.env.PORT ?
  process.env.PORT : 8080;

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    initDb();
    app.listen(port, function () {
      console.log(`Waiting for connections at port ${port}...`);
    });
  })
  .catch(error => console.log(`Error: ` + error));

process.on("SIGINT", () => {
  mongoose.disconnect();
  process.exit();
})
