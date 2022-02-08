<template>
	<div class="main-body d-flex flex-column">
		<tags />
		<video-item />
	</div>
</template>

<script>
import VideoItem from "./videos/VideoItem.vue";
import Tags from "./Tags.vue";
export default {
	components: {
		VideoItem,
		Tags,
	},
};
</script>
