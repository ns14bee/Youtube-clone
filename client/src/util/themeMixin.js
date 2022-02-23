import { mapGetters} from "vuex";
export default{
	data(){
		return{
			baseUrl: process.env.VUE_APP_BASE_URL
		}
	},
	computed: {
		...mapGetters("theme", {
			theme: "getTheme",
			imgLink: "getImgLink",
			cssLink: "getCssLink",
			checkCollapse: "getCollapse"
		}),
		...mapGetters("auth", {
			auth: "isAuthenticated",
		}),
	},
}