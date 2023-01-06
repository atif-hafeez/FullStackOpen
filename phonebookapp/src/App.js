import { useState } from 'react'
import Persons from './components/Persons'

const Filter = () => {

}

const PersonForm = () => {

}


const App = () => {
  //Define Phonebook Object
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456'},
      { name: 'Ada Lovelace', number: '39-44-5323523'},
      { name: 'Dan Abramov', number: '12-43-234345'},
      { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 

  //Define state variables to Control form input elements
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  //Add person to the Phonebook
  const handleAdd = (event) => {
    event.preventDefault()
    
    if (persons.some(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  //Handle name input change
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //Handle number input change
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //Handle searchbar change
  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
    
  }

  //code to filter list
  const personsToShow = searchName === ''
    ? persons
    : persons.filter(({name}) => 
      (name.toLowerCase()).includes(searchName.toLowerCase()))

  //Render the App
  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <div>
          filter shown with <input value={searchName} onChange={handleSearchChange} />
        </div>
        <h2>add a new</h2>
        <form onSubmit={handleAdd}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="Submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {
          personsToShow.map( person => 
            <Persons
              key={person.name}
              person={person} />
          )
        }
      </div>
      <div>
        <p>debug: {newName}</p>
      </div>
    </div>
  )
}

export default App