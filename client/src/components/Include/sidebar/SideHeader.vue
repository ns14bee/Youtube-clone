<template>
	<div class="section-body">
		<section-link
			v-for="(item, index) in section"
			:key="index"
			:title="item.title"
			:image="item.image"
			type="svg"
		/>
		<div class="section-sub-body" v-if="auth">
			<section-link
				v-for="(item, index) in subSection"
				:key="index"
				:title="item.title"
				:image="item.image"
				type="svg"
			/>
		</div>
		<div class="section-sub-body" v-else>
			<section-link
				v-for="(item, index) in subSection2"
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
import themeMixin from "../../../util/themeMixin.js";
export default {
	mixins: [themeMixin],
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
			subSection2: [
				{ title: "Library", image: "library" },
				{ title: "History", image: "history" },
			],
		};
	},
	components: {
		SectionLink,
	},
};
</script>
