<template>
	<div>
		<div v-if="error">{{ errorCode }} {{ errorMessage }}</div>
		<div v-else>{{ errorCode }} Some error occurred</div>
		<p>redirecting to home page in {{ second }}</p>
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
