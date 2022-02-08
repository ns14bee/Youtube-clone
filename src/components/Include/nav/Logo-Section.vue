<template>
	<div class="logo-side d-flex align-items-center justify-content-center">
		<div class="logo-body d-flex" id="micIconId">
			<button
				type="button"
				class="btn logo-button d-flex align-items-center justify-content-center"
				id="barsIconButton"
				data-bs-toggle="collapse"
				data-bs-target="#collapseSidebar"
				aria-expanded="true"
				aria-controls="collapseSidebar"
				@click="changeCollapse"
			>
				<img
					:src="`${imgLink}/bars.svg`"
					alt="bars"
					class="icon-item"
				/>
			</button>
		</div>

		<span
			class="logo-md d-flex align-items-center justify-content-center"
			id="youTubeLogo"
		>
			<img
				:src="`${imgLink}/YouTube.svg`"
				alt="Youtube-logo"
				class="logo-img"
			/>
		</span>
	</div>
</template>

<script>
import mixin from "../../../util/themeMixin.js";
export default {
	mixins: [mixin],
	methods: {
		changeCollapse() {
			this.$store.dispatch("theme/changeCollapse");
			console.log(this.checkCollapse);
		},
	},
};
</script>
