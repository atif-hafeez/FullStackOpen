import {  useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({searchName, onSearchChange}) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={onSearchChange} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, onNameChange, onNumberChange, onFormSubmit}) => {
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="Submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons, onDelete}) => {
  return (
    persons.map(person => 
        <li key={person.name}>
          {person.name} {person.number} <button onClick={()=>onDelete(person)}>delete</button>
        </li>
    )
  )
}

const App = () => {
  //Define Phonebook Object
  const [persons, setPersons] = useState([]) 

  //Get list of persons from database
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //Define state variables to Control form input elements
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  //Add person to the Phonebook
  const handleAdd = (event) => {
    event.preventDefault()
    
    if (persons.some(({name}) => name === newName)) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`)
      ) {
          const person = persons.find(person => person.name === newName)
          const changedPerson = {...person, number: newNumber}
          personsService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            })
            .catch(error => {
              alert(`${person.name}'s details were already deleted from the server`)
              setPersons(persons.filter(p => p.id !== person.id))
            }) 
      } else {
        setNewName('')
        setNewNumber('')
        return;
      }
    } else {
      //Add person to the database if the name is not already in the list
        const newPerson = {
          name: newName,
          number: newNumber,
        }
                
        personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  //delete person
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deleteItem(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
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
        <Filter 
          searchName={searchName}
          onSearchChange={handleSearchChange}
        />

        {/* <div>
          filter shown with <input value={searchName} onChange={handleSearchChange} />
        </div> */}
        
        <h2>add a new</h2>
          <PersonForm 
            newName={newName}
            newNumber={newNumber}
            onNameChange={handleNameChange}
            onNumberChange={handleNumberChange}
            onFormSubmit={handleAdd}
          />
     
        <h2>Numbers</h2>
        <ul>
          <Persons 
            persons={personsToShow} 
            onDelete={handleDelete}
          />
        </ul>
      </div>
      <div>
        <p>debug: {newName}</p>
      </div>
    </div>
  )
}

export default App