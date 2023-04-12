import {apiURL, commands} from "../config";
import axios from "axios";

export const fetchData = async({payload, type}) => {
    const response = await axios.post(`${apiURL}${commands[type]}`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Host': 'localhost'
        }
    });
    console.log(response.data);
    return response.data;
}