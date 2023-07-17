import axios from 'axios';

export const getConfig = (url) => {
    var config = {
        method: 'get',
        url: url,
        headers: {
            "Content-type": "application/json",
        }
    }

    return axios(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            // window.location.href = '/login'
            console.log(error);
            return error;
        })
}