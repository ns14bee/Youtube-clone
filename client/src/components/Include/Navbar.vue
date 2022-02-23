<template>
	<!-- Navbar start -->
	<div class="nav-body d-flex justify-content-between align-items-center">
		<logo-section />
		<search-section />
		<profile-section v-if="checkAuth" />
		<signup-section v-else />
	</div>
	<!-- Navbar end -->
</template>

<script>
import mixin from "../../util/themeMixin.js";
import LogoSection from "./nav/Logo-Section.vue";
import ProfileSection from "./nav/Profile-section.vue";
import SearchSection from "./nav/Search-Section.vue";
import SignupSection from "./nav/Signup-section.vue";
import { mapGetters } from "vuex";

export default {
	mixins: [mixin],
	components: {
		LogoSection,
		ProfileSection,
		SearchSection,
		SignupSection,
	},
	computed: {
		...mapGetters("auth", {
			checkAuth: "isAuthenticated",
		}),
	},
};
</script>
<style></style>
