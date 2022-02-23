<template>
	<a href="#" class="section-link d-flex align-items-center">
		<div class="section-link-img" :id="`${image}-logo`">
			<img
				:src="`${imgLink}/${image}.${type}`"
				:alt="`${image}-logo`"
				class="icon-item"
			/>
		</div>
		<div class="section-link-content">{{ title }}</div>
	</a>
</template>

<script>
import mixin from "../../../util/themeMixin";
export default {
	mixins: [mixin],
	props: {
		title: String,
		image: String,
		type: String,
	},
};
</script>
