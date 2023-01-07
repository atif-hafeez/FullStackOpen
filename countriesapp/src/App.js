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

  //code to filter list
  const countriesToShow = searchCountry === ''
    ? []
    : countries.filter(({name}) =>  
        (name.common.toLowerCase()).includes(searchCountry.toLowerCase())     
      )
  
  return (
    <div>
      <h1>Countries App</h1>
      <Filter 
        country={searchCountry}
        onCountryChange = {handleCountryChange}
      />
      <ul>
          {countriesToShow.map(country => <li>{country.name.common}</li>)}
      </ul>
    </div>
  );
}

export default App;
