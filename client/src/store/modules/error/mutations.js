export default{
    setError(state,data){
        state.error = true;
        state.errorMessage = data.message;
        state.errorCode = data.code;
    },
    clearError(state){
        state.error = false;
        state.errorMessage = null;
    }
};