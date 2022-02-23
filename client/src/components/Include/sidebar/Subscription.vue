<template>
	<div class="subscription-body">
		<div class="heading-sub">SUBSCRIPTIONS</div>
		<router-link
			href="#"
			class="section-link d-flex align-items-center"
			v-for="(item, index) in subscriptions"
			:key="index"
			:to="{
				name: 'channel-other-home',
				params: { channelID: item.Creator._id },
			}"
		>
			<div class="section-link-img sub-profile-img">
				<img
					v-if="item.Creator.User.ProfileImage"
					:src="item.Creator.User.ProfileImage"
					alt="image"
					class="rounded-circle"
					id="profileImg"
				/>
				<img
					v-else
					:src="`${imgLink}/user.svg`"
					alt="image"
					class="rounded-circle"
					id="profileImg"
				/>
			</div>
			<div class="section-link-content" v-if="item.Creator.Name">
				{{ Capitalize(item.Creator.Name) }}
			</div>
			<div class="section-link-content" v-else>
				{{ Capitalize(item.Creator.User.User.UserName) }}
			</div>
		</router-link>
		<section-link title="Show more" image="down-arrow" type="svg" />
	</div>
</template>

<script>
import SectionLink from "./SectionLink.vue";
import SubscriptionService from "../../../services/SubscriptionService.js";
import CommonMixin from "../../../util/commonMixin.js";
import ThemeMixin from "../../../util/themeMixin.js";
export default {
	mixins: [CommonMixin, ThemeMixin],
	data() {
		return {
			subscriptions: [],
		};
	},
	async created() {
		try {
			let subscription =
				await SubscriptionService.getSubscriptionOfCurrent();
			if (subscription.status == 200) {
				this.subscriptions = subscription.data;
				console.log(subscription.data);
			} else {
				console.log(subscription.data);
			}
		} catch (err) {
			console.log(err);
		}
	},
	components: {
		SectionLink,
	},
};
</script>
