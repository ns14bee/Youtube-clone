import {createWebHistory, createRouter} from 'vue-router';
import Main from '../components/router.js';
// import Auth from '../components/Auth/router.js';
import Career from '../components/careers.vue';
import Demo from '../components/pages/demo.vue';
import Errors from '../components/pages/errors/Error.vue';
import store from '../store/store.js';
// import Pages from '../components/pages/router.js';
// import Include from '../components/Include/router.js';

const routes = [
    ...Main,
    {
        path:"/career",
        name:"career",
        component:Career,
    },
    {
        path:"/demo",
        name:"demo",
        component:Demo,

    },
    {
        path: "/:pathMatch(.*)*",
        name: "error-404",
        component: Errors,
        beforeEnter: (to, from ,next) => {
            let error = {
                message: 'Page not found!',
                code: 404
            }
            store.dispatch('error/setErrors',error);
            next();
        }
    },
];


const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;