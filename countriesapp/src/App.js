import {useEffect, useState} from 'react'
import countriesService from './services/countries' 

const Filter = ({country, onCountryChange}) => {
  return (
    <p>
      find countries <input 
        value={country} 
        onChange={onCountryChange} 
        placeholder="Select a country" 
      />
    </p>
  )
}

const CountryDetail = ({country}) => {
  console.log("Selected Country Should be Switzerland", country)
  
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
        <ul>
          {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img 
          src={country.flags.svg} 
          alt={`flag of ${country.name.common}`}
          width="300"
        />
      </div>
    </div>
  )
}



const App = () => {
  //Define Phonebook Object
  const [countries, setCountries] = useState([])
   
  //Get list of all countries
  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
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

         
      {
        /* Display List only if number of matching countries
        is less than 10. Display details of the country if only
        one country remains */
        countriesToShow.length > 10 
          ? <p>Too many matches, specify another filter</p>
          : countriesToShow.length > 1
            ? <>
                <p>List of All Countries</p><ul>
                  {countriesToShow
                  .slice(0, 10)
                  .map(country => 
                    <li 
                      key={country.name.common}>{country.name.common}
                    </li>)}
                </ul>
              </>
              : countriesToShow.length === 1 
                ? <CountryDetail country={countries.find(country => 
                    country.name.common.includes(searchCountry))
                  }/>   
                : <div></div> 
      }
      
      

    </div>
  );
}

export default App;
