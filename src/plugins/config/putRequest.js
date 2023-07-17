import axios from 'axios';

export const putConfig = (url, data) => {
    const config = {
        method: 'put',
        url: url,
        headers: {
            "Content-type": "application/json",
        },
        data: data
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