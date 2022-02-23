import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
    namespaced: true,
    state(){
        return {
            error: false,
            errorMessage: null,
            errorCode: 400
        };
    },
    mutations,
    getters,
    actions
}