<template>
	<div class="nav-body b">
		<div>hey</div>
		<div>{{ theme }} {{ imgLink }} {{ cssLink }}</div>
		<div><img :src="imgLink + '/bars.svg'" /></div>
		<button class="btn btn-primary" @click="changeTheme">Change</button>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../../util/themeMixin.js";
export default {
	mixins: [mixin],
	computed: {
		...mapGetters("theme", {
			theme: "getTheme",
			imgLink: "getImgLink",
			cssLink: "getCssLink",
		}),
	},
	methods: {
		changeTheme() {
			this.$store.dispatch("theme/changeTheme", !this.theme);
		},
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
.light-demo {
	background: red;
}
.dark-demo {
	background: yellow;
}
.b {
	border: 1px solid black;
}
</style>
