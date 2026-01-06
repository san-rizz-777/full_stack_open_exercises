const Total =  (props) => {
    const total = props.parts.reduce((acc,curr) => acc+curr.exercise,0,);

    return (
        <>
        <p>
            No. of exercises : {total}
        </p>

        </>
    )
}

export default Total;