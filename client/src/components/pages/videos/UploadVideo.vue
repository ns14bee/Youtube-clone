<template>
	<div class="video-page-main-body d-flex">
		<section class="container d-flex flex-column">
			<h1 class="text-center m-3">Upload Video</h1>
			<form
				class="form p-2 mb-2 align-self-center w-50"
				@submit="submit"
				enctype="multipart/form-data"
			>
				<fieldset>
					<div class="d-flex flex-column mt-3">
						<div v-if="error" class="alert alert-danger">
							<strong>Error!</strong> {{ error }}
						</div>
						<div class="p-1">
							<BaseInput
								label="Title"
								type="text"
								:error="errors.Title"
								:modelValue="Title"
								@change="handleChangeTitle"
							/>
						</div>
						<div class="p-1">
							<BaseInput
								label="Description"
								type="Description"
								:error="errors.Description"
								:modelValue="Description"
								@change="handleChangeDescription"
							/>
						</div>
						<div class="p-1">
							<BaseInput
								label="Video"
								type="file"
								:inputType="file"
								:value="Video"
								@change="handleChangeVideo"
								ref="videoFile"
								:error="errors.Video"
							/>
						</div>
						<div class="p-1 d-flex flex-column">
							<BaseInput
								label="Thumbnail"
								type="file"
								:inputType="file"
								:value="Thumbnail"
								@change="handleChangeThumbnail"
								:error="errors.Thumbnail"
								ref="thumbnailFile"
							/>
						</div>
						<div class="text-center mt-2">
							<BaseButton
								type="submit"
								BtnClass="btn-primary mt-3"
								>Submit</BaseButton
							>
						</div>
					</div>
				</fieldset>
			</form>
		</section>
	</div>
</template>

<script>
import ThemeMixin from "../../../util/themeMixin.js";
import CommonMixin from "../../../util/commonMixin.js";
import { useField, useForm } from "vee-validate";
import { string, object, mixed } from "yup";
import VideoService from "../../../services/VideoService.js";
import ChannelService from "../../../services/ChannelService.js";
export default {
	mixins: [ThemeMixin, CommonMixin],
	data() {
		let videoFile = {};
		let thumbnailFile = {};
		const validationSchema = object({
			Title: string().required(),
			Description: string().required(),
			Video: mixed().required(),
			Thumbnail: mixed().required(),
		});

		const { handleSubmit, setFieldValue, errors } = useForm({
			validationSchema,
			initialValues: {},
		});

		const handleChangeTitle = (event) => {
			setFieldValue("Title", event.target.value);
		};

		const handleChangeDescription = (event) => {
			setFieldValue("Description", event.target.value);
		};

		const handleChangeVideo = (event) => {
			videoFile = event.target.files[0];
			setFieldValue("Video", event.target.value);
		};

		const handleChangeThumbnail = (event) => {
			thumbnailFile = event.target.files[0];
			setFieldValue("Thumbnail", event.target.value);
		};

		const { value: Title } = useField("Title");
		const { value: Description } = useField("Description");
		const { value: Video } = useField("Video");
		const { value: Thumbnail } = useField("Thumbnail");

		const submit = handleSubmit((values) => {
			this.error = "";
			values.Video = videoFile;
			values.Thumbnail = thumbnailFile;
			this.UploadVideo(values);
		});
		return {
			historyList: [],
			channel: {},
			errors,
			submit,
			Title,
			Video,
			Thumbnail,
			Description,
			handleChangeTitle,
			handleChangeDescription,
			handleChangeVideo,
			handleChangeThumbnail,
			error: "",
		};
	},
	async created() {
		try {
			let channelData = await ChannelService.CurrentChannel();
			if (channelData.status == 200) {
				this.channel = channelData.data;
			} else {
				console.log(channelData.data.message);
			}
		} catch (err) {
			console.log(err);
		}
	},
	methods: {
		async UploadVideo(data) {
			data.Type = 1;
			let formData = new FormData();
			formData.append("Title", data.Title);
			formData.append("Description", data.Description);
			formData.append("Type", data.Type);
			formData.append("Video", data.Video);
			formData.append("Thumbnail", data.Thumbnail);
			try {
				let videoData = await VideoService.UploadVideo(
					this.channel._id,
					formData
				);
				if (videoData.status == 200) {
					console.log("Uploaded");
					this.$router.replace({
						name: "watch-video",
						params: { videoID: videoData.data._id },
					});
				} else {
					console.log(videoData.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		changeFile(file, fileList) {
			console.log(file);
			console.log(fileList);
		},
	},
};
</script>

<style scoped>
.form {
	border: 2px solid rgb(161, 153, 153);
	padding: 20px !important;
	border-radius: 5%;
	box-shadow: 0 0 7px 3px rgba(161, 153, 153, 0.5);
}
</style>
