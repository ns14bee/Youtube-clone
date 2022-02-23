<template>
	<router-link :to="`/watch/${video._id}`" class="video-link">
		<div class="card-main card d-flex">
			<div class="card-body d-flex">
				<img
					:src="video.Thumbnail"
					class="card-thumbnail"
					alt="Video Image"
					v-if="video.Thumbnail"
				/>
				<img :src="`${baseUrl}img/no-thumbnail.jpg`" v-else />
			</div>

			<div class="card-footer d-flex">
				<div class="card-footer-profile d-flex">
					<router-link
						:to="`/c/${video.Channel._id}/home`"
						v-if="video.Channel.User.ProfileImage"
					>
						<img
							:src="video.Channel.User.ProfileImage"
							alt="image"
							class="rounded-circle card-footer-profile-img"
						/>
					</router-link>
					<router-link :to="`/c/${video.Channel._id}/home`" v-else>
						<img
							:src="`${imgLink}/user.svg`"
							alt="image"
							class="rounded-circle card-footer-profile-img"
						/>
					</router-link>
				</div>
				<div class="card-footer-content d-flex flex-column">
					<div class="card-footer-content-header">
						{{ video.Title }}
					</div>
					<div class="card-footer-content-desc d-flex flex-column">
						<router-link
							:to="`/c/${video.Channel._id}/home`"
							class="card-footer-link"
						>
							<div v-if="video.Channel.Name">
								{{ Capitalize(video.Channel.Name) }}
							</div>
							<div v-else>
								{{
									Capitalize(video.Channel.User.User.UserName)
								}}
							</div>
						</router-link>
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
	},
};
</script>
