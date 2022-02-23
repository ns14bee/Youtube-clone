import ls from '../../../util/LocalStorage.js';
export default {
    signIn: ({commit},data) => {
        ls.set('token',data);
        commit('setToken',data);
    },
    signOut: ({commit}) => {
        ls.remove('token');
        commit('clearAuth');
        location.reload();
    },
    setUser: ({commit},data) => {
        commit('setUser',data);
    }
};