import axios from 'axios';

export const postConfig = (url, data) => {
    var config = {
        method: 'post',
        url: url,
        headers: {
            "Content-type": "application/json",
        },
        data: data
    };

    return axios(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            // window.location.href = '/login'
            return error;
        });
}