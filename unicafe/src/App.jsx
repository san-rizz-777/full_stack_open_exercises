import { useState } from 'react'

const StatisticLine = (props) =>
{
    return(
        <table>
       <tbody>
       <tr><th>{props.text}</th>
           <td>{props.value}</td>
       </tr>
       </tbody>
        </table>
    )
}

//Always write component at the top not in nested format inside another one
const Statistics = (props) =>
{
   return(
       <>
       <h3>Statistics</h3>
       <StatisticLine text="good" value={props.value_good}></StatisticLine>
       <StatisticLine text="neutral" value={props.value_neutral}></StatisticLine>
       <StatisticLine text="bad"  value={props.value_bad}></StatisticLine>
           <StatisticLine text="all" value={props.sum_}></StatisticLine>
           <StatisticLine text="average" value={props.average_}></StatisticLine>
           <StatisticLine text="positive_percentage" value={props.positive_}></StatisticLine>
       </>
   )
}


function App() {

    //saves the click of each button to its own state
    const [good,setGood] = useState(0)
    const [neutral,setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [sum, setSum] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    ///event handler to increment good
    const incrementGood = () => {
        setGood(good + 1)
        setSum(sum+1)
        setAverage(average+1/3)
        if(sum!==0) {
            setPositive(((good) * 100) / sum)
        }

    }

    //to increment neutral count
    const incrementNeutral = () => {
        setNeutral(neutral + 1)
        setSum(sum+1)
       //no change in average
        if(sum!==0) {
            setPositive(((good) * 100) / sum)
        }

    }

    //to increment bad
    const incrementBad = () => {
        setBad(bad + 1)
        setSum(sum+1)
        setAverage(average-1/3)
        if(sum!==0) {
            setPositive(((good) * 100) / sum)
        }

    }


    return (
    <div>
<h1>Give your feedback!!!</h1>
        <button onClick={incrementGood}>good</button>
        <button onClick={incrementNeutral}>neutral</button>
        <button onClick={incrementBad}>bad</button>
        <br></br>
        <Statistics value_good={good} value_neutral={neutral} value_bad={bad} sum_={sum} average_={average} positive_={positive}></Statistics>
    </div>
  )
}

export default App
