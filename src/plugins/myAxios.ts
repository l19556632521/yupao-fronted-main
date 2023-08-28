import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development';

const myAxios: AxiosInstance = axios.create({
    //上线配置，前端axios请求地址是什么前端域名就用什么，才不会跨域
    baseURL: isDev ? 'http://localhost:8080/api' : 'http://reviewhub.lmeng.top:8081/api',
});

myAxios.defaults.withCredentials = true; // 配置为true

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦', response)
    console.log('idDev=' + isDev);
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.pathname;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;
