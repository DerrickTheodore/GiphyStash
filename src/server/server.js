const express = require('express');
const path = require('path');
const app = express();
const Images = require('./db/db.js');
const bodyparser = require('body-parser')

//To test path output in term 
//console.log(`PATH: ${path.join(__dirname, '/public')}`);
//express.static takes in a directory with you assest to serve up 
//app.use allows us to run middleware functions 
//middleware function run on req & res modifying them
app.use(bodyparser.json()) 
app.use(express.static(path.join(__dirname, '/public')));


//quick query test from docs withing my first get request
//tested on postman
//this request will get all my favorites 
app.get('/allFav', (req, res) => {
  Images.findAll()
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

//Add all selected favorites to database
app.post('/addFav', (req, res) => {
  Images.bulkCreate(req.body)
  .then(images => {
    res.json(images)
  });
})


//update a perviously saved image's rating
app.put('/updateRating/:updateRatingId-:newRatingId', (req, res) => {
  console.log(req.params);
  let imageId = req.params.updateRatingId;
  let newRating = req.params.newRatingId;

  Images.update({rating: newRating}, {where: {id: imageId}})
  .then( (row) => {
    res.json(row);
  })
})




app.listen(4040, () => console.log('listening on port 4040'));