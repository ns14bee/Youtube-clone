import ls from '../../../util/LocalStorage.js';
export default {
    changeTheme: ({commit},data) => {
        ls.set('dark',data);
        commit('setTheme',data);
    },
    changeCollapse: ({commit},data) => {
        if(data){
            commit('setCollapse',data);
        }else{
            commit('setCollapse');
        }
    }
};