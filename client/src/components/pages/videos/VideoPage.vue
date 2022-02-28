<template>
	<div class="video-page-main-body d-flex">
		<div class="video-player-body d-flex flex-column align-items-center">
			<!-- <Artplayer
				@get-instance="getInstance"
				:option="option"
				class="video-player"
				v-if="loaded"
				ref="videoPlayer"
			/> -->
			<vue3-video-player
				:src="video.Video"
				title="test"
				class="video-player"
				@play="VideoPlay"
				v-if="loaded"
				ref="videoPlayer"
				id="videoPlayer"
			>
			</vue3-video-player>
			<div class="d-flex flex-column w-100 video-page-desc-body">
				<div class="d-flex flex-column w-100">
					<div class="video-page-title">
						{{ video.Title }}
					</div>
					<div class="d-flex justify-content-between">
						<div class="d-flex align-items-center video-page-desc">
							{{ video.Views || 0 }} views &nbsp;<i
								class="fa fa-circle align-self-center"
								aria-hidden="true"
							></i
							>&nbsp;{{ dateConvert(video.createdAt) }}
						</div>
						<div class="d-flex">
							<button
								type="button"
								class="btn rating-button d-flex align-items-center justify-content-center icon-p dropdown"
								@click="setRating(video._id, 1)"
							>
								<img
									:src="`${imgLink}/like.svg`"
									alt="like"
									class="icon-item"
									v-if="!like"
								/>
								<img
									:src="`${imgLink}/like-fill.svg`"
									alt="like"
									class="icon-item"
									v-else
								/>
							</button>
							{{ abbreviateNumber(likes) }}
							<button
								type="button"
								class="btn rating-button d-flex align-items-center justify-content-center icon-p dropdown ms-3"
								@click="setRating(video._id, 2)"
							>
								<img
									:src="`${imgLink}/dislike.svg`"
									alt="dislike"
									class="icon-item"
									v-if="!dislike"
								/>
								<img
									:src="`${imgLink}/dislike-fill.svg`"
									alt="dislike"
									class="icon-item"
									v-else
								/>
							</button>
							{{ abbreviateNumber(dislikes) }}
						</div>
					</div>
				</div>
				<hr />
				<div class="d-flex justify-content-between">
					<div class="d-flex">
						<div class="video-profile-image">
							<img
								v-if="
									video.Profile &&
									video.Profile[0].ProfileImage
								"
								:src="video.Profile[0].ProfileImage"
								alt="image"
								class="rounded-circle"
							/>
							<img
								:src="`${imgLink}/user.svg`"
								alt="image"
								class="rounded-circle"
								v-else
							/>
						</div>
						<div class="profile-header-title">
							<div
								class="profile-header-item"
								v-if="
									video.Channel &&
									video.Channel[0].Name &&
									video.Channel[0]._id
								"
							>
								<router-link
									:to="{
										name: 'channel-other-home',
										params: {
											channelID: video.Channel[0]._id,
										},
									}"
									class="profile-header-item"
									>{{
										Capitalize(video.Channel[0].Name)
									}}</router-link
								>
							</div>
							<div
								class="profile-header-item"
								v-if="
									video.Channel &&
									video.Channel[0]._id &&
									!video.Channel[0].Name &&
									video.User &&
									video.User[0].UserName
								"
							>
								<router-link
									:to="{
										name: 'channel-other-home',
										params: {
											channelID: video.Channel[0]._id,
										},
									}"
									class="profile-header-item"
								>
									{{
										Capitalize(video.User[0].UserName)
									}}</router-link
								>
							</div>
							<div class="video-page-desc">
								{{ abbreviateNumber(subscribers) }} subscribers
							</div>
							<div class="video-page-detail">
								<div>{{ video.Description }}</div>
							</div>
						</div>
					</div>
					<div class="channel-btn-box" v-if="!current">
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
					<div class="channel-btn-box" v-else>
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
				</div>
			</div>
		</div>
		<div class="video-list-body d-flex flex-column">
			<watch-video-card
				v-for="(item, index) in videos"
				:key="index"
				:video="item"
				:name="true"
				:horizontal="true"
				class="mx-2 my-2"
			/>
			<div ref="infiniteScrollTrigger" id="scroll-trigger"></div>
			<div class="circle-loader" v-if="showLoader"></div>
		</div>
	</div>
</template>

<script>
import ThemeMixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
import WatchVideoCard from "./WatchVideoCard.vue";
import VideoService from "../../../services/VideoService.js";
import ChannelService from "../../../services/ChannelService.js";
import SubscriptionService from "../../../services/SubscriptionService.js";
import HistoryService from "../../../services/HistoryService.js";
import RatingService from "../../../services/RatingService.js";
// import Artplayer from "artplayer/examples/vue/Artplayer";
import options from "../../../util/videoOption.js";
export default {
	mixins: [ThemeMixin, CommonMixin],
	components: {
		WatchVideoCard,
		// Artplayer,
	},
	data() {
		return {
			subscribers: 0,
			collapse: false,
			videos: [],
			video: {},
			views: 0,
			page: 1,
			limit: 4,
			total: 1,
			showLoader: false,
			option: options,
			componentKey: 0,
			loaded: false,
			subStatus: false,
			current: true,
			like: false,
			dislike: false,
			likes: 0,
			dislikes: 0,
			currentTime: 0,
		};
	},
	methods: {
		getInstance(art) {
			console.log(art);
		},
		forceRerender(key) {
			this.componentKey = key;
			this.loaded = true;
		},
		scrollTrigger() {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0 && this.page != null) {
						this.showLoader = true;
						setTimeout(async () => {
							try {
								let res = await VideoService.getAll(
									this.page,
									this.limit
								);
								if (res.status == 200) {
									this.videos = [
										...this.videos,
										...res.data.docs,
									];
									this.page = res.data.nextPage;
								} else {
									console.log(res);
								}
							} catch (err) {
								console.log(err);
							}
							this.showLoader = false;
						}, 1000);
					}
				});
			});
			observer.observe(this.$refs.infiniteScrollTrigger);
		},

		async loadVideos() {
			try {
				let res = await VideoService.getAll(this.page, this.limit);
				if (res.status == 200) {
					this.videos = res.data.docs;
					this.page = res.data.nextPage;
					this.total = res.data.totalPages;
				} else {
					console.log(res);
				}
			} catch (err) {
				console.log(err);
			}
		},
		async getCurrent() {
			this.video = {};
			console.log("video");
			try {
				let id = this.$route.params.videoID;
				console.log(this.$route.params.videoID);
				if (id) {
					let res = await VideoService.getVideoByID(id);
					if (res.status == 200) {
						this.video = res.data;
						this.option.url = res.data.Video;
						this.option.poster = res.data.Thumbnail;
						this.option.title = res.data.Title;
						// this.forceRerender(res.data._id);
						this.setCurrentTime(res.data._id);
						this.loaded = true;
						console.log(this.video);
					} else {
						let error = {
							code: res.status,
							message: res.data.message,
						};
						this.$store.dispatch("error/setError", error);
					}
					this.checkChannel(this.video.Channel[0]._id);
					this.getRatings(this.video._id);
					this.checkCurrentRating(this.video._id);
					this.subscriberCount(this.video.Channel[0]._id);
					this.updateViews(this.video._id);
				} else {
					this.$router.replace({ name: "home" });
				}
			} catch (err) {
				console.log(err);
			}
		},
		async getRatings(id) {
			try {
				let likeRes = await RatingService.getRatingByID(id, 1);
				let dislikeRes = await RatingService.getRatingByID(id, 2);
				if (likeRes.status == 200 && dislikeRes.status) {
					this.likes = likeRes.data.Total;
					this.dislikes = dislikeRes.data.Total;
				} else {
					if (likeRes.data.message) {
						console.log(likeRes.data.message);
					}
					if (dislikeRes.data.message) {
						console.log(dislikeRes.data.message);
					}
				}
			} catch (err) {
				console.log(err);
			}
		},
		async setRating(id, data) {
			if (this.auth) {
				let newData = data;
				if (data == 1 && this.like) {
					newData = 3;
				}
				if (data == 2 && this.dislike) {
					newData = 3;
				}
				let req = await RatingService.updateRating(id, {
					LikeStatus: parseInt(newData),
				});
				if (req.status == 200) {
					this.checkCurrentRating(id);
					this.getRatings(id);
				} else {
					console.log(req);
				}
			} else {
				this.$router.push({ name: "login" });
			}
		},
		async subscribe() {
			if (this.auth) {
				try {
					let res = await SubscriptionService.UpdateSubscription(
						this.video.Channel[0]._id
					);
					if (res.status == 200) {
						if (res.data.Active) {
							this.subStatus = true;
						} else {
							this.subStatus = false;
						}
						this.subscriberCount(this.video.Channel[0]._id);
					} else {
						console.log(res.data.message);
					}
				} catch (err) {
					console.log(err);
				}
			} else {
				this.$router.replace({ name: "login" });
			}
		},
		async checkChannel(id) {
			if (this.auth) {
				try {
					let currentChannel = await ChannelService.CurrentChannel();
					if (parseInt(id) == parseInt(currentChannel.data._id)) {
						this.current = true;
					} else {
						let sub = await SubscriptionService.checkSubscription(
							id
						);
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
					}
				} catch (err) {
					console.log(err);
				}
			}
		},
		async subscriberCount(id) {
			try {
				let subCount = await SubscriptionService.getSubscriberCount(id);
				if (subCount.status == 200) {
					this.subscribers = subCount.data.Total;
				} else {
					console.log(subCount.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		async checkCurrentRating(id) {
			if (this.auth) {
				try {
					let currentRating = await RatingService.checkCurrentRating(
						id
					);
					console.log(currentRating);
					if (currentRating.status == 200) {
						if (currentRating.data.LikeStatus == 1) {
							this.like = true;
							this.dislike = false;
						} else if (currentRating.data.LikeStatus == 2) {
							this.dislike = true;
							this.like = false;
						} else if (currentRating.data.LikeStatus == 3) {
							this.dislike = false;
							this.like = false;
						}
					} else {
						console.log(currentRating.data.message);
					}
				} catch (err) {
					console.log(err);
				}
			}
		},
		async updateViews(id) {
			try {
				let viewData = await VideoService.UpdateVideoView(id);
				if (viewData.status == 200) {
					this.views = viewData.data.Views;
				}
			} catch (err) {
				console.log(err);
			}
		},
		redirectVideo(id) {
			// this.$router.push({ name: "watch-video", params: { videoID: id } });
			console.log(id);
		},
		VideoPlay() {
			console.log("play");
			this.getCurTime();
			console.log(this.$refs.videoPlayer.$player.$video.currentTime);
		},
		VideoStop() {
			console.log("stop");
		},
		getCurTime() {
			let vid = document.getElementById("videoPlayer");
			console.log(vid);
		},
		async setCurrentTime(id) {
			try {
				if (this.auth) {
					let history = await HistoryService.getHistoryByVideo(id);
					console.log(history.data);
					if (history.status == 200) {
						this.$refs.videoPlayer.$player.$video.currentTime =
							history.data.Duration;
					} else {
						console.log(history.data.message);
					}
				}
			} catch (err) {
				console.log(err);
			}
		},
	},

	created() {
		this.$store.dispatch("theme/changeCollapse", false);
		this.collapse = true;
		this.getCurrent();
		this.loadVideos();
	},
	updated() {
		if (!this.collapse) {
			this.$store.dispatch("theme/changeCollapse", false);
			this.collapse = true;
		}
	},
	mounted() {
		this.scrollTrigger();
	},
	async beforeUnmount() {
		if (this.auth) {
			try {
				let duration = Math.ceil(
					parseInt(this.$refs.videoPlayer.$player.$video.duration)
				);
				let ct = Math.ceil(
					parseInt(
						this.$refs.videoPlayer.$player.$video.currentTime
					) || 0
				);
				if (ct == duration) {
					ct = 0;
				}
				console.log();
				let data = {
					Duration: ct,
				};
				console.log(data);
				let history = await HistoryService.UpdateHistory(
					this.video._id,
					data
				);
				if (history.status == 200) {
					console.log(history.data);
				} else {
					console.log(history.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		}
	},
};
</script>

<style scoped>
.a {
	border: 1px solid white;
}
</style>
