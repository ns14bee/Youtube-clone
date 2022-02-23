<template>
	<div class="d-flex justify-content-between about-body pt-5">
		<div class="about-description">
			<div>Description</div>
			<div v-if="channel.about">{{ channel.about }}</div>
			<hr />
		</div>
		<div class="about-stats">
			<div>Stats</div>
			<hr />
			<div>Joined {{ dateConvert(channel.createdAt) }}</div>
			<hr />
		</div>
	</div>
</template>

<script>
import ChannelService from "../../../services/ChannelService.js";
import ThemeMixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
export default {
	mixins: [ThemeMixin, CommonMixin],
	props: {
		cid: Number,
	},
	data() {
		return {
			channel: {},
			loaded: false,
		};
	},
	async created() {
		try {
			let res = await ChannelService.ChannelByID(this.cid);
			if (res.status == 200) {
				this.channel = res.data;
				this.loaded = true;
			} else {
				console.log(res.data.message);
			}
		} catch (err) {
			console.log(err);
		}
	},
	async updated() {
		if (!this.loaded) {
			try {
				let res = await ChannelService.ChannelByID(this.cid);
				if (res.status == 200) {
					this.channel = res.data;
					this.loaded = true;
				} else {
					console.log(res.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		}
	},
};
</script>
