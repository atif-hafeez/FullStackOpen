import {useEffect, useState} from 'react'
import countryService from './services/countries' 

const Filter = ({country, onCountryChange}) => {
  return (
    <p>find countries <input value={country} onChange={onCountryChange} /></p>
  )
}

const CountryDetail = ({country}) => {
  console.log("Selected Country Should be Switzerland", country)
  
  //if country is not defined then return from the function
  if(typeof(country) == 'undefined') {
    return;
  }

  const languages = Object.values(country.languages)
  console.log("List of languages are", languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>
          capital {country.capital}<br />
          area {country.area}
        </p>
        <p><strong>languages:</strong></p>
        <ul>{languages.map(lang => <li key={lang}>{lang}</li>)}</ul>
        <img 
          src={country.flags.svg} 
          alt={`flag of ${country.name.common}`}
          width="300"
        />
      </div>
    </div>
  )
}
//Displays List of Countries
const CountriesList = ({countriesToShow, onShowDetails}) => {
  return (
    <>
      <p>List of All Countries</p>
      <ul> { 
        countriesToShow
          .slice(0, 10)
          .map(country => 
          <div key={country.name.common}>
            <li >{country.name.common} <button onClick={event => onShowDetails(country)}>Show</button>
            </li>
          </div>
          )}
      </ul>
    </> 
  )
}



const App = () => {
  //Define Phonebook Object
  const [countries, setCountries] = useState([])
   
  //Get list of all countries
  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
  },[])

  //define state variables
  const [searchCountry, setSearchCountry] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [showCountry,setShowCountry] = useState('')
     
  //handle search filter input change
  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)
    setShowDetails(false)
    
  }

  const handleShowDetails = (country) => {
    setShowCountry(country)
    setShowDetails(true)
  }

  //code to filter, sort and return only top 10 countries
  const countriesToShow = searchCountry === ''
    ? []
    : countries.filter(({name}) =>  
        (name.common.toLowerCase()).includes(searchCountry.toLowerCase())     
      ).sort((a, b) => a.name.common.localeCompare(b.name.common))

  //code to find the country
  const selectedCountry = showDetails
    ? showCountry
    : countries.find(country => (country.name.common.toLowerCase()).includes(searchCountry.toLowerCase()))

  return (
    <div>
      <h1>Countries App</h1>
      <Filter 
        country={searchCountry}
        onCountryChange = {handleCountryChange}
      />

      {/* Display list of countries */}
      { 
          countriesToShow.length > 10 
            ? <p>Too many matches, specify another filter</p>
            : countriesToShow.length > 1 && !showDetails
                ? <CountriesList
                    countriesToShow={countriesToShow}
                    onShowDetails={handleShowDetails} />
                : countriesToShow.length === 1 || showDetails
                  ? <CountryDetail country={selectedCountry}/>
                  : <div></div>
      }
    </div>
  );
}

export default App;
