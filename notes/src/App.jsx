import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes.js'
import "./index.css"
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('.....new_note....')
const [showAll, setShowAll] = useState(true)
const [errorMessage, setErrorMessage] = useState(null)

///Initialising with initial list in database
useEffect(() => {
    noteService.getAll().then(initialNotes => {
        console.log(initialNotes)
        setNotes(initialNotes);
    })
},[])



    ///to a note to notes arr
const addNote = (e) => {
    e.preventDefault();
    const noteObject =  {
        content: newNote,
        important : Math.random() < 0.5,
        id : String(notes.length+1),
    }

    ///creating and adding to database
    noteService.create(noteObject).then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })

}

const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
}

const notesToShow = showAll?notes : notes.filter((note) => note.important);

 ///To toggle the importance of the note
    const toggleImportanceOf = (id) => {
        //console.log(`importance of ${id} needs tpp be`)
        const note = notes.find((note) => note.id === id)
        const changeNote = {...note, important: !note.important}

        ///put request to change that note
       noteService.update(id,changeNote).then((returnedNote) => {
           console.log(returnedNote)
            setNotes(notes.map((note) => note.id===id?returnedNote : note))         ///change the note only when the id matched
        })
           .catch(e => {
               setErrorMessage(`Note ${note.content} was already removed from the server.`)
               setTimeout(() => {
                   setErrorMessage(null)   ///remove the message after 5 seconds.
               },5000);
               setNotes(notes.filter(note => note.id!==id))
           })
    }

  return (
    <div>
<h1>Notes</h1>
<Notification message={errorMessage}></Notification>
<div>
        <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'Important' : 'All'}
        </button>
</div>

        <ul>
            {notesToShow.map(note => (
                <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}></Note>
            ))}
        </ul>

        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type='submit'>save</button>
        </form>

        <Footer/>
    </div>
  )
}

export default App
