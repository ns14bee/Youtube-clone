import {createWebHistory, createRouter} from 'vue-router';
import Home from '../components/home.vue';
import Auth from '../components/Auth/router.js';
import Career from '../components/careers.vue';
import Pages from '../components/pages/router.js';
import Include from '../components/Include/router.js';


let newRoutes = [
    Auth,
    Pages,
    Include
];

const routes = [
    {
        path:"/",
        name:"home",
        component:Home,
    },
    {
        path:"/career",
        name:"career",
        component:Career,
    }
];

for(let route of newRoutes){
    for(let item of route){
        routes.push(item)
    }
}

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;