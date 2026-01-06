const Part = (props) => {

const na = "not available";
    return (
        <>
                <p>{props.parts[0].name}  {props.parts[0].exercise}</p>
                <p>{props.parts[1].name}  {props.parts[1].exercise}</p>
                {props.parts[2]!==undefined?(<p>{props.parts[2].name}  {props.parts[2].exercise}</p>) : (<p>{na}</p>)}
            {props.parts[3]!==undefined?(<p>{props.parts[3].name}  {props.parts[3].exercise}</p>) : (<p>{na}</p>)}
        </>
    )
}

export default Part