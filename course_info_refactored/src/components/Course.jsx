import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";


const Course = (props) => {
    return (
        <div>
        <Header course={props.name}/>
        <Content  parts={props.parts}/>
        <Total parts={props.parts}/>
        </div>
            )
}

export default Course;