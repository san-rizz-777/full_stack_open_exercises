import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";


function App() {
 const course = 'Half stack application developement'
 const part1 = 'Fundamentals of React'
 const exercises1 = 10
 const part2 = 'Using props to pass data'
 const exercises2 = 7
 const part3 = 'State of component'
 const exercises3 = 14
  return(
<div>
    <Header course={course}/>
    <Content  {...{part1, part2,part3, exercises1,exercises2 ,exercises3}}/>
    <Total {...{exercises1, exercises2, exercises3}}/>
</div>
  );
}

export default App
