const Number = ({person,delete_person}) => {


    return (
        <li>{person.name} {person.number}
        <button onClick={delete_person} id="window_">DELETE PERSON</button>
        </li>
    );
}

export default Number;