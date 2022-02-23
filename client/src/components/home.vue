<template>
	<div>
		<div>Home</div>
		<div v-if="!checkAuth">
			<h2><router-link to="login">Login</router-link></h2>
		</div>
		<div v-else>
			<BaseButton
				@click="signOut"
				type="button"
				BtnClass="btn-primary mt-3"
			>
				Logout
			</BaseButton>
		</div>
		<h2><router-link to="career">career</router-link></h2>
		<h2><router-link to="users">Users</router-link></h2>
		<h2><router-link to="error">Error</router-link></h2>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters("auth", {
			checkAuth: "isAuthenticated",
			token: "getToken",
		}),
	},
	methods: {
		...mapActions("auth", {
			signOut: "signOut",
		}),
	},
};
</script>

<style scoped>
div {
	color: brown;
	font-size: 30px;
}
</style>
