<template>
	<div>
		<navbar />
		<div class="d-flex">
			<sidebar v-if="checkCollapse" />
			<home-body />
		</div>
	</div>
</template>

<script>
import Navbar from "../Include/Navbar.vue";
import Sidebar from "../Include/Sidebar.vue";
import HomeBody from "./Home-Body.vue";
import mixin from "../../util/themeMixin.js";
export default {
	mixins: [mixin],
	components: {
		Navbar,
		Sidebar,
		HomeBody,
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
