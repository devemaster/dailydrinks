
import { getItem } from '../utils/localStore';

export const logout=() =>{
    localStorage.clear();
    window.location.href = '/';
}

export const checkLogin=() =>{
    const TOKEN = getItem('auth_token');
    if(TOKEN !== undefined || TOKEN !== null){
        return false;
    }else{
        return true;
    }
}

export function dollarAmountFormat (input) {
    if(input) {
        if(input.length>0){
            return '$' +(input[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        } else {
            return '$' +(input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    } else {
        return '$0.00'
    }
}

export function numberWithCommas(number)  {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function numberWithCommasAndDollar(number)  {
    if (number === null) {
        return '$0'
    } else {
        return '$' +String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}

export function dateFormat(date){
    if (!date) return null;
    let dateNew = {date};
    var monthNames = [
        'Jun', 'Feb', 'Mar',
        'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct',
        'Nov', 'Dec',
    ];
    let splitTimeDate = dateNew.date.split(' ')
    let splitDate = splitTimeDate[0].split('-')
    let day = splitDate[2];
    let monthIndex = splitDate[1];
    return  monthNames[monthIndex - 1] + ' ' + day;
}
export function loadScript () {    
    var tag = document.createElement('script');
    tag.async = false;
    tag.innerHTML = "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-87376082-2');";
    document.head.appendChild(tag);
}

export function dateTimeFormat(datetime) {
    // eslint-disable-next-line no-unused-expressions
    if (datetime !== null && datetime !== '' && datetime !== undefined) {
      let d = datetime;
      return d.getFullYear() + '-' +
      ('00' + (d.getMonth() + 1)).slice(-2) + '-' +
      ('00' + d.getDate()).slice(-2) + ' ' +
      ('00' + d.getHours()).slice(-2) + ':' +
      ('00' + d.getMinutes()).slice(-2) + ':' +
      ('00' + d.getSeconds()).slice(-2);
    } else {
      return 'N/A';
    }
}
