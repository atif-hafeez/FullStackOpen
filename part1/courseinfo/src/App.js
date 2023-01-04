const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
};

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)}
    </>
  )
};

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />     
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <>
      <p><strong>total of {
        parts.reduce (
          (sum, currentValue) => sum + currentValue.exercises, 0)
      } exercises</strong></p>
    </>
  )
};

const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} /> 
    </div>
  )
}

export default App