import axios from "axios";
const baseUrl = "http://localhost:3001/notes"

//to get all the notes and directly return the data
const getAll = () => {
    return axios.get(baseUrl).then((response) => {
        return response.data;
    })
}

//to update the the notes
const update = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject).then((response) => {
        return response.data;
    })
}

///to create a new note
const create = (newObject) => {
    return axios.post(baseUrl,newObject).then((response) => {
        return response.data;
    })
}


export default {
    getAll : getAll,
    update : update,
    create : create,
}