# Project Overview

This project is an implementation that displays the Neo4J Movies Graph Example. It fetches data through an ExpressJS application and consumes the results in a basic React application.

## Project Parts

### ExpressJS API

To get started, you have to add your personal Neo4J credentials into the `.env` file in the 'api' folder. You can obtain a test movie database at [Neo4j Sandbox](https://sandbox.neo4j.com/?usecase=movies&ref=developer-ex-data).

The Express API starts with `node api.js` running on localhost port 3000.

### React Frontend

The React app enriches the movie data with a movie poster from OMDB. To use that functionality, you have to obtain an API key at [OMDb API Key](http://www.omdbapi.com/apikey.aspx). The API key needs to be placed into the `.env` file in the 'frontend' folder.

The React frontend starts with 'npm start' running on localhost port 4000.
