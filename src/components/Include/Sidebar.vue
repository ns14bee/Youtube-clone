<template>
	<div class="sidebar d-flex flex-row">
		<div class="sidebar-body">
			<side-header />
			<subscriptions />
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
export default {
	components: {
		Subscriptions,
		SideFooter,
		SideHeader,
		SideBody,
	},
};
</script>
