import { authHeader } from '../utils';
import Axios from 'axios'
import { API_ENDPOINT } from '../utils/constants'

function getUser(userID) {
    const reqData = {
        headers: authHeader(),
        method: 'get',
        url: `${API_ENDPOINT}/users/${userID}`,
    }

    return new Promise(async (resolve, reject) => {
        Axios(reqData).then(({ data }) => {
            resolve(data);
        }).catch(error => { reject(error) })
    });
}

function updatePassword(updatePasswordData) {
    const reqData = {
        headers: authHeader(),
        method: 'put',
        data: updatePasswordData,
        url: `${API_ENDPOINT}/users/update_password`,
    }

    return new Promise(async (resolve, reject) => {
        Axios(reqData).then(({ data }) => {
            resolve(data);
        }).catch(error => { reject(error) })
    });
}

export const userService = {
    getUser,
    updatePassword
};