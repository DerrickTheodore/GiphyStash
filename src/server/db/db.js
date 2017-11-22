const CREDENTIALS = require('../CREDENTIALS');
const Sequelize = require('sequelize');

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
const Images = sequelize.define('images', {
  //first attribute will be a string of the image url link thats unique
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  //second attribte will be an integer that defaults at 0
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

//this creates table based off Schema above
//Alright, now we can CRUD some data 
Images.sync({force: true}).then(() => {
  //we can populate it with some data too
  return Images.bulkCreate([
    {
      url: 'https://...someImageUrl0',
      rating: 1
    },
    {
      url: 'https://...someImageUrl1',
      rating: 3
    },
    {
      url: 'https://...someImageUrl2',
      rating: 5
    },
    {
      url: 'https://...someImageUrl3'
    }
  ]);
})


module.exports = Images;