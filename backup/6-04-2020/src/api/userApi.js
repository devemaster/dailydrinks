import { getItem } from '../utils/localStore';
import { BASE_URL } from '../constants';

class usersApi {  
    static doUserAll() {
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
            return fetch(BASE_URL + '/user_list', body).then(response => {
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

export default usersApi;