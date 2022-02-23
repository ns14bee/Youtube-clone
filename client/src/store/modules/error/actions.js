export default {
    setErrors: ({commit},data) =>{
        commit('setError',data);
    },
    clearErrors: ({commit}) => {
        commit('clearError');
    }
};