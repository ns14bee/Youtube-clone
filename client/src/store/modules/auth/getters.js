export default {
    getToken: (state) => {
        return state.token;
    },
    isAuthenticated: (state) => {
        if(state.authenticated){
            return true;
        }else{
            return false;
        }
    },
    getUser: (state) => {
        return state.user;
    }
};