require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
 
//const passport = require('passport');
app.use(fileUpload());

app.use('/images/items', express.static(`${__dirname}/images/items`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./api/auth/passport')(app)
require('./appRoutes')(app);
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  app.listen(process.env.PORT, function(){
    console.log(`Waiting for connections at port ${process.env.PORT}...`);
  });
})
.catch(error=> console.log(`Error: `+ error));

process.on("SIGINT", () => {
  mongoose.disconnect();
  process.exit();
})
