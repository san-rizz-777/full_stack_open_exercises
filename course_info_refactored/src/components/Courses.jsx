import Course from './Course.jsx'

///One single wrapper for no. of courses
const Courses = (props) =>
{
    return (
    <>
    <Course  key={props.courses[0].id} name={props.courses[0].name} parts={props.courses[0].parts}/>
        <Course  key={props.courses[1].id} name={props.courses[1].name} parts={props.courses[1].parts}/>

    </>
    );
}

export default Courses;