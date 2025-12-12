import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";


function App() {
 const course = {
     name : 'Half stack application developement',
     parts : [   ///Encapsualting as parts
         {
             name : 'Fundamentals of React',
             exercise: 10
         },
         {
             name: 'Using props to pass data',
             exercise: 7
         },
         {
             name: 'State of component',
             exercise : 14
         }
         ]
 }


  return(
<div>
    <Header course={course.name}/>
    <Content  parts={course.parts}/>
    <Total parts={course.parts}/>
</div>
  )
}

export default App
