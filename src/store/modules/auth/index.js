import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";
import ls from '../../../util/LocalStorage.js';

export default {
    namespaced: true,
    state(){
        return {
            authenticated: ls.get('token') || false,
            token: ls.get('token') || null
        };
    },
    mutations,
    getters,
    actions
}