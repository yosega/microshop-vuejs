import axios from 'axios';

class UserService {
    // получение данных по GET
    getHttp(url, errorShow = true) {
        return axios.get(url)
        .then(response => {
            return response;
        })
        .catch(error => {
            errorShow && alert('Ошибка: '+error.response.data.detail);
            throw error;
        });
    }
}

export default new UserService();