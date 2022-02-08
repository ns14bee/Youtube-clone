import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";
import ls from '../../../util/LocalStorage.js';

export default {
    namespaced: true,
    state(){
        return {
            dark: ls.get('dark') || false,
            collapse: true,
        };
    },
    mutations,
    getters,
    actions
}