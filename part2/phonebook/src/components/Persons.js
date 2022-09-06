const Person = ({name, number, handleDelete}) => {
  return (
    <li>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </li>
  )
}

const Persons = ({persons, handleDelete}) => {
  return(
    <div>
      {persons.map(person =>
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.id)}
        />
      )}
    </div>
  )
}

export default Persons
