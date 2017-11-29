const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/db.js');
const User = db.Users;
const Images = db.Images;
const bodyparser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

//To test path output in term 
//console.log(`PATH: ${path.join(__dirname, '/public')}`);
//express.static takes in a directory with you assest to serve up 
//app.use allows us to run middleware functions 
//middleware function run on req & res modifying them
app.use(session({
  secret: 'Adventure Time',
  resave: true,
  saveUninitialized: true,
}));
app.use(bodyparser.json()); 
app.use(express.static(path.join(__dirname, '/public')));


//quick query test from docs withing my first get request
//tested on postman
//this request will get all my favorites
app.post('/login/username/:usernameId/password/:passwordId', (req, res) => {
  console.log(`[ LOGIN ]req.params: ${JSON.stringify(req.params)}`);
  User.findOne({where: {usernameId: req.params.usernameId}})
  .then( (found) => {
    if(!found) {
      res.redirect('/signup')
    } else {
    console.log(`found[ LOGIN ]: ${JSON.stringify(found)}`);
    found.comparePassword(req.params.passwordId, found.get('passwordId'), (result) => {
      if(result) { 
      req.session.regenerate(function() {
        console.log(`found [Seesion] => ${found}`)
        req.session.user = found;
        res.redirect('/');
      });
      } else {
        res.redirect('/login')
      } 
    })
    }
  })
})

app.post('/signup/username/:usernameId/password/:passwordId', (req, res) => {
  User.findOne({attributes: ['usernameId'], where: {usernameId: req.params.usernameId}})
  .then( (found) => {
    if(!found) {
      User.create(req.params)
      .then( (newUser) => {
        newUser.hashPassword(newUser.get('passwordId'), () => {
          //here
          newUser.save()
          .then( (result) => {
            req.session.regenerate(function() {
              req.session.user = result;
              res.redirect('/');
            });
          })
          .catch((err) => console.error('error::', err))          
        })
      })
      .catch((err) => console.error('error:::', err))      
    } else {
      if( found.comparePassword(req.params.passwordId, found.get('passwordId')) ) {
        req.session.regenerate(function() {
          req.session.user = found;
          res.redirect('/');
        });
      } else {
        res.redirect('/login');
      }
    }
  })
})

app.get('/allFav', (req, res) => {
  /**
   * options.order:
   * Order results in ascending order by primary key
   */
  Images.findAll({order: [
    ['id', 'ASC']
  ]})
  .then(images => {
    res.json(images)
  });
})

//grab all with certain rating 
app.get('/rating/:ratingId', (req, res) => {
  Images.findAll({where: {
                  rating: req.params.ratingId
                } 
  })
  .then(images => {
    res.json(images)
  });
})

//Add selected favorites to database
app.post('/addFaves', (req, res) => {  
  req.body.userIdNumber = req.session.user.id
  Images.create(req.body)
  .then((images) => {
    res.json(images)
  })
  .catch((err) => console.error('error:::', err))
})

//delete fav by id off req.params.imageId
app.delete('/image/:imageId', (req, res) => {
  Images.find({where: {id: req.params.imageId} })
  .then(image => {
    console.log(`image: ${image}`);
    return image.destroy({force: true});
  }).then(() => res.json());
})

//update a perviously saved image's rating
app.put('/updateRating/:updateRatingId-:newRatingId', (req, res) => {
  let imageId = req.params.updateRatingId;
  let newRating = req.params.newRatingId;

  Images.update({rating: newRating}, {where: {id: imageId}})
  .then( (row) => {
    res.json(row);
  })
})

//Adding this route so we can respond to any possible URI request
app.get('/*' , (req, res) => {
   res.sendFile(__dirname + '/public/index.html'); 
})

app.listen(4040, () => console.log('listening on port 4040'));