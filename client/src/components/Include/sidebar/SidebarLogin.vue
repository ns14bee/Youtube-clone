<template>
	<div class="subscription-body d-flex justify-content-center">
		<div class="w-75">
			Sign in to like videos, comment, and subscribe.
			<BaseButton
				type="button"
				BtnClass="d-flex  justify-content-evenly  align-items-center sign-up mt-3"
				@click="signIn"
			>
				<i class="far fa-user-circle sign-up-icon"></i>
				<span class="sign-up-text">&nbsp;SIGN IN</span></BaseButton
			>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		signIn() {
			this.$router.push("login");
		},
	},
};
</script>

<style scoped>
.sign-up {
	width: 108px;
	padding: 8px 5px;
	border: 1px solid #3ea6ff;
}
.sign-up:hover {
	background-color: none !important;
}
.sign-up:focus {
	box-shadow: none !important;
}
.sign-up-text {
	font-size: 14px;
	color: #3ea6ff;
}
.sign-up-icon {
	font-size: 18px;
	color: #3ea6ff;
}
</style>
