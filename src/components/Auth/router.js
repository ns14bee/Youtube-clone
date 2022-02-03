import Login from './Login.vue'
import Register from './Register.vue'
import Users  from './Users.vue'
import store from '../../store/store.js'
store.getters.config;
let auth  = store.getters['auth/isAuthenticated'];
const routes = [
    {
        path:"/login",
        name:"login",
        component:Login,
        beforeEnter: (to, from ,next) => {
            if(!auth){
                next();
            }else{
                next("/");
            }
        }
        
    },
    {
        path:"/register",
        name:"register",
        component:Register,
        beforeEnter: (to, from ,next) => {
            if(!auth){
                next();
            }else{
                next("/");
            }
        },
        beforeRouteLeave :(to,from,next) =>{
            let answer = window.confirm("Do you really want to to leave this page?")
            if(answer){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/users",
        name:"users",
        component:Users,
        beforeEnter: (to, from ,next) => {
            if(auth){
                next();
            }else{
                next("/");
            }
        }
    }
];

export default routes;