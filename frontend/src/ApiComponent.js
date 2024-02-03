// ApiComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const ApiComponent = () => {
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
  const apiUrl = 'http://localhost:3000/movies-form-year/';
  const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY || '';

  useEffect(() => {
    if (year !== '') {
      fetchData();
    }
  }, [year]);

  const fetchRandomYearData = () => {
    const randomYear = Math.floor(Math.random() * 11 + 2000);
    setYear(randomYear.toString());
  };

  const fetchMovieDetails = async (title, released) => {
    try {
      const posterResponse = await axios.get(
        `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${omdbApiKey}`
      );
      return {
        title,
        released,
        poster: posterResponse.data.Poster,
      };
    } catch (error) {
      console.error(`Error fetching details for ${title}:`, error);
      return {
        title,
        released,
        poster: null,
      };
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}${year}`);
      setData(response.data);

      // Fetch movie details for each movie in the response
      const movieDetailsPromises = response.data.map((movie) =>
        fetchMovieDetails(movie.title, movie.released)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);

      setData(movieDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Clear data on error
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="flex-grow-1 me-2">
          <label className="mb-0">
            Enter Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div>
          <button onClick={fetchRandomYearData} className="btn btn-primary">
            Random Year
          </button>
        </div>
      </div>

      {data.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.map((item) => (
            <div key={item.title} className="col">
              <div className="card h-100">
                <img src={item.poster} className="card-img-top" alt={`${item.title} Poster`} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text"><strong>Released:</strong> {item.released}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3">{year !== '' ? 'No data available for the given year.' : 'Enter a year or use Random Year.'}</p>
      )}
    </div>
  );
};

export default ApiComponent;
