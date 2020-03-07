
import { BASE_URL } from '../constants';
import { getItem } from '../utils/localStore';
class CreateCategoryApi {
    static doCreateCategory(data) {
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
            return fetch(BASE_URL + '/createCategories', body).then(response => {
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

export default CreateCategoryApi;
