<template>
	<div class="search-box d-flex">
		<div class="search-body d-flex">
			<div
				class="input-search-body d-flex align-items-center justify-content-center"
				id="searchBodyId"
			>
				<input
					type="text"
					placeholder="Search"
					id="searchBodyButton"
					class="form-control input-search"
					@focus="focusFunction"
					@blur="blurFunction"
				/>
			</div>
			<div class="search-icon-body d-flex" id="searchIconId">
				<button
					type="button"
					class="btn search-button"
					id="searchIconButton"
				>
					<img
						:src="`${imgLink}/search.svg`"
						alt="search"
						class="icon-item"
					/>
				</button>
			</div>
		</div>
		<div class="icon-body d-flex" id="micIconId">
			<button
				type="button"
				class="btn icon-button mic-button d-flex align-items-center justify-content-center"
				id="micIconButton"
			>
				<img :src="`${imgLink}/mic.svg`" alt="Mic" class="icon-item" />
			</button>
		</div>
	</div>
</template>

<script>
import mixin from "../../../util/themeMixin.js";
export default {
	mixins: [mixin],
	methods: {
		focusFunction() {
			document
				.getElementById("searchBodyId")
				.classList.add("border", "border-primary");
		},
		blurFunction() {
			document
				.getElementById("searchBodyId")
				.classList.remove("border", "border-primary");
		},
	},
};
</script>

<style scoped>
/* .input-search-body {
	border: 1px solid blue !important;
} */
</style>
