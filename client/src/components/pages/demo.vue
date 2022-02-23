<template>
	<div class="d-flex bg-secondary">
		<div class="b"></div>
		<div class="d-flex flex-column">
			<div class="c">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ipsa
				dolorem ullam commodi harum! Nemo harum hic, impedit fugiat
				voluptas nobis laborum unde eligendi iste, quidem voluptates.
				Sed, eveniet quos?
			</div>
			<div class="video-box">
				<div
					class="video-box-item"
					v-for="(item, index) in user"
					:key="index"
				>
					{{ item.Email }} {{ page }}
				</div>
				<div ref="infinitescrolltrigger" id="scoll-trigger"></div>
				<div class="circle-loader" v-if="showloader"></div>
			</div>
		</div>
	</div>
</template>
<script>
// import HomeBody from "./Home-Body.vue";
import UserService from "../../services/auth/UserService.js";

export default {
	components: {
		// HomeBody,
	},
	data() {
		return {
			user: [],
			item: [],
			page: 1,
			limit: 2,
			total: 1,
			showloader: false,
		};
	},
	async created() {
		let current = await UserService.getUsers(this.page, this.limit);
		if (current.status == 200) {
			this.user = current.data.docs;
			this.page = current.data.nextPages;
			this.total = current.data.totalPages;
			console.log(current.data);
		} else {
			console.log(current.data);
		}
	},
	methods: {
		scrollTrigger() {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0 && this.page != null) {
						this.showloader = true;
						setTimeout(async () => {
							this.showloader = false;
							let current = await UserService.getUsers(
								this.page,
								this.limit
							);
							this.page = current.data.nextPage;
							console.log(this.page);
							this.user = [...this.user, ...current.data.docs];
						}, 1000);
					}
				});
			});
			observer.observe(this.$refs.infinitescrolltrigger);
		},
	},
	mounted() {
		this.scrollTrigger();
	},
	unmounted() {},
};
</script>
<style scoped>
.b {
	display: block;
	width: 240px;
	height: 700px;
	border: 1px solid black;
	background-color: red;
}
.c {
	display: block;
	height: fit-content;
	width: fit-content;
	background-color: yellow;
}
.video-box {
	width: 800px;
	overflow: auto;
	border: 1px solid black;
}
.video-box-item {
	border: 1px solid black;
	height: 500px;
	color: black;
}
.circle-loader {
	position: fixed;
	transform: translate(-50%, -50%);
	top: 90%;
	left: 50%;
	right: 50%;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 0.2);
	border-top: 2px solid #fff;
	animation: animate 1.5s infinite linear;
}
@keyframes animate {
	0% {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	100% {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}
</style>
