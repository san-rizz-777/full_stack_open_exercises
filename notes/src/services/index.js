import dotenv from 'dotenv'
dotenv.config()      ///call config before importing the notes
import express from 'express'
import cors from 'cors'
import Notes from './mongo.js'

const app = express();
const PORT = process.env.PORT;

///to convert json to javascript object
app.use(express.json());
app.use(cors())


///get all the content
app.get('/api/notes', async (req, res) => {
    await Notes.find({}).then((notes) => {
         res.status(200).json(notes);
    })
    res.end();
})

///get the note by id
app.get('/api/notes/:id', (req, res, next) => {
    const id = req.params.id;

    Notes.findById(id).then(note => {
      if(note) {
          res.json(note);
      }
      else{
          res.status(404).end();
      }
    })
        .catch(error => next(error));

})


///Delete a note
app.delete('/api/notes/:id', (req, res) => {

    Notes.findByIdAndDelete(req.params.id).then((note) => {
        res.status(204).end();
    })

})

///To create a note
app.post('/api/notes', (req, res) => {
    const body = req.body;
    if(!body.content)
    {
        return res.status(400).json({
            error : "Content is missing!!!"
        })
    }

    const note = new Notes({
        content : body.content,
        important : body.important || false,
    });

    ///save it to the database before returning the response
    note.save().then(saveNote => {
        res.json(saveNote);
       // console.log("Note just saved");
    })

});

app.put('/api/notes/:id', (req, res,next) => {

    Notes.findById(req.params.id).then(note => {
        if(!note)
        {
            return res.status(404).end();
        }

        note.content = req.body.content;
        note.important = req.body.important;
        note.id = req.params.id;

        note.save().then(saveNote => {
            res.json(saveNote);
        })
            .catch(err => next(err))
    });
});


///Error handler middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if(error.name==="CastError"){
        return response.status(400).send({error : "malformatted id."})
    }

    next(error)
}
///last loaded middleware
app.use(errorHandler)


app.listen(PORT);
console.log(`Server started at http://localhost:${PORT}`);