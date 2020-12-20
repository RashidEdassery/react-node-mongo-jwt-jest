import { BehaviorSubject } from 'rxjs';

import Axios from 'axios'
import { API_ENDPOINT } from '../utils/constants'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

function createUser(signupData) {
    const reqData = {
        data: signupData,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        url: `${API_ENDPOINT}/users/create`,
    }

    return new Promise(async (resolve, reject) => {
        Axios(reqData)
        .then(({data}) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(data));
            currentUserSubject.next(data);
            resolve(data);
        }).catch(error => {
            reject(error)
        })
      });
    
}

function login(loginData) {
    const reqData = {
        data: loginData,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        url: `${API_ENDPOINT}/users/authenticate`,
    }

    return new Promise(async (resolve, reject) => {
        Axios(reqData)
        .then(({data}) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(data));
            currentUserSubject.next(data);
            resolve(data);
        }).catch(error => {
            reject(error)
        })
      });
    
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export const authenticationService = {
    createUser,
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};