import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const displaySuccessMessage = text => {
    setSuccessMessage(text)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const addPeson = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const personToChange = persons.find(person => person.name === newName)
        personService.update(personToChange.id, personObject)
          .then(returnedObject => {
            setPersons(persons.map(p => p.id !== personToChange.id ? p : returnedObject))
            setNewName('')
            setNewNumber('')
            displaySuccessMessage('Number changed')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => setErrorMessage(null), 5000)
            setPersons(persons.filter(p => p.id !== personToChange.id))
            setNewName('')
            setNewNumber('')
          }) 
      }
    } else {
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          displaySuccessMessage(`Added ${returnedPerson.name}`)
        })
    }
  }

  const removePerson = (id) => {
    personService.remove(id)
      .then(returnedObject => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleOnSubmit={addPeson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleDelete={removePerson}
      />
    </div>
  )
}

export default App
