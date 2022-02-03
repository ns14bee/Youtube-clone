<template>
	<router-view class="main position-absolute w-100" />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { mapGetters } from "vuex";
//
export default {
	name: "App",
	computed: {
		...mapGetters("theme", {
			theme: "getTheme",
			imgLink: "getImgLink",
			cssLink: "getCssLink",
		}),
	},
	mounted() {
		var element = document.getElementById("theme-style");
		element.setAttribute("href", `${this.cssLink}`);
	},
	updated() {
		var element = document.getElementById("theme-style");
		element.setAttribute("href", `${this.cssLink}`);
	},
};
</script>

<style>
/* @import "~bootstrap/dist/css/bootstrap.css"; */
</style>
