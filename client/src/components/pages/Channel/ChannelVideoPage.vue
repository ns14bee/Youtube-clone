<template>
	<div class="d-flex flex-column pt-5">
		<div class="d-flex justify-content-between align-items-center">
			<div>
				<button
					type="button"
					class="btn filter-button d-flex align-items-center justify-content-center icon-p dropdown"
					data-bs-toggle="dropdown"
					data-bs-target="#video-filter"
				>
					Uploads
				</button>
				<!-- Filter video -->
				<div
					class="dropdown-menu filter-dropdown"
					id="#video-filter"
					v-if="!disabled"
				>
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': all }"
						v-on:click.prevent="sortVideoType(0)"
					>
						<div class="filter-content align-self-center">
							All Videos
						</div>
					</a>
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': publicVideo }"
						v-on:click.prevent="sortVideoType(1)"
					>
						<div class="filter-content align-self-center">
							Public
						</div>
					</a>
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': privateVideo }"
						v-on:click.prevent="sortVideoType(2)"
					>
						<div class="filter-content align-self-center">
							Private
						</div>
					</a>
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': unlisted }"
						v-on:click.prevent="sortVideoType(3)"
					>
						<div class="filter-content align-self-center">
							Unlisted
						</div>
					</a>
				</div>
			</div>
			<div>
				<button
					type="button"
					class="btn filter-button d-flex align-items-center justify-content-center icon-p dropdown"
					data-bs-toggle="dropdown"
					data-bs-target="#video-filter"
				>
					<img
						:src="`${imgLink}/filter.svg`"
						alt="filter"
						class="icon-item me-2"
					/>
					SORT BY
				</button>
				<!-- Filter video -->
				<div class="dropdown-menu filter-dropdown" id="#video-filter">
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': popular }"
						v-on:click.prevent="sortVideos(3)"
					>
						<div class="filter-content align-self-center">
							Most popular
						</div>
					</a>
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': old }"
						v-on:click.prevent="sortVideos(2)"
					>
						<div class="filter-content align-self-center">
							Date added (newest)
						</div>
					</a>
					<a
						href="#"
						class="d-flex filter-link"
						:class="{ 'filter-link-active': sortNew }"
						v-on:click.prevent="sortVideos(1)"
					>
						<div class="filter-content align-self-center">
							Date added (oldest)
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="videos-c-main-body pt-4">
			<video-item
				v-for="(item, index) in videos"
				:key="index"
				:video="item"
				:name="false"
				:horizontal="false"
				class="mx-1"
			/>
			<div class="pt-5 text-center w-100" v-if="!videos.length">
				No videos yet!
			</div>
			<div ref="infiniteScrollTrigger" id="scroll-trigger"></div>
			<div class="circle-loader" v-if="showLoader"></div>
		</div>
	</div>
</template>

<script>
import VideoService from "../../../services/VideoService.js";
import ChannelService from "../../../services/ChannelService.js";
import VideoItem from "./ChannelVideoCard.vue";
import ThemeMixin from "../../../util/themeMixin.js";
export default {
	mixins: [ThemeMixin],
	components: {
		VideoItem,
	},
	props: {
		cid: Number,
	},
	data() {
		return {
			videos: [],
			page: 1,
			limit: 5,
			total: 1,
			showLoader: false,
			loaded: false,
			sort: 1,
			type: 0,
			sortNew: true,
			old: false,
			popular: false,
			all: false,
			publicVideo: true,
			privateVideo: false,
			unlisted: false,
			disabled: true,
		};
	},
	methods: {
		scrollTrigger() {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (
						entry.intersectionRatio > 0 &&
						this.page != null &&
						this.loaded &&
						this.videos.length
					) {
						this.showLoader = true;
						setTimeout(async () => {
							try {
								let res = await VideoService.getCurrent(
									this.cid,
									this.page,
									this.limit,
									this.sort,
									this.type
								);
								if (res.status == 200) {
									this.videos = [
										...this.videos,
										...res.data.docs,
									];
									this.page = res.data.nextPage;
									console.log("scroll");
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
		sortVideoType(value) {
			if (this.type != value) {
				this.loaded = false;
				this.all = false;
				this.publicVideo = false;
				this.privateVideo = false;
				this.unlisted = false;
				this.type = value;
				if (value == 0) {
					this.all = true;
				} else if (value == 1) {
					this.publicVideo = true;
				} else if (value == 2) {
					this.privateVideo = true;
				} else {
					this.unlisted = true;
				}
				this.videos = [];
				this.loaded = false;
			}
		},
		sortVideos(value) {
			if (this.sort != value) {
				this.loaded = false;
				this.sortNew = false;
				this.old = false;
				this.popular = false;
				this.sort = value;
				if (value == 1) {
					this.sortNew = true;
				} else if (value == 2) {
					this.old = true;
				} else {
					this.popular = true;
				}
				this.videos = [];
				this.loaded = false;
			}
		},
	},
	async created() {
		try {
			if (this.cid) {
				let res = await VideoService.getCurrent(
					this.cid,
					this.page,
					this.limit,
					this.sort,
					this.type
				);
				this.loaded = true;
				if (res.status == 200) {
					this.videos = res.data.docs;
					this.page = res.data.nextPage;
					this.total = res.data.totalPages;
				} else {
					console.log(res.data.message);
				}
				let currentChannel = await ChannelService.CurrentChannel();
				console.log(currentChannel);
				if (currentChannel.status == 200) {
					if (currentChannel.data._id == this.cid) {
						this.disabled = false;
					} else {
						this.disabled = true;
					}
				} else {
					console.log(res.data.message);
				}
			}
		} catch (err) {
			console.log(err);
		}
	},
	mounted() {
		this.scrollTrigger();
	},
	async updated() {
		try {
			if (this.cid && !this.loaded) {
				let res = await VideoService.getCurrent(
					this.cid,
					this.page,
					this.limit,
					this.sort,
					this.type
				);
				this.loaded = true;
				if (res.status == 200) {
					this.videos = res.data.docs;
					this.page = res.data.nextPage;
					this.total = res.data.totalPages;
				} else {
					console.log(res);
				}
				let currentChannel = await ChannelService.CurrentChannel();
				if (currentChannel.status == 200) {
					if (currentChannel.data._id == this.cid) {
						this.disabled = false;
					} else {
						this.disabled = true;
					}
				} else {
					console.log(res.data.message);
				}
			}
		} catch (err) {
			console.log(err);
		}
	},
};
</script>
