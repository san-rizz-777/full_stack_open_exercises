import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";


///Getting all the data from the server
const get_all_data = () => {
    return axios.get(`${baseUrl}/all`).then((response) => {
        return response.data;
    })
}

///Getting the specific country data
const get_country_data = (name) => {
    return axios.get(`${baseUrl}/name/${name}`).then((response) => {
        return response.data;
    })
}


export default {get_all_data, get_country_data};