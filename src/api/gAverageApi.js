import { getItem } from '../utils/localStore';
import { BASE_URL } from '../constants';

class AverageListApi {  
    static getAverageList() {
        const TOKEN = getItem('auth_token');
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            });
            let body = {
                method: 'GET',
                headers: ajaxRequestHeaders,
            }
            return fetch('http://animalhealth.novusint.com:3000/api/GlobalAverage', body).then(response => {
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
    static doUpdateAverage(data) {
        const TOKEN = getItem('auth_token');
        console.log(data)
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(data)
            }
            return fetch('http://animalhealth.novusint.com:3000/api/GlobalAverageUpdate', body).then(response => {
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

export default AverageListApi;