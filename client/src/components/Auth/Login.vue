<template>
	<section class="container d-flex flex-column">
		<h1 class="text-center m-3">Login Form</h1>
		<form class="form p-2 mb-2 align-self-center w-auto" @submit="submit">
			<fieldset>
				<div class="d-flex flex-column mt-3">
					<div v-if="error" class="alert alert-danger">
						<strong>Error!</strong> {{ error }}
					</div>
					<div v-if="success" class="alert alert-success">
						<strong>Enjoy!</strong> Logged In Successfully!
					</div>
					<div class="p-1">
						<BaseInput
							label="Email"
							type="email"
							:error="errors.Email"
							:modelValue="Email"
							@change="handleChangeEmail"
						/>
					</div>
					<div class="p-1">
						<BaseInput
							label="Password"
							type="password"
							:error="errors.Password"
							:modelValue="Password"
							@change="handleChangePassword"
						/>
					</div>
					<div class="text-center mt-2">
						<BaseButton type="submit" BtnClass="btn-primary mt-3"
							>Submit</BaseButton
						>
					</div>
				</div>
			</fieldset>
			<h3 class="mt-5 d-flex justify-content-center">
				Don't have an account?&nbsp;
				<router-link to="/register/">Sign-up</router-link>
			</h3>
		</form>
	</section>
</template>

<script>
import { useField, useForm } from "vee-validate";
import { string, object } from "yup";
import UserService from "../../services/auth/UserService";
import themeMixin from "../../util/themeMixin.js";

export default {
	mixins: [themeMixin],
	data() {
		const validationSchema = object({
			Email: string().email().required(),
			Password: string().required(),
		});

		const { handleSubmit, setFieldValue, errors } = useForm({
			validationSchema,
			initialValues: {},
		});

		const handleChangeEmail = (event) => {
			setFieldValue("Email", event.target.value);
		};

		const handleChangePassword = (event) => {
			setFieldValue("Password", event.target.value);
		};

		const { value: Email } = useField("Email");
		const { value: Password } = useField("Password");

		const submit = handleSubmit((values) => {
			this.error = "";
			this.LoginUser(values);
		});

		return {
			Email,
			Password,
			submit,
			errors,
			handleChangeEmail,
			handleChangePassword,
			error: "",
			success: false,
		};
	},

	methods: {
		async LoginUser(data) {
			let res = await UserService.loginUser(data);
			if (res.status == 200) {
				await this.$store.dispatch("auth/signIn", res.data.token);
				this.success = true;
				setTimeout(() => {
					this.$router.push({ name: "home" });
				}, 3000);
			} else {
				this.error = res.data.message;
			}
		},
	},
	updated() {
		if (this.error) {
			setTimeout(() => {
				this.error = "";
			}, 5000);
		}
	},
};
</script>

<style scoped>
.container {
	margin-top: 60px;
}
</style>
