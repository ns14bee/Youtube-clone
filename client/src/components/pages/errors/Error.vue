<template>
	<div
		class="error d-flex flex-column justify-content-center align-items-center"
	>
		<div class="error-code">{{ errorCode }}</div>
		<div class="error-message">{{ errorMessage }}</div>
		<p class="error-redirect">
			redirecting to home page in {{ second }}
			<button class="btn btn-primary" @click="homePage">Home</button>
		</p>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {
			second: 5,
			error: false,
			errorMessage: null,
			errorCode: 0,
		};
	},
	created() {
		this.timer();
		this.error = this.getError;
		this.errorMessage = this.getErrorMessage;
		this.errorCode = this.getErrorCode;
	},
	mounted() {
		this.$store.dispatch("error/clearErrors");
	},
	methods: {
		timer() {
			if (this.second >= 0) {
				setTimeout(() => {
					this.second -= 1;
					this.timer();
				}, 1000);
			} else {
				// this.clearError;
				this.$router.replace({ name: "home" });
			}
		},
		homePage() {
			this.$router.replace({ name: "home" });
		},
		...mapActions("error", {
			clearError: "clearErrors",
		}),
	},
	computed: {
		...mapGetters("error", {
			getError: "getError",
			getErrorMessage: "getErrorMessage",
			getErrorCode: "getErrorCode",
		}),
	},
};
</script>

<style scoped>
.error {
	background-color: black;
	height: 100vh;
}
.error-code {
	color: red;
	font-size: 40px;
	font-weight: 500;
}
.error-message {
	color: white;
	font-size: 30px;
	font-weight: 400;
}
.error-redirect {
	padding-top: 20px;
	color: rgba(216, 211, 211, 0.836);
	font-size: 20px;
	font-weight: 400;
}
</style>
