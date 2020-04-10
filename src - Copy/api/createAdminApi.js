
import { BASE_URL } from '../constants';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

class createAdminApi {

    static doCreateAdmin(data) {
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
            return fetch(BASE_URL + '/createAdmin', body).then(response => {
                if(response.ok === true){
                    Swal.fire({
                        title: 'Admin created successfully',
                        type: 'success',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false,
                        timer: 3000
                    })
                }
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

export default createAdminApi;
