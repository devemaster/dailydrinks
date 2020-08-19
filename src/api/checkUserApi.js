import { getItem } from '../utils/localStore';
import { BASE_URL } from '../constants';

class checkUserApi {  
    
    // api function to send and get data from server side
    static doCheckUser(data) {
        // let payload = {
        //     UserName: data
        // }
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
                body:JSON.stringify(data)
            }
            return fetch(BASE_URL + '/ValidateUser', body).then(response => {
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

export default checkUserApi;