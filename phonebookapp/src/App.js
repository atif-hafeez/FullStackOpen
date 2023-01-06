import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <button  onClick={handleAdd}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map(person => <><span key={person.name}>{person.name}</span><br /></>)}
      </div>
      <div>
        <p>debug: {newName}</p>
      </div>
    </div>
  )
}

export default App