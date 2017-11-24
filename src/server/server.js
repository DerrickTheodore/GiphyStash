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

//Add selected favorites to database
app.post('/addFaves', (req, res) => {
  Images.create(req.body)
  .then(images => {
    res.json(images)
  });
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
  console.log(req.params);
  let imageId = req.params.updateRatingId;
  let newRating = req.params.newRatingId;

  Images.update({rating: newRating}, {where: {id: imageId}})
  .then( (row) => {
    res.json(row);
  })
})

//Adding this route so we can respond to any possible URI request
app.get('/*' , (req, res) => {
  res.send(403, 'Endpoint Not Found');
  /**
   * TODO:
   * Create HTML file to render an error message with an associted gif, and a link to homepage
   */
})

app.listen(4040, () => console.log('listening on port 4040'));