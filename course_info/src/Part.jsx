const Part = (props) => {
    return (
        <>
            <p>{props.parts[0].name}  {props.parts[0].exercise}</p>
            <p>{props.parts[1].name}  {props.parts[1].exercise}</p>
            <p>{props.parts[2].name}  {props.parts[2].exercise}</p>
        </>
    )
}

export default Part