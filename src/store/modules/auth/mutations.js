export default{
    setToken : (state,token) =>{
        state.token =token;
        if(token){
            state.authenticated = true;
        }else{
            state.authenticated = false;
        }
    },
    clearAuth: (state) => {
        state.token = null;
        state.authenticated = false;
    }
};