import { useState } from 'react'

function App() {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    ///to genrate random number
    const gen_random = () => {
        return Math.floor(Math.random() * (anecdotes.length + 1));
    }

    const [selected, setSelected] = useState(gen_random())
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    //function to play next
    const next_ = () =>
    {
        setSelected((selected+1)%anecdotes.length)
    }

    //function to increment usestate
    const increment_votes = () => {
        const new_votes = [...votes]
        new_votes[selected]++;
        setVotes(new_votes)
    }

  return (
    <div>
        <h1>Anecdote of the day!!!!</h1>
        <h3>{anecdotes[selected]}</h3>

        <p>It has {votes[selected]} votes!!!!</p>

        <button onClick={increment_votes}>vote</button>
        <button onClick={next_}>next anecdote</button>

        <br></br>
        <br></br>
        <h1>Anecdote with most votes.</h1>
        <h3>{anecdotes[votes.indexOf(Math.max(...votes))]}</h3>
        <h4>It is with votes:- {votes[votes.indexOf(Math.max(...votes))]}</h4>
    </div>
  )
}

export default App
