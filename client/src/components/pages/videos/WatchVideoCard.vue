<template>
	<a
		:href="
			$router.resolve({
				name: 'watch-video',
				params: { videoID: video._id },
			}).href
		"
		class="video-link"
	>
		<div
			class="c-card-main card d-flex"
			:class="{ 'flex-row': horizontal }"
		>
			<div class="c-card-body d-flex">
				<img
					:src="video.Thumbnail"
					class="c-card-thumbnail"
					alt="Video Image"
					v-if="video.Thumbnail"
				/>
				<img
					:src="`${baseUrl}img/no-thumbnail.jpg`"
					class="c-card-thumbnail"
					v-else
				/>
			</div>

			<div class="c-card-footer d-flex" :class="{ 'ps-2': horizontal }">
				<div class="c-card-footer-content d-flex flex-column">
					<div class="card-footer-content-header">
						{{ video.Title }}
					</div>
					<div class="card-footer-content-desc d-flex flex-column">
						<div v-if="name" class="card-footer-link">
							<div v-if="video.Channel.Name">
								<router-link
									:to="{
										name: 'channel-other-home',
										params: {
											channelID: video.Channel._id,
										},
									}"
									class="card-footer-link"
									>{{
										Capitalize(video.Channel.Name)
									}}</router-link
								>
							</div>
							<div v-else>
								<router-link
									:to="{
										name: 'channel-other-home',
										params: {
											channelID: video.Channel._id,
										},
									}"
									class="card-footer-link"
								>
									{{
										Capitalize(
											video.Channel.User.User.UserName
										)
									}}
								</router-link>
							</div>
						</div>
						<div class="d-flex">
							{{ abbreviateNumber(video.Views) }} views &nbsp;<i
								class="fa fa-circle align-self-center"
								aria-hidden="true"
							></i
							>&nbsp;{{ DateDiff(video.createdAt) }} ago
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-center align-content-center">
					<i class="mt-2" aria-hidden="true"
						><img
							:src="`${imgLink}/three-dots.svg`"
							alt="three-dots"
							class=""
					/></i>
				</div>
			</div>
		</div>
	</a>
</template>

<script>
import ThemeMixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
export default {
	mixins: [ThemeMixin, CommonMixin],
	props: {
		video: Object,
		name: Boolean,
		horizontal: Boolean,
	},
};
</script>
