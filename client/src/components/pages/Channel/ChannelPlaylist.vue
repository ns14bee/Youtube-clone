<template>
	<div>Playlist</div>
</template>
<script>
import CustomEncrypt from "../../../util/CustomEncrypt.js";
export default {
	data() {
		return {
			id: CustomEncrypt.decrypt(
				"U2FsdGVkX19IAB3gjkc4/6yrQL9WzLbpRR/b6s8k0Cg="
			),
		};
	},
};
</script>
