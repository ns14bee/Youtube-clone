import { createStore } from "vuex";
import auth from "./modules/auth";
import error from "./modules/error";
import theme from "./modules/theme";
const store = createStore({
    modules: {
        auth,
        error,
        theme
    }
});

export default store;