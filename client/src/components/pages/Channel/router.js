import Channel from "./ChannelPage.vue";
import ChannelHomepage from "./ChannelHomepage.vue";
import ChannelVideoPage from "./ChannelVideoPage.vue";
import ChannelPlaylistPage from "./ChannelPlaylist.vue";
import ChannelChannels from "./ChannelChannels.vue";
import ChannelAbout from "./ChannelAbout.vue";
import store from '../../../store/store.js';
store.getters.config;
let auth  = store.getters['auth/isAuthenticated'];
const routes= [
    {
        path: "channel",
        name: "channel",
        component: Channel,
        children:[
            {
                path: "home",
                name: "channel-home",
                component: ChannelHomepage
            },
            {
                path: "videos",
                name: "channel-video",
                component: ChannelVideoPage
            },
            {
                path: "playlists",
                name: "channel-playlist",
                component: ChannelPlaylistPage
            },
            {
                path: "channels",
                name: "channel-channels",
                component: ChannelChannels
            },
            {
                path: "about",
                name: "channel-about",
                component: ChannelAbout
            }
        ],
        beforeEnter: (to, from ,next) => {
            if(auth){
                next();
            }else{
                next("/");
            }
        }
    },
    {
        path: "c/:channelID",
        name: "channel-other",
        component: Channel,
        props: true,
        children:[
            {
                path: "home",
                name: "channel-other-home",
                component: ChannelHomepage
            },
            {
                path: "videos",
                name: "channel-other-video",
                component: ChannelVideoPage
            },
            {
                path: "playlists",
                name: "channel-other-playlist",
                component: ChannelPlaylistPage
            },
            {
                path: "channels",
                name: "channel-other-channels",
                component: ChannelChannels
            },
            {
                path: "about",
                name: "channel-other-about",
                component: ChannelAbout
            }
        ],
    }
]

export default routes;