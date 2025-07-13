import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchTerm = searchedCountry.trim().toLowerCase();
      if (searchTerm) {
        const filtered = countries.filter((country) =>
          country.common.toLowerCase().includes(searchTerm)
        );
        setFilteredCountries(filtered);
      } else {
        setFilteredCountries(countries);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchedCountry, countries]);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          onChange={(event) => setSearchedCountry(event.target.value)}
          placeholder="Search countries..."
          value={searchedCountry}
          className="search-input"
        />
      </div>
      <div className="countries-container">
        {filteredCountries.map((country) => (
          <div key={country.abbr} className="countryCard">
            <img
              src={country.png}
              alt={`Flag of ${country.common}`}
              className="country-flag"
            />
            <p className="country-name">{country.common}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
