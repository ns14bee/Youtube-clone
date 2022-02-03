<template>
	<div class="main-body d-flex flex-column">
		<div class="videos-main-body d-flex">
			<video-item />
		</div>
	</div>
</template>

<script>
import VideoItem from "./videos/VideoItem.vue";
export default {
	components: {
		VideoItem,
	},
};
</script>
