import ls from '../../../util/LocalStorage.js';
export default {
    changeTheme: ({commit},data) => {
        ls.set('dark',data);
        commit('setTheme',data);
    },
    changeCollapse: ({commit}) => {
        commit('setCollapse');
    }
};