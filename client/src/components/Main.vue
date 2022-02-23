<template>
	<div>
		<navbar />
		<div class="d-flex">
			<sidebar v-if="checkCollapse" />
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Navbar from "./Include/Navbar.vue";
import Sidebar from "./Include/Sidebar.vue";
import mixin from "../util/themeMixin.js";
export default {
	mixins: [mixin],
	components: {
		Navbar,
		Sidebar,
	},
};
</script>

<style></style>
