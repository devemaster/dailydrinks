
import { BASE_URL } from '../constants';
import { getItem } from '../utils/localStore';
class DeleteRegionListApi {
    static doDeleteRegion(data) {
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
                body: JSON.stringify(data)
            }
            return fetch(BASE_URL + '/deleteRegion', body).then(response => {
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

export default DeleteRegionListApi;
