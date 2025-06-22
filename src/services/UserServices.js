import {  get, post } from "../utils/request";

export const getUser = async () => {
    const result = await get("users");
    return result;
}
export const register = async (data) => {
    const result = await post("users",data);
    return result;
}
// export const checkLogin = async (data) => {
//     const result = await get("users");
//     if(result) {
//         const item = result.find( (item) => {
//             if(item.email === data.email) {
//                 if(item.password === data.password) {
//                     return item;
//                 }
//             }
//         })
//         if(item) {
//             return {
//                 id : item.id,
//                 token: item.token
//             };
//         }else return {};
//         }
       
//     return {};
// }
// #FIXME: su dung params de check login
export const checkLogin2 = async (data) => {
    const result = await get(`users?email=${data.email}&password=${data.password}`);
    return result;
}

export const checkToken2 = async (data) => {
    const result = await get(`users?token=${data}`);
    return result;
}
// export const checkToken = async (data) => {
//     const result = await get("users");
//     if(result) {
//         const item = result.find( (item) => {
//         if(item.token === data) {
//             return item;
//         }
//         })
//         if(item) {
//             return {
//                 id : item.id,
//             };
//         }else return {};
//         }
       
//     return {};
// }

