<template>
	<div class="section-two-body">
		<div class="heading-sub">MORE&nbsp;FROM&nbsp;YOUTUBE</div>
		<section-link
			v-for="(item, index) in section1"
			:key="index"
			:title="item.title"
			:image="item.image"
			type="svg"
		/>
	</div>
	<div class="section-three-body">
		<section-link
			v-for="(item, index) in section2"
			:key="index"
			:title="item.title"
			:image="item.image"
			type="svg"
		/>
	</div>
</template>

<script>
import SectionLink from "./SectionLink.vue";
export default {
	data() {
		return {
			section1: [
				{ title: "YouTube Premium", image: "premium" },
				{ title: "Films", image: "films" },
				{ title: "Gaming", image: "gaming" },
				{ title: "Live", image: "live" },
				{ title: "Fashion & beauty", image: "fashion" },
				{ title: "Learning", image: "bulb" },
				{ title: "Send feedback", image: "sport" },
			],
			section2: [
				{ title: "Settings", image: "settings" },
				{ title: "Report history", image: "flag" },
				{ title: "Help", image: "question-mark" },
				{ title: "Send feedback", image: "exclamation-mark" },
			],
		};
	},
	components: {
		SectionLink,
	},
};
</script>
