<template>
	<div class="subscription-body">
		<div class="heading-sub">SUBSCRIPTIONS</div>
		<a
			href="#"
			class="section-link d-flex align-items-center"
			v-for="(item, index) in subscription"
			:key="index"
		>
			<div class="section-link-img sub-profile-img">
				<img
					src="img/deku.jpeg"
					alt="image"
					class="rounded-circle"
					id="profileImg"
				/>
			</div>
			<div class="section-link-content">{{ item.name }}</div>
		</a>
		<section-link title="Show more" image="down-arrow" type="svg" />
	</div>
</template>

<script>
import SectionLink from "./SectionLink.vue";
export default {
	data() {
		return {
			subscription: [
				{ name: "PewDiePie" },
				{ name: "JackSepticEye" },
				{ name: "BeardMeetsFood" },
				{ name: "Markiplier" },
				{ name: "Sadist" },
				{ name: "TonyTo" },
				{ name: "Dream" },
			],
		};
	},
	components: {
		SectionLink,
	},
};
</script>
