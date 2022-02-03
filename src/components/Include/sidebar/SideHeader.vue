<template>
	<div class="section-body">
		<section-link
			v-for="(item, index) in section"
			:key="index"
			:title="item.title"
			:image="item.image"
			type="svg"
		/>
		<div class="section-sub-body">
			<section-link
				v-for="(item, index) in subSection"
				:key="index"
				:title="item.title"
				:image="item.image"
				type="svg"
			/>
		</div>
	</div>
</template>

<script>
import SectionLink from "./SectionLink.vue";
export default {
	data() {
		return {
			section: [
				{ title: "Home", image: "home" },
				{ title: "Explore", image: "explore" },
				{ title: "Subscriptions", image: "subscriptions" },
			],
			subSection: [
				{ title: "Library", image: "library" },
				{ title: "History", image: "history" },
				{ title: "Your videos", image: "your-videos" },
				{ title: "Watch later", image: "watch-later" },
				{ title: "Liked videos", image: "liked-videos" },
				{ title: "Show more", image: "down-arrow" },
			],
		};
	},
	components: {
		SectionLink,
	},
};
</script>
