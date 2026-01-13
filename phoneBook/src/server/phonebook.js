import axios from "axios";

const morgan = require("morgan");

const baseUrl = 'http://localhost:3001/persons';

///get method to get the resources
const get_numbers = () => {
    return axios.get(baseUrl).then(
        (response) => {
            return response.data;
        }
    )
}


///update method to update the phonebook
const update_person = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person).then((response) =>
        {
            return response.data;
        }
    )
}


///create method to create a object of person
const create_person = (person) => {
    return axios.post(baseUrl,person).then((response) => {
        return response.data;
    })
}


///delete to delete a person
const delete_person = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((response) => {
        return response.data;
    })
}


export default {get_numbers, update_person, create_person, delete_person}