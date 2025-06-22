// #TODO: reducer va action duoc su dung trong redux 
// reducer se nhan vao state hien tai va action , tu action reducer se xu li va dua ra new state
const init = {
    ok: false,
    id: null,
}
const UserReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state,
                id: action.data.id,
                ok: action.data.ok,
            }
        default:
            return state;
    }

}
export default UserReducer;