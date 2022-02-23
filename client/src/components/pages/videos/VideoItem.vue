<template>
	<div class="videos-main-body">
		<video-item
			v-for="(item, index) in videos"
			:key="index"
			:video="item"
		/>
		<div ref="infiniteScrollTrigger" id="scroll-trigger"></div>
		<div class="circle-loader" v-if="showLoader"></div>
	</div>
</template>

<script>
import VideoItem from "./VideoCard.vue";
import VideoService from "../../../services/VideoService.js";
import ThemeMixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
export default {
	mixins: [ThemeMixin, CommonMixin],
	data() {
		return {
			videos: [],
			page: 1,
			limit: 2,
			total: 1,
			showLoader: false,
		};
	},
	components: {
		VideoItem,
	},
	methods: {
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
	},
	async created() {
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
	mounted() {
		this.scrollTrigger();
	},
};
</script>
