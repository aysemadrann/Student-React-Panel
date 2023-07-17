import axios from 'axios';

export const deleteConfig = (url) => {
    const config = {
        method: 'delete',
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
            console.log(error);
            return error;
        })
}