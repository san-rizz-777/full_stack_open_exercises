import Part from "./Part.jsx";

const Content = (props) =>
{
    const part1 = props.part1;
    const part2 = props.part2;
    const part3 = props.part3;
    const exercises1 = props.exercises1;
    const exercises2 = props.exercises2;
    const exercises3 = props.exercises3;
    return (
        <>
            <Part {...{part1, exercises1}}/>
            <Part {...{part2,exercises2}}/>
            <Part {...{part3,exercises3}}/>
        </>
)
}

export default Content;