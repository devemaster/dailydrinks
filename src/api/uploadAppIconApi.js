
import { BASE_URL } from '../constants';
import { getItem } from '../utils/localStore';
class UploadAppIconApi {
    
    // api function to send and get data from server side
    static doUploadAppIcon(file) {
        console.log('file', file[0]);
        const TOKEN = getItem('auth_token');
        const data = new FormData();
        data.append('file', file[0]);
        try{
            const ajaxRequestHeaders = new Headers({
                mimeType: 'multipart/form-data',
                'Authorization': TOKEN
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: data
            }
            return fetch(BASE_URL + '/file_upload', body).then(response => {
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

export default UploadAppIconApi;
