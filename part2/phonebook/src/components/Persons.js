const Person = ({name, number}) => <li>{name} {number}</li>

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default Persons
