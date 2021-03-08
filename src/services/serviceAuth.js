import service from '../auth/FetchInterceptor';
import Swal from 'sweetalert2';

const serviceAuth = {}
const path = '/users/login'
const TOKEN_PAYLOAD_KEY = 'Authorization'
const URL_BASE = localStorage.getItem('urlBaseLogin')

const defaultData = {
    username: localStorage.getItem('name'), //'rc1067915911',
    password: localStorage.getItem('pwd') //'1067915911'
}

const headers = {
    'Content-Type': 'application/json',
    'UUID-Device': 'eeeeeee'
}

serviceAuth.login = async (userForm = defaultData) => {
    let userData
    await service.post(`${URL_BASE}${path}`, defaultData, {headers}).then(res => {
        userData = res.data
        service.interceptors.request.use(config => {
            if (res.data?.accessInfo?.access_token) {
                config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${res.data.accessInfo.access_token}`
            }
            return config
        })
    }).catch((error)=> {
        Swal.fire({
            title: 'Lo sentimos!',
            text: `${error.response.data?.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    })
    return userData
}

export default serviceAuth;