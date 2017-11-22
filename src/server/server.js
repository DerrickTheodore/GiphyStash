const express = require('express');
const path = require('path');
const app = express();


console.log(`PATH: ${path.join(__dirname, '/public')}`);
//express.static takes in a directory with you assest to serve up 
//app.use allows us to run middleware functions 
//middleware function run on req & res modifying them 
app.use(express.static(path.join(__dirname, '/public')));

app.listen(4040, () => console.log('listening on port 4040'));