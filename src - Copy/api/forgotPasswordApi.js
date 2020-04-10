
import { BASE_URL } from '../constants';

class forgotPasswordApi {
    static doForgotpassword(data) {

        let sendBody={
            email:data.email
        }

        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            let body = {
                method: 'POST',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(sendBody)
            }
            return fetch(BASE_URL + '/sendResetPasswordLink', body).then(response => {
                if(response.ok === true){
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

export default forgotPasswordApi;