import {useEffect, useState} from 'react'
import Number from "./components/Number.jsx";
import phoneService from "./server/phonebook.js";
import './index.css'
import Notification from "./Notification.jsx";


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('....new name...')
  const [newNum, setNum] = useState(999999);country
  const [newSearch, setNewSearch] = useState('');
  const [newError, setNewError] = useState(null);

  ///Use effect guy to fetch upon re-render
    useEffect(() => {
        console.log(`effect running....`);
        phoneService
            .get_numbers()
            .then((initialPerson) =>
            {
                setPersons(initialPerson)
            })
    },[])

const handleAddPerson = (e) =>
{
    ///Method to add the entered persons name to list
    e.preventDefault();

    //if it doesnt exist in array
   if((persons.find((person) => person.name === newName))===undefined) {
       const newPerson = {
           name: newName,
           number : newNum,
       }

       ////Create and add to database
       phoneService
           .create_person(newPerson)
           .then((returnedPerson) => {
               setPersons(persons.concat(returnedPerson))
               setNewName('')
            })
      setNewError(`${newName} was added to phonebook`);
       setTimeout(() => {
           setNewError(null);
       },3000);
   }//if already exists
   else{
       const windowConfirm = document.getElementById('_window_')
       const person = persons.find((person) => person.name === newName)
       const newChange = {...person, number: newNum};
       const id = person.id;
       windowConfirm.addEventListener('click', () => {
           if(window.confirm(`${newName} already exists, do you want to replace the old number?????`)) {
               phoneService.update_person(id,newChange)
                   .then((returnedNumber) => {
                       console.log(`updated ${returnedNumber}`);
                   })

               ///update to frontend
               const new_persons = [...persons];
               new_persons[new_persons.indexOf(person)] = {...person, number: newNum};
               setPersons(new_persons);
           }
           else{
               alert(`Glad you had not regretted your number!!!!!`);
           }
       })
   }
}

//to change name in input place
const handleValChange = (e) =>
{
    console.log('clicked',e.target.value)
    setNewName(e.target.value)
}

//To change the number in input place
const handleNumChange = (e) => {
    console.log('clicked',e.target.value)
    setNum(e.target.value)
}

///To search a person in input place
const handleSearchPerson = (e) => {
    //console.log('clicked',e.target.value)
    setNewSearch(e.target.value)
}

////to search the person
const handleSearch = (e) => {
    e.preventDefault();
    if(persons.find((person) => person.name === newSearch)!==undefined) {
        const found = persons.find((person) => person.name===newSearch);
        console.log(found);
        alert(`Name found in the list :- Name :- ${found.name} and Number :- ${found.number}`)
    }
    else{
        alert(`${newSearch} doesn't exist in the phonebook.!`);
    }

}

const handleDeletePerson = (id) => {
        //e.preventDefault();
const windowConfirm = document.getElementById('window_')
    windowConfirm.addEventListener('click', () =>{
        if(window.confirm('Are you sure?')){
            phoneService.delete_person(id)
                .then((returnedPerson) => {
                    console.log(`deleted ${returnedPerson}`);
                    if(persons.find((person) => person.id===id)===undefined) {
                        throw new Error(`${returnedPerson} does not exist in the phonebook.`);
                    }
                })
                .catch((err) => {
                    const person = persons.find((person) => person.id===id);
                    setNewError(`Information of ${person.name} had been already removed from the server!!!!!`)
                })

            ///keep change in frontend
            setPersons(persons.filter(person => person.id !== id));
        }
        else{
            alert(`Hope you regret your actions!!!!!`);
        }
    })

}


  return (
    <>
<h2>Phonebook</h2>
        <Notification message={newError}></Notification>
        <div>
           <form onSubmit={handleSearch}>
               <div>filter shown with :- <input value={newSearch} onChange={handleSearchPerson}/>  </div>
               <button type="submit">search</button>
           </form>
        </div>

        <h2>Add a New.</h2>
        <form onSubmit={handleAddPerson}>
            <div>name : <input value={newName} onChange={handleValChange}/></div>
            <br></br>
            <div>number : <input value={newNum} onChange={handleNumChange}/></div>
            <div><button type='submit' id='_window_'>add</button></div>
        </form>

<h2>Numbers</h2>
<div>
            <ul>
            {persons.map((person) =>
                (<Number key={person.id} person={person} delete_person={() => handleDeletePerson(person.id)} update_person_={() =>
                handleNumberChange(person.id)}/>))}
                </ul>
</div>


    </>
  )
}

export default App
