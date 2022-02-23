<template>
	<section class="container">
		<div class="h1 text-center text-primary m-3">Users</div>
		<table class="table table-hover table-bordered" v-if="users">
			<thead>
				<tr class="table-danger">
					<th v-for="(item, index) in users[0]" :key="index">
						{{ index }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, index) in users"
					:key="item._id"
					:index="index"
					:item="item"
					class="table-primary"
				>
					<td v-for="value in item" :key="value">
						{{ value }}
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import UserService from "../../services/auth/UserService.js";
import { mapActions } from "vuex";
export default {
	data() {
		return {
			users: [],
		};
	},
	method: {
		...mapActions("error", {
			setError: "setError",
		}),
		async setState(data) {
			await this.setError(data);
		},
	},
	async created() {
		try {
			let res = await UserService.getUsers();
			if (res.status == 200) {
				this.users = res.data;
			} else {
				// await this.setError(res.data);
				let data = {
					message: res.data,
					code: res.status,
				};
				await this.$store.dispatch("error/setErrors", data);
				this.$router.replace({ name: "error" });
			}
		} catch (err) {
			console.log(err);
		}
	},
};
</script>
