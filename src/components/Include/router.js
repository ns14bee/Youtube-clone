import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
const routes = [
    {
        path: "/navbar",
        name: "navbar",
        component: Navbar,
    },
    {
        path:"/sidebar",
        name: "sidebar",
        component: Sidebar
    }
]

export default routes;