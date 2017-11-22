const express = require('express');
const path = require('path');
const CREDENTIALS = require('./CREDENTIALS');
const Sequelize = require('sequelize');
const app = express();

//To test path output in term 
//console.log(`PATH: ${path.join(__dirname, '/public')}`);
//express.static takes in a directory with you assest to serve up 
//app.use allows us to run middleware functions 
//middleware function run on req & res modifying them 
app.use(express.static(path.join(__dirname, '/public')));

//Sequelize Setup with Postgres Database:
const sequelize = new Sequelize('imgurcloneapp', CREDENTIALS.Username, CREDENTIALS.Password, {
  host: 'localhost',
  dialect: 'postgres'
})

//Test our connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

//Alright got "Connected" log to my term where server running 

//Models:
//So, right now, we're only storing favorited images urls and user rating
const Image = sequelize.define('image', {
  //first attribute will be a string of the image url link thats unique
  url: {
    type: Sequelize.STRING,
    unique: true
  },
  //second attribte will be an integer that defaults at 0
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

//this creates table based off Schema above
//Alright, now we can CRUD some data 
Image.sync({force: true}).then(() => {
  //we can populate it with some data too
  return Image.create({
    url: 'https://...someImageUrl',
    rating: 1
  });
});




app.listen(4040, () => console.log('listening on port 4040'));