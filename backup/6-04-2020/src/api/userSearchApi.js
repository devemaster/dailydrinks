import { getItem } from '../utils/localStore';
import { BASE_URL } from '../constants';

class usersSearchApi {  
    static doUserSearchAll(data) {
        let payload = {
            user_name: data
        }
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
                body:JSON.stringify(payload)
            }
            return fetch(BASE_URL + '/admin_search_user', body).then(response => {
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

export default usersSearchApi;