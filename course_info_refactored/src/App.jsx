import Courses from "./components/Courses.jsx";


function App() {
 const courses =[{
     name : 'Half stack application developement',
     id : 1,
     parts : [   ///Encapsualting as parts
         {
             name : 'Fundamentals of React',
             id : 1,
             exercise: 10
         },
         {
             name: 'Using props to pass data',
             id : 2,
             exercise: 7
         },
         {
             name: 'State of component',
             id : 3,
             exercise : 14
         },
     {
         name: 'Redux',
         exercise: 11,
         id: 4
     }
 ]
},
{
    name: 'Node.js',
    id: 2,
    parts: [
    {
        name: 'Routing',
        exercise: 3,
        id: 1
    },
    {
        name: 'Middlewares',
        exercise: 7,
        id: 2
    },
]
}
  ]


  return(
<>
 <Courses courses={courses}/>
</>
  )
}

export default App
