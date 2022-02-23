<template>
	<div class="main-body">
		<div class="videos-main-body">Profile Page</div>
		<div>{{ channel }}</div>
		<div>{{ profile }}</div>
	</div>
</template>

<script>
import ChannelService from "../../../services/ChannelService.js";
import ProfileService from "../../../services/ProfileService.js";
import mixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
export default {
	mixins: [mixin, CommonMixin],
	data() {
		return {
			channel: {},
			profile: {},
		};
	},
	async created() {
		let currentChannel = await ChannelService.CurrentChannel();
		let currentProfile = await ProfileService.CurrentProfile();
		if (currentChannel.status == 200 && currentProfile.status == 200) {
			this.channel = currentChannel.data;
			this.profile = currentProfile.data;
			console.log(this.channel);
			console.log(this.profile);
		} else {
			if (!currentChannel.status == 200) {
				console.log(currentChannel.data);
			}
			if (!currentProfile.status == 200) {
				console.log(currentProfile.data);
			}
			this.signOut();
		}
	},
};
</script>
