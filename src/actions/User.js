export const setLogin = (data) => {
    console.log(data);
    return {
        type: "SET_LOGIN",
        data: data,
    }
}