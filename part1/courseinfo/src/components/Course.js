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

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />     
    </div>
  )
}

export default Course