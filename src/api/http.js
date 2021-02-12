var host = "http://192.168.0.1:8081"
if (!IS_DEV) {
    host = "http://zghdev.zhdj360.cn"
}
import axios from "axios"
let url = host + '/Ajaxapi/v1/getUserInfo'
export const getUserInfo = () => axios.get(url)