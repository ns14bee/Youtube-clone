<template>
	<div class="video-page-main-body d-flex justify-content-start">
		<div v-if="!auth">No Data</div>
		<div class="m-5 p-5" else>Watch history</div>
		<div class="mt-2">
			<watch-video-card
				v-for="(item, index) in historyList"
				:key="index"
				:video="item.Video"
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
import HistoryService from "../../../services/HistoryService.js";
import WatchVideoCard from "./WatchVideoCard.vue";
export default {
	mixins: [ThemeMixin, CommonMixin],
	data() {
		return {
			historyList: [],
			loaded: false,
			page: 1,
			limit: 10,
			total: 1,
			showLoader: false,
		};
	},
	components: {
		WatchVideoCard,
	},
	methods: {
		scrollTrigger() {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0 && this.page != null) {
						this.showLoader = true;
						setTimeout(async () => {
							try {
								let res =
									await HistoryService.getHistoryOfCurrent(
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
			let history = await HistoryService.getHistoryOfCurrent(
				this.page,
				this.limit
			);
			if (history.status == 200) {
				this.historyList = history.data.docs;
				this.page = history.data.nextPage;
				this.total = history.data.totalPages;
			} else {
				console.log(history.data.message);
			}
		} catch (err) {
			console.log(err);
		}
	},
};
</script>
