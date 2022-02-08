import { mapGetters } from "vuex";
export default{
	computed: {
		...mapGetters("theme", {
			theme: "getTheme",
			imgLink: "getImgLink",
			cssLink: "getCssLink",
			checkCollapse: "getCollapse"
		}),
	},
}