import ProfilePage from "./Profile-page.vue";
import store from '../../../store/store.js';
store.getters.config;
let auth  = store.getters['auth/isAuthenticated'];

const routes = [
    {
        path: "profile",
        name: "profile",
        component: ProfilePage,
        beforeEnter: (to, from ,next) => {
            if(auth){
                next();
            }else{
                next("/");
            }
        }
    },
]

export default routes;