import service from "../auth/FetchInterceptor"

const serviceAuth = {}
const path = '/users/login'
const TOKEN_PAYLOAD_KEY = 'Authorization'

const defaultData = {
    username: 'ti1067912212',
    password: '112233'
}

const headers = {
    'Content-Type': 'application/json',
    'UUID-Device': 'eeeeeee'
}

serviceAuth.login = async (userForm = defaultData) => {
    let userData
    await service.post(`http://3.235.249.106:8080${path}`, defaultData, {headers}).then(res => {
        userData = res.data
        service.interceptors.request.use(config => {
            if (res.data?.accessInfo?.access_token) {
                config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${res.data.accessInfo.access_token}`
            }
            return config
        })
    })
    return userData
}

export default serviceAuth;