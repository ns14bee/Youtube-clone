<template>
	<div class="popup active">
		<div class="close-btn" @click="close">&times;</div>
		<div class="form">
			<h2>Sign up</h2>
			<form @submit="submit">
				<div v-if="error" class="alert alert-danger">
					<strong>Error!</strong> {{ error }}
				</div>
				<div class="form-element">
					<label for="email">User Name</label>
					<input
						type="text"
						name="UserName"
						id="UserName"
						placeholder="Enter User Name"
						@change="handleChangeUserName"
					/>
					<div class="text-danger" v-if="errors.Email">
						{{ errors.UserName }}
					</div>
				</div>
				<div class="form-element">
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter Email"
						@change="handleChangeEmail"
					/>
					<div class="text-danger" v-if="errors.Email">
						{{ errors.Email }}
					</div>
				</div>
				<div class="form-element password-field">
					<label for="Password">Password</label>
					<input
						:type="type"
						name="Password"
						id="Password"
						placeholder="Enter Password"
						@change="handleChangePassword"
					/>
					<span class="password-span" @click="show">{{ text }}</span>
					<span class="text-danger" v-if="errors.Password">
						{{ errors.Password }}</span
					>
				</div>
				<div class="form-element">
					<BaseButton type="submit" BtnClass="btn-primary mt-3"
						>Sign In</BaseButton
					>
				</div>
			</form>
			<div class="signup">
				Already have an account?
				<span
					class="text-danger"
					style="cursor: pointer"
					@click="register"
					>SignIn</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { useField, useForm } from "vee-validate";
import { string, object } from "yup";
import UserService from "../../../services/auth/UserService";
import themeMixin from "../../../util/themeMixin.js";
export default {
	mixins: [themeMixin],
	data() {
		const validationSchema = object({
			UserName: string().required(),
			Email: string().email().required(),
			Password: string().required(),
		});

		const { handleSubmit, setFieldValue, errors } = useForm({
			validationSchema,
			initialValues: {},
		});

		const handleChangeUserName = (event) => {
			setFieldValue("UserName", event.target.value);
		};

		const handleChangeEmail = (event) => {
			setFieldValue("Email", event.target.value);
		};

		const handleChangePassword = (event) => {
			setFieldValue("Password", event.target.value);
		};

		const { value: UserName } = useField("UserName");
		const { value: Email } = useField("Email");
		const { value: Password } = useField("Password");

		const submit = handleSubmit((values) => {
			this.error = "";
			this.RegisterUser(values);
		});

		return {
			UserName,
			Email,
			Password,
			submit,
			errors,
			handleChangeUserName,
			handleChangeEmail,
			handleChangePassword,
			error: "",
			type: "password",
			text: "Show",
		};
	},
	methods: {
		close() {
			this.$emit("close");
		},
		show() {
			if (this.type == "password") {
				this.type = "text";
				this.text = "Hide";
			} else {
				this.type = "password";
				this.text = "Show";
			}
		},
		register() {
			this.$emit("login", true);
		},
		async RegisterUser(data) {
			data.Role = 2;
			let res = await UserService.createUsers(data);
			console.log(res.data.message);
			if (res.status == 200) {
				this.$emit("login", true);
			} else {
				this.error = res.data.message;
				console.log(this.error);
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
.popup-container {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
}
.popup {
	position: absolute;
	top: -150%;
	left: 50%;
	opacity: 0;
	transform: translate(-50%, -50%) scale(1.25);
	width: 380px;
	padding: 20px 30px;
	background: #fff;
	box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	transition: top 0ms ease-in-out 200ms, opacity 200ms ease-in-out 0ms,
		transform 20ms ease-in-out 0ms;
}
.popup.active {
	top: 50%;
	opacity: 1;
	transform: translate(-50%, -50%) scale(1);
	transition: top 0ms ease-in-out 0ms, opacity 200ms ease-in-out 0ms,
		transform 20ms ease-in-out 0ms;
}
.popup .close-btn {
	position: fixed;
	top: 10px;
	right: 10px;
	width: 15px;
	height: 15px;
	background: #888;
	color: #eee;
	text-align: center;
	line-height: 15px;
	border-radius: 15px;
	cursor: pointer;
}
.popup .form {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
}
.popup .form h2 {
	text-align: center;
	color: #222;
	margin: 10px 0px 20px;
	font-size: 25px;
}
.popup .form .form-element label {
	font-size: 14px;
	color: #222;
}
.popup .form .form-element input[type="text"],
.popup .form .form-element input[type="email"],
.popup .form .form-element input[type="password"] {
	margin-top: 5px;
	display: block;
	width: 100%;
	padding: 10px;
	outline: none;
	border: 1px solid #aaa;
	border-radius: 5px;
}
.popup .form .form-element button {
	width: 100%;
	height: 40px;
	border: none;
	outline: none;
	font-size: 15px;
	background: #222;
	color: #f5f5f5;
	border-radius: 10px;
	cursor: pointer;
}

.password-field {
	position: relative;
}

.password-span {
	position: absolute;
	background: white;
	padding-left: 5px;
	top: 50%;
	right: 10px;
	bottom: 50%;
	color: rgba(0, 0, 0, 0.8);
	cursor: pointer;
}
.signup {
	color: black;
	text-align: center;
}
</style>
