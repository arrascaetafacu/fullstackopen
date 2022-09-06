import { useEffect, useState } from 'react'
import axios from 'axios'

const Search = ({value, handleOnChange}) => {
  return (
    <div>
      find countries <input value={value} onChange={handleOnChange} /> 
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return "To many matches, specify another filter"
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(country => (
        <li key={country.name.common}>{country.name.common} {country.flag}</li>
      ))}
    </div>
  )
}

const Country = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <li>capital: {country.capital[0]}</li>
      <li>area: {country.area} km²</li>
      <li>region: {country.region}</li>
      <li>subregion: {country.subregion}</li>
      <li>population: {country.population} </li>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(l =>
          <li key={l}>{l}</li>
        )}
      </ul>
      <img src={country.flags.png} alt="flag" />
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const countriesToShow = countries.filter(country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div>
      <Search value={search} handleOnChange={handleSearchChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
