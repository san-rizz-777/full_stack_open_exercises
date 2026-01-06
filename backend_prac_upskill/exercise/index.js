const express = require('express');

const app = express();
const PORT = 3001;

///to convert json to javascript object
app.use(express.json());

///hard coded data to send to frontend
let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]


app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id);
    if(note)
    {
res.json(note);
    }
    else{
        res.status(404).send('Not Found').end();
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id);
    res.status(204).end();
})

///generating the id
const generateId = () => {
 const maxID  = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0;

 return String(maxID+1);
}

///To create a note
app.post('/api/notes', (req, res) => {
    const body = req.body;
    if(!body.content)
    {
        return res.status(400).json({
            error : "Content is missing!!!"
        })
    }

    const note = {
        content : body.content,
        important : body.important || false,
        id : generateId(),
    }

    notes = notes.concat(note);
    res.json(note);
});



app.listen(PORT);
console.log(`Server started at http://localhost:${PORT}`);