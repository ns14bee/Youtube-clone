<template>
	<div class="d-flex justify-content-center align-items-center w-100 pt-5">
		<div
			class="d-flex flex-column w-50 justify-content-center align-items-center pt-5"
		>
			<img
				class="empty-channel-img"
				:src="`${baseUrl}icons/common/empty_channel.svg`"
				alt="empty"
			/>
			<div class="channel-name">Upload a video to get started</div>
			<div class="text-center channel-sub-count">
				Start sharing your story and connecting with viewers. Videos you
				upload will show up here.
			</div>
		</div>
	</div>
</template>
<script>
import ThemeMixin from "../../../util/themeMixin.js";
export default {
	mixins: [ThemeMixin],
};
</script>

<style scoped>
.empty-channel-img {
	height: 180px;
	width: 180px;
}
</style>
>
