<template>
	<div class="sidebar" id="collapseSidebar">
		<div class="sidebar-body">
			<side-header />
			<subscriptions v-if="auth" />
			<sidebar-login v-else />
			<side-body />
			<side-footer />
		</div>
	</div>
</template>

<script>
import SideHeader from "./sidebar/SideHeader.vue";
import Subscriptions from "./sidebar/Subscription.vue";
import SideBody from "./sidebar/SideBody.vue";
import SideFooter from "./sidebar/SidebarFooter.vue";
import SidebarLogin from "./sidebar/SidebarLogin.vue";
import themeMixin from "../../util/themeMixin.js";
export default {
	mixins: [themeMixin],
	components: {
		Subscriptions,
		SideFooter,
		SideHeader,
		SideBody,
		SidebarLogin,
	},
};
</script>
