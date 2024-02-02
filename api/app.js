'use strict'

require("dotenv").config();

var express = require('express');

/* setup neo4j */
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(process.env.MOVIE_DATABASE_URL,
  neo4j.auth.basic(process.env.MOVIE_DATABASE_USERNAME, process.env.MOVIE_DATABASE_PASSWORD), 
  {/* encrypted: 'ENCRYPTION_OFF' */});

var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/movies-form-year/:year', function(req, res){
  var query =
  `
  MATCH (m:Movie)
  WHERE m.released = $year
  RETURN m.title as title, m.released as released
  `;

var params = {"year": parseInt(req.params['year'])};

var session = driver.session({database:"neo4j"});

var response = [];

session.run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
        response.push({"title": record.get('title'), "released": record.get('released')});
    });
    session.close();

    res.json({"movies": response});
  })
  .catch((error) => {
    console.error(error);
  });

});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

process.on('SIGINT', function() {
  driver.close();
  console.log("Bye bye.");
  process.exit(0);
});
