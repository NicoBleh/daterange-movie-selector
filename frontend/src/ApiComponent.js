// ApiComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [year, setYear] = useState('');
  const [data, setData] = useState([]);
  const apiUrl = 'http://localhost:3000/movies-form-year/';

  useEffect(() => {
    if (year !== '') {
      fetchData();
    }
  }, [year]);

  const fetchRandomYearData = () => {
    const randomYear = Math.floor(Math.random() * (2011 - 2000) + 2000);
    setYear(randomYear.toString());
  };

  const fetchData = async () => {
    try {

      const response = await axios.get(`${apiUrl}${year}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <label>
        Enter Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <button onClick={fetchRandomYearData}>Random Year</button>

      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.title}>
              <strong>Title:</strong> {item.title}, <strong>Released:</strong> {item.released}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available for the given year.</p>
      )}
    </div>
  );
};

export default ApiComponent;
