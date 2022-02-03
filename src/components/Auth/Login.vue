<template>
	<section class="container d-flex flex-column">
		<h1 class="text-center text-primary m-3">Login Form</h1>
		<form class="form p-2 mb-2 align-self-center w-50" @submit="submit">
			<fieldset>
				<div class="d-flex flex-column mt-3">
					<div v-if="error">
						<p class="text-danger">{{ error }}</p>
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
		</form>
	</section>
</template>

<script>
import { useField, useForm } from "vee-validate";
import { string, object } from "yup";
import { mapState } from "vuex";
import UserService from "../../services/auth/UserService";

export default {
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
		};
	},
	computed: {
		...mapState("auth", {
			auth: "isAuthenticated",
		}),
	},
	methods: {
		async LoginUser(data) {
			let res = await UserService.loginUser(data);
			if (res.status == 200) {
				// this.$store.commit("auth/setAuthentication",true);
				await this.$store.dispatch("auth/signIn", res.data.token);
				alert("Login Successfully!");
				this.$router.push({ name: "home" });
			} else {
				this.error = res.data.message;
			}
		},
	},
};
</script>

<style scoped></style>
