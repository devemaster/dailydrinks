
import { BASE_URL } from '../constants';

class loginApi {

    static doLogin(data) {
        let sendBody={
            email:data.email,
            password:data.encrypted_password
        }

        try{
            const ajaxRequestHeaders = new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            });
            let body = {
                method: 'post',
                headers: ajaxRequestHeaders,
                body: JSON.stringify(sendBody)
            }
            return fetch(BASE_URL + '/superlogin', body).then(response => {
                return response.json();
            }).catch(error => {
                return error;
            });
        }catch(err){

        }
    }
}

export default loginApi;
