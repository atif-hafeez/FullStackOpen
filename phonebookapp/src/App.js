import { useState } from 'react'
import PhoneBook from './components/Phonebook'

const App = () => {
  //Define Phonebook Object
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  //Define variable to Control form
  const [newName, setNewName] = useState('')

  //Add person to the Phonebook
  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  //Handle input change
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  //Render the App
  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleAdd}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <button type="Submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {
          persons.map(person => 
            <PhoneBook
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