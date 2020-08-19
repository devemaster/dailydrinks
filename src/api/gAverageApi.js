// import { getItem } from '../utils/localStore';

class AverageListApi {  
    
    // api function to send and get data from server side
    static getAverageList() {
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
    
        // api function to send and get data from server side
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