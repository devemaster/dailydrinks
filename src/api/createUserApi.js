
import { BASE_URL } from '../constants';
import { getItem } from '../utils/localStore';
class createUserApi {
    static doCreateUser(data) {
    
        // api function to send and get data from server side
        const TOKEN = getItem('auth_token');
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': TOKEN
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(data)
            }
            return fetch(BASE_URL + '/createUser', body).then(response => {
                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return response.json();
            }).catch(error => {
                return error;
            });
        }catch(err){

        }
    }

    static fetchAllCountry() {
    
        // api function to send and get data from server side
        const TOKEN = getItem('auth_token');
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': TOKEN
            });
            let body = {
                method: 'GET',
                headers: ajaxRequestHeaders,
            }
            return fetch(BASE_URL + '/country_list', body).then(response => {
                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return response.json();
            }).catch(error => {
                return error;
            });
        }catch(err){

        }
    }
    static fetchAllState(data) {
    
        // api function to send and get data from server side
        const TOKEN = getItem('auth_token');
        let sendBody={
            countryid: data
        }
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': TOKEN
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(sendBody)
            }
            return fetch(BASE_URL + '/state_list', body).then(response => {
                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return response.json();
            }).catch(error => {
                return error;
            });
        }catch(err){

        }
    }
    static fetchAllCity(data) {
    
        // api function to send and get data from server side
        console.log('state id', data);
        const TOKEN = getItem('auth_token');
        let sendBody={
            stateId: data
        }
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': TOKEN
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(sendBody)
            }
            return fetch(BASE_URL + '/city_list', body).then(response => {
                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                return response.json();
            }).catch(error => {
                return error;
            });
        }catch(err){

        }
    }
}

export default createUserApi;
