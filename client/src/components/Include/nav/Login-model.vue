<template>
	<div class="popup-container">
		<login-page v-if="login" @login="loginStatus" @close="close" />
		<register-page v-else @login="loginStatus" @close="close" />
	</div>
</template>

<script>
import LoginPage from "./Login.vue";
import RegisterPage from "./Register.vue";
export default {
	components: {
		LoginPage,
		RegisterPage,
	},
	data() {
		return {
			active: this.show,
			login: true,
		};
	},
	methods: {
		close() {
			this.$emit("close");
		},
		loginStatus(value) {
			this.login = value;
		},
	},
};
</script>

<style scoped>
.popup-container {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
}
</style>
