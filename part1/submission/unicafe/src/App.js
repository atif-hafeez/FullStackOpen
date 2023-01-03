import { useState } from 'react'

const Statistics = ({good, neutral, bad, allStats, average, positive}) => {
  return (
    <>
        good {good} 
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {allStats}
        <br />
        average {average}
        <br />
        positive {positive*100} %
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allStats, setAllStats] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good+1);
    setAllStats(allStats + 1);
    
    const newGood = good + 1;
    const newAllStats = allStats + 1
    
    setAverage((newGood * 1 + neutral * 0 + bad * -1)/newAllStats)

    setPositive(newGood/newAllStats)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1);
    setAllStats(allStats+1);
    
    const newNeutral = neutral + 1;
    const newAllStats = allStats + 1
    
    setAverage((good * 1 + newNeutral * 0 + bad * -1)/newAllStats)

    setPositive(good/newAllStats)
  }
  const handleBadClick = () => {
    setBad(bad+1);
    setAllStats(allStats+1);
    
    const newBad = bad + 1;
    const newAllStats = allStats + 1
    
    setAverage((good * 1 + neutral * 0 + newBad * -1)/newAllStats)

    setPositive(good/newAllStats)
  }
  if (allStats === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        
        <h1>statistics</h1>

        <p>No feedback given</p>
      </div>
    )
  } else {
      return (
        <div>
          <h1>give feedback</h1>
          
          <button onClick={handleGoodClick}>good</button>
          <button onClick={handleNeutralClick}>neutral</button>
          <button onClick={handleBadClick}>bad</button>
          
          <h1>statistics</h1>
          <p>
            <Statistics 
              good={good} neutral={neutral} bad={bad}
              allStats={allStats} average={average} positive={positive} />
          </p>
        </div>
      )
  }
}

export default App