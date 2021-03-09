const presetDataEnvironment = () => {

    if (process.env.NODE_ENV === 'development') {
        localStorage.clear()
        localStorage.setItem('urlBaseLogin', 'http://3.235.249.106:8080')
        localStorage.setItem('urlBaseElectoral', 'http://3.216.132.1:8080')
        localStorage.setItem('UUID-Device', 'eeeeeee')
        localStorage.setItem('estid', '6fd39fee-313b-4fb0-89e9-54432dbe2a27')
        localStorage.setItem('name', 'rc1067915911')
        localStorage.setItem('pwd', '1067915911')
    }

}

export default presetDataEnvironment;