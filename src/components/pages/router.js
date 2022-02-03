import Error from './errors/Error.vue';
import Home from './Home.vue'

import store from '../../store/store.js'
store.getters.config;
const routes = [
    {
        path: "/error",
        name:'error',
        component: Error,
        beforeEnter: (to, from ,next) => {
            let checkError  = store.getters['error/getError'];
            // let errorMessage = store.getters['error/getErrorMessage'];
            if(checkError){
                next();
            }else{
                next("/");
            }
        }
    },{
        path: "/home",
        name: "main-home",
        component: Home,
    }
]

export default routes;