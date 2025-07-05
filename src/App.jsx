import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="countries-container">
      {countries.map((country) => (
        <div key={country.abbr} className="country-card">
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            className="country-flag"
          />
          <p className="country-name">{country.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
