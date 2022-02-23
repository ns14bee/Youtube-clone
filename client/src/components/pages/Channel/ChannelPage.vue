<template>
	<div class="main-body w-100">
		<div class="main-sub-body d-flex flex-column">
			<div v-if="channel.Channel && channel.Channel[0].Banner">
				<img class="banner" :src="channel.Channel[0].Banner" />
			</div>
			<div class="d-flex justify-content-center align-items-center">
				<div
					class="channel-details d-flex flew-row justify-content-between align-item-center"
				>
					<div
						class="d-flex flex-row align-items-center justify-content-start"
					>
						<div class="channel-profile-box">
							<img
								v-if="
									channel.Profile &&
									channel.Profile[0].ProfileImage
								"
								:src="channel.Profile[0].ProfileImage"
								class="channel-profile-image rounded-circle"
							/>
							<img
								class="channel-profile-image rounded-circle"
								:src="`${imgLink}/user.svg`"
								v-else
							/>
						</div>
						<div class="d-flex flex-column justify-content-center">
							<div
								class="channel-name"
								v-if="
									channel.Channel && channel.Channel[0].Name
								"
							>
								{{ Capitalize(channel.Channel[0].Name) }}
							</div>
							<div class="channel-name" v-else>
								{{ Capitalize(channel.UserName) }}
							</div>
							<div class="channel-sub-count">
								{{
									abbreviateNumber(subscribers)
								}}&nbsp;subscribers
							</div>
						</div>
					</div>
					<div class="channel-btn-box" v-if="current">
						<div class="me-2 mt-2">
							<button class="channel-btn rounded">
								{{ UpperCase("customize channel") }}
							</button>
						</div>
						<div class="mt-2">
							<button class="channel-btn rounded">
								{{ UpperCase("manage videos") }}
							</button>
						</div>
					</div>
					<div class="channel-btn-box" v-else>
						<div class="me-2 mt-2" v-if="!subStatus">
							<button class="subscribe-btn" @click="subscribe">
								SUBSCRIBE
							</button>
						</div>
						<div class="me-2 mt-2" v-else>
							<button class="subscribed-btn" @click="subscribe">
								SUBSCRIBED
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="wrapper d-flex flex-row mt-1">
				<button
					@click="scroll_left"
					class="rounded-circle slider-arrow-btn"
				>
					<img :src="`${imgLink}/left-arrow.svg`" />
				</button>
				<div class="wrapper-box">
					<div
						id="box"
						class="d-flex align-items-center"
						v-if="current"
					>
						<router-link
							to="home"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Home</router-link
						>
						<router-link
							to="videos"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Videos</router-link
						>
						<router-link
							to="playlists"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Playlists</router-link
						>
						<router-link
							to="channels"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Channels</router-link
						>
						<router-link
							to="about"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>About</router-link
						>
						<a href="#" class="wrapper-box-item"
							><img :src="`${imgLink}/search.svg`"
						/></a>
					</div>
					<div id="box" class="d-flex align-items-center" v-else>
						<router-link
							:to="`/c/${$route.params.channelID}/home`"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Home</router-link
						>
						<router-link
							:to="`/c/${$route.params.channelID}/videos`"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Videos</router-link
						>
						<router-link
							:to="`/c/${$route.params.channelID}/playlists`"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Playlists</router-link
						>
						<router-link
							:to="`/c/${$route.params.channelID}/channels`"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>Channels</router-link
						>
						<router-link
							:to="`/c/${$route.params.channelID}/about`"
							href="#"
							class="wrapper-box-item"
							active-class="router-channel-active"
							>About</router-link
						>
						<a href="#" class="wrapper-box-item"
							><img :src="`${imgLink}/search.svg`"
						/></a>
					</div>
				</div>
				<button
					@click="scroll_right"
					class="rounded-circle slider-arrow-btn"
				>
					<img :src="`${imgLink}/right-arrow.svg`" />
				</button>
			</div>
		</div>
		<div class="sub-body-box">
			<router-view :cid="channel._id"></router-view>
		</div>
	</div>
</template>

<script>
import ChannelService from "../../../services/ChannelService.js";
import UserService from "../../../services/auth/UserService.js";
import SubscriptionService from "../../../services/SubscriptionService.js";
import ThemeMixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
import { mapGetters } from "vuex";
export default {
	mixins: [ThemeMixin, CommonMixin],
	data() {
		return {
			channel: {},
			profile: {},
			current: true,
			subscribers: 0,
			loaded: false,
			subStatus: false,
		};
	},
	async created() {
		if (Object.keys(this.$route.params).length < 1) {
			this.currentUser();
		} else {
			try {
				let id = this.$route.params.channelID;
				if (this.auth) {
					let currentChannel = await ChannelService.CurrentChannel();
					if (parseInt(id) == parseInt(currentChannel.data._id)) {
						this.currentUser();
					} else {
						this.channelUser(id);
					}
				} else {
					this.channelUser(id);
				}
			} catch (err) {
				console.log(err);
			}
		}
	},
	methods: {
		...mapGetters("auth", {
			getUser: "getUser",
		}),
		scroll_left() {
			let content = document.querySelector(".wrapper-box");
			content.scrollLeft -= 100;
		},
		scroll_right() {
			let content = document.querySelector(".wrapper-box");
			content.scrollLeft += 100;
		},
		async currentUser() {
			try {
				let currentChannel = await UserService.current();
				if (currentChannel.status == 200) {
					this.channel = currentChannel.data[0];
					let subCount = await SubscriptionService.getSubscriberCount(
						this.channel.Channel[0]._id
					);
					if (subCount.status == 200) {
						this.subscribers = subCount.data.Total;
					} else {
						console.log(subCount.data);
					}

					this.current = true;
					this.loaded = true;
				} else {
					console.log(currentChannel.data);
					this.signOut();
				}
			} catch (err) {
				console.log(err);
			}
		},
		async channelUser(id) {
			let otherChannel = await UserService.getUserByID(id);
			if (otherChannel.status == 200) {
				this.channel = otherChannel.data[0];
				let subCount = await SubscriptionService.getSubscriberCount(id);
				if (subCount.status == 200) {
					this.subscribers = subCount.data.Total;
				} else {
					console.log(subCount.data);
				}
				let sub = await SubscriptionService.checkSubscription(id);
				if (sub.status == 200) {
					console.log(sub.data);
					if (sub.data.Active) {
						this.subStatus = true;
					} else {
						this.subStatus = false;
					}
				} else {
					this.subStatus = false;
				}
				this.current = false;
			} else {
				console.log(otherChannel.data);
			}
		},
		async subscribe() {
			if (this.auth) {
				try {
					let res = await SubscriptionService.UpdateSubscription(
						this.channel.Channel[0]._id
					);
					if (res.status == 200) {
						if (res.data.Active) {
							this.subStatus = true;
						} else {
							this.subStatus = false;
						}
						let subCount =
							await SubscriptionService.getSubscriberCount(
								this.channel.Channel[0]._id
							);
						if (subCount.status == 200) {
							this.subscribers = subCount.data.Total;
						} else {
							console.log(subCount.data);
						}
					} else {
						console.log(res.data.message);
					}
				} catch (err) {
					console.log(err);
				}
			} else {
				this.$router.replace("/register/");
			}
		},
	},
};
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.wrapper-box {
	max-width: 90%;
	overflow: auto;
	overflow-x: hidden;
}
#box {
	width: 1000px;
	height: 47px;
	position: relative;
}
</style>
