<template>
	<div
		class="videos-main-body d-flex justify-content-evenly align-items-center"
	>
		<div class="card-main card d-flex" v-for="index in 20" :key="index">
			<div class="card-body d-flex">
				<img
					src="https://picsum.photos/id/684/600/400"
					class="card-thumbnail"
					alt=""
				/>
			</div>

			<div class="card-footer d-flex">
				<div class="card-footer-profile d-flex">
					<a href="#">
						<img
							src="img/deku.jpeg"
							alt="image"
							class="rounded-circle card-footer-profile-img"
						/>
					</a>
				</div>
				<div class="card-footer-content d-flex flex-column">
					<div class="card-footer-content-header">Title</div>
					<div class="card-footer-content-desc d-flex flex-column">
						<div>JackSepticEye</div>
						<div class="d-flex">
							15M views &nbsp;<i
								class="fa fa-circle align-self-center"
								aria-hidden="true"
							></i
							>&nbsp;8 years ago
						</div>
					</div>
				</div>
				<div>
					<i class="align-self-center" aria-hidden="true"
						><img
							:src="`${imgLink}/three-dots.svg`"
							alt="three-dots"
							class=""
					/></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import mixin from "../../../util/themeMixin.js";
export default {
	mixins: [mixin],
	data() {
		return {};
	},
};
</script>
