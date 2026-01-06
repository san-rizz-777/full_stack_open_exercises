const express = require('express');

let phoneBook = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number_": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number_": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number_": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number_": "39-23-6423122"
    }
]

const app = express();
const port = 3000;
app.use(express.json());

///to retrieve the whole phonebook entries
app.get('/api/persons', (req, res) => {
    res.status(200).json(phoneBook).end(() => {
        console.log(phoneBook);
        console.log("Mission Passed!!!");
    });
});

///To get the info of phoneBook
app.get('/info', (req, res) => {
    const newDate = new Date();
    console.log(newDate);

    res.status(200).send('<div><h1>PhoneBook has info for ${phoneBook.length} people.</h1><p>Yoo</p></div>');
    res.end();
});

///To get a specific person.
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = phoneBook.find(person => person.id === id);

    //validate the request
    if (!person) {
        return res.status(404).send('Requested person not found!');
    }

    res.status(200).json(person).end();
})

///To delete a person
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    if(!phoneBook.find(person => person.id === id)) {
        return res.status(404).send('Invalid request! Person not found!');
    }
    phoneBook = phoneBook.filter(person => person.id !== id);
    res.status(204).end();
})

///To create a person in phoneBook
app.post('/api/persons', (req, res) => {
    const body = req.body;

    //validation of the body's content
    if(!body.name || !body.number_)
    {
        return res.status(400).json({error : "Content cannot be empty!"}).end();
    }

    const person = {
        id : String(Math.floor(Math.random() * (1E9+7))),
        name : body.name,
        number_ : String(body.number_),
    }

    phoneBook = phoneBook.concat(person);
    res.status(200).json(person);
    res.end();
})


//listening on the port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

