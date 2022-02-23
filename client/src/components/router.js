import Main from "./Main.vue";
import Home from "./pages/Home-Body.vue";
import Profile from "./pages/user/router.js";
import Auth from "./Auth/router.js"
import Channel from "./pages/Channel/router.js";
import store from '../store/store.js'
import Video from './pages/videos/VideoPage.vue';
store.getters.config;
// let auth  = store.getters['auth/isAuthenticated'];


const routes= [
    {
        path: "/",
        component: Main,
        children:[
            {
                path: "",
                name: "home",
                component: Home
            },{
                path: "watch/:videoID",
                name: "watch-video",
                component: Video,
                props: true
            },
            ...Profile,
            ...Auth,
            ...Channel,
        ],
    },
]

export default routes;