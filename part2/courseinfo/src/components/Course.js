const Course = ({ course }) => {
  let sum = 0
  const total = course.parts.reduce((p, c) => {
    return p + c.exercises
  }, sum)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={total}
      />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => 
  <>
    {parts.map(part => {
      return (
        <Part
          key={part.id}
          part={part}
        />
      )
    })}  
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

export default Course
