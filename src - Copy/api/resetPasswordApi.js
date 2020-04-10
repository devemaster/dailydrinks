
import { BASE_URL } from '../constants';
import Swal from 'sweetalert2';

class resetPasswordApi {
    static doResetpassword(data) {

        let sendBody={
            token: data.reset_password_token,
            password: data.encrypted_password
        }

        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json'
            });
            let body = {
                method: 'PUT',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(sendBody)
            }
            return fetch(BASE_URL + '/dasda', body).then(response => {
                if(response.ok === true){
                    Swal.fire({
                        title: 'Password reset successfully',
                        type: 'success',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false,
                        timer: 3000
                    })
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

export default resetPasswordApi;
