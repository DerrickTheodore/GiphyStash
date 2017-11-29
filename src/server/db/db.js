const CREDENTIALS = require('../CREDENTIALS');
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));


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
    defaultValue: 1
  },
  userIdNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  classMethods: {
    associate: function(models) {
      Images.belongsToMany(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
})

const Users = sequelize.define('users', {
    usernameId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }, 
    passwordId: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Images, {
          onDelete: 'cascade',
          foreignKey: {
              field: "userId",
              name: "userId",
              allowNull: false
          }
        });
      }
    }
  }
)


Users.prototype.hashPassword = function(password, callback) {
  console.log(`password [prototype] ${password}`)
  bcrypt.hash(password, null, null, (err, hash) => {
    if(err) throw err    
    this.set('passwordId', hash);
    callback()    
  })
},
Users.prototype.comparePassword = function(passedPassword, hashedPassword, callback) {
  console.log(`p: ${passedPassword}, h: ${hashedPassword}`)
  bcrypt.compare(passedPassword, hashedPassword, (err, res) => {
    console.log(`boolean: ${res}`)    
    if(err) throw err
    callback(res)
  })
}


Images.sync({force: true}, {returning: true}).then(() => {
});

Users.sync({force: true}, {returning: true}).then(() => {
  // Users.create({usernameId: 'User', passwordId: 'password'}, {returning: true})
});



module.exports.Images = Images;
module.exports.Users = Users;