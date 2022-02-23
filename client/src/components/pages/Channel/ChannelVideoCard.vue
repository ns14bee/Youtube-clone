<template>
	<router-link :to="`/watch/${video._id}`" class="video-link">
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
						<div v-if="name">
							<div v-if="video.Channel.Name">
								{{ Capitalize(video.Channel.Name) }}
							</div>
							<div v-else>
								{{
									Capitalize(video.Channel.User.User.UserName)
								}}
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
	</router-link>
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
