import {useEffect, useState} from 'react'
import countriesService from './services/countries' 

const Filter = ({country, onCountryChange}) => {
  return (
    <p>find countries <input value={country} onChange={onCountryChange} /></p>
  )
}

/* const Countries = ({countries}) => {
  console.log("Countries Object", countries)
  return (
    countries.map((country, index) => <li key={index}>{country.name}</li>)
  )
} */

const App = () => {
  //Define Phonebook Object
  const [countries, setCountries] = useState([])
   
  //Get list of all countries
  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
        console.log("Collected Object", countries[0])
      })
  },[])

  //define state variables
  const [searchCountry, setSearchCountry] = useState('')
   
  //handle search filter input change
  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)
  }

  //code to filter, sort and return only top 10 countries
  const countriesToShow = searchCountry === ''
    ? []
    : countries.filter(({name}) =>  
        (name.common.toLowerCase()).includes(searchCountry.toLowerCase())     
      ).sort((a, b) => a.name.common.localeCompare(b.name.common))

  
  return (
    <div>
      <h1>Countries App</h1>
      <Filter 
        country={searchCountry}
        onCountryChange = {handleCountryChange}
      />
      <ul>
          { countriesToShow.length > 10
              ? <p>Too many matches, specify another filter</p>
              : countriesToShow
                  .slice(0, 10)
                  .map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    </div>
  );
}

export default App;
