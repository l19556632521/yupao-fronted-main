import myAxios from "../plugins/myAxios";
import { setCurrentUserState } from "../states/user";

/**
 * 获取当前登录用户信息
 * @returns 当前用户信息
 */
export const getCurrentUser = async () => {
    //不存在，从后端获取
    const res = await myAxios.get('/user/current');
    console.info('res.data' + res.data);
    // @ts-ignore
    if (res.code === 0 && res.data) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}


