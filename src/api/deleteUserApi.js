import { BASE_URL } from '../constants';
import { getItem } from '../utils/localStore';

class deleteUserApi {  
    static deleteUser(data) {
        console.log(data)
        const TOKEN = getItem('auth_token');
        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': TOKEN
            });
            let body = {
                method: 'DELETE',
                headers: ajaxRequestHeaders,
                body:JSON.stringify(data)
            }
            return fetch(BASE_URL + '/admin_delete_user', body).then(response => {
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

export default deleteUserApi;