<template>
	<div class="tag-body d-flex">
		<div class="tag-item d-flex align-items-center ms-4">
			<a href="#" class="tag-link">All</a>
		</div>
		<div
			class="tag-item d-flex align-items-center"
			v-for="(item, index) in tags"
			:key="index"
		>
			<a href="#" class="tag-link">{{ item.tag }}</a>
		</div>
		<div class="tag-item d-flex align-items-center tag-nav">
			<a href="#" class="tag-link link-dropdown-logo">
				<img
					:src="`${imgLink}/right-arrow.svg`"
					alt="right-arrow-logo"
					class="icon-item"
				/>
			</a>
		</div>
	</div>
</template>

<script>
import mixin from "../../util/themeMixin.js";
export default {
	mixins: [mixin],
	data() {
		return {
			tags: [
				{ tag: "Funny" },
				{ tag: "Trending" },
				{ tag: "Food" },
				{ tag: "Anime" },
				{ tag: "Codding" },
				{ tag: "Genshin Impact" },
				{ tag: "Minecraft" },
				{ tag: "Ganyu" },
				{ tag: "One piece" },
				{ tag: "Python" },
				{ tag: "Naruto" },
				{ tag: "Genshin Impact" },
				{ tag: "Naruto" },
			],
		};
	},
};
</script>
