<template>
	<div class="container">
		<div class="row">
			<div class="zcwf_title" style="max-width: 600px; color: black">
				Job Application Form
			</div>
		</div>
		<form enctype="multipart/form-data" @submit.prevent="checkMandatory()">
			<!-- <div v-if="v$.FullName.$errors">{{v$.FullName.$errors.$message}}</div> -->
			<!-- Do not remove this code. -->
			<input
				type="text"
				style="display: none"
				name="xnQsjsdp"
				value="d7e7f1c4eee964f4c8d101542b9bac94903228b407d7fc834686355f5ac645de"
			/>
			<input type="hidden" name="zc_gad" id="zc_gad" value />
			<input
				type="text"
				style="display: none"
				name="xmIwtLD"
				value="2d55eed370387cca922cd89738132b2c0cae16a21b8630ea8db07bb897093bff"
			/>
			<input
				type="text"
				style="display: none"
				name="actionType"
				value="TGVhZHM="
			/>

			<input
				type="text"
				style="display: none"
				name="returnURL"
				value="/thank-you"
			/>
			<input
				type="text"
				style="display: none"
				id="ldeskuid"
				name="ldeskuid"
			/>
			<input
				type="text"
				style="display: none"
				id="LDTuvid"
				name="LDTuvid"
			/>
			<!-- Do not remove this code. -->

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="COBJ4CF3">Job Title</label>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="text"
						id="COBJ4CF3"
						v-model="JobCode"
						name="COBJ4CF3"
						maxlength="255"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.JobCode.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="COBJ4CF2">Job Code</label>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="text"
						id="COBJ4CF2"
						name="COBJ4CF2"
						v-model="JobTitle"
						maxlength="255"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.JobTitle.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="NAME"
						>Full Name<span style="color: red">*</span></label
					>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="text"
						id="NAME"
						name="NAME"
						v-model="FullName"
						maxlength="120"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.FullName.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="Email"
						>Email<span style="color: red">*</span></label
					>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="text"
						id="Email"
						name="Email"
						v-model="Email"
						maxlength="120"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.Email.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="Phone"
						>Phone<span style="color: red">*</span></label
					>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="number"
						id="Phone"
						name="Phone"
						v-model="Phone"
						maxlength="120"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.Phone.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="COBJ4CF5"
						>State<span style="color: red">*</span></label
					>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="text"
						id="COBJ4CF5"
						name="COBJ4CF5"
						v-model="State"
						maxlength="255"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.State.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					<label for="COBJ4CF6"
						>City<span style="color: red">*</span></label
					>
				</div>
				<div class="zcwf_col_fld">
					<input
						type="text"
						id="COBJ4CF6"
						name="COBJ4CF6"
						v-model="City"
						maxlength="255"
					/>
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.City.$errors"
						:key="index"
					>
						{{ Capitalize(error.$property) }} {{ error.$message }}
					</small>
				</div>
			</div>

			<div class="zcwf_row">
				<div
					class="zcwf_col_lab"
					style="font-size: 12px; font-family: Arial"
				>
					Upload a File
				</div>
				<div class="zcwf_col_fld">
					<div class="clearB">
						<input
							type="file"
							class="zcwf_file"
							name="theFile"
							@change="setCV"
							id="theFile2404939000185091803"
							multiple
						/>
					</div>
					<p style="color: black; font-size: 11px; padding-left: 3px">
						File(s) size limit is 20MB.
					</p>
				</div>
			</div>
			<!-- 
            <div class='zcwf_row'>
                <div class='zcwf_col_lab' style='font-size:12px; font-family: Arial;'>Enter the Captcha</div>
                <div class='zcwf_col_fld'><input type='text' maxlength='10' v-model='enterdigest' /></div>
                </div> -->
			<!-- Do not remove this code. -->
			<!-- <div class='zcwf_row'>
                    <div class='zcwf_col_lab'></div>
                    <div class='zcwf_col_fld'><img id='imgid2404939000185091803'
                            src='https://crm.zoho.com/crm/CaptchaServlet?formId=2d55eed370387cca922cd89738132b2c860410bd2b3440ba519a2c383182f68b&grpid=d7e7f1c4eee964f4c8d101542b9bac94903228b407d7fc834686355f5ac645de'>
                        <a href='javascript:;' @click='reloadImg();'>Reload</a>
                    </div>
                    <div class=''></div>
                    <div class="zcwf_col_help">
                    <small class="text-danger" v-for="(error, index) of v$.enterdigest.$errors" :key="index">
                        Captcha  {{error.$message}}
                    </small>
                    <button @click="recaptcha">Recaptcha</button>
                </div>
                </div> -->
			<div class="zcwf_row">
				<div class="zcwf_col_fld">
					<vue-recaptcha
						ref="recaptcha"
						:sitekey="sitekey"
						@verify="validate"
						@expired="onCaptchaExpired"
					>
					</vue-recaptcha>
					<!-- <vue-recaptcha v-show="showRecaptcha" :siteKey="sitekey"
                        size="normal" 
                        hl="tr"
                        @verify="recaptchaVerified"
                        @expire="recaptchaExpired"
                        @fail="recaptchaFailed"
                        ref="vueRecaptcha">
                    </vue-recaptcha> -->
				</div>
				<div class="zcwf_col_help">
					<small
						class="text-danger"
						v-for="(error, index) of v$.recaptchaToken.$errors"
						:key="index"
					>
						Captcha {{ error.$message }}
					</small>
				</div>
			</div>
			<div class="zcwf_row">
				<div class="zcwf_col_fld">
					<input
						type="submit"
						id="formsubmit"
						class="formsubmit zcwf_button"
						value="Submit"
						title="Submit"
					/>
					<input
						type="reset"
						class="zcwf_button"
						name="reset"
						value="Reset"
						title="Reset"
					/>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
// import { VueReCaptcha } from "vue-recaptcha-v3"
import useVuelidate from "@vuelidate/core";
import { VueRecaptcha } from "vue-recaptcha";
// import VueRecaptcha from 'vue3-recaptcha2';
// let siteKey = process.env.VUE_APP_SITE_KEY
let siteKey = "6LckdSEeAAAAAIbkpchN-GVX27TzdJbdPXHt9O-M";
import {
	required,
	email,
	minLength,
	maxLength,
	numeric,
} from "@vuelidate/validators";
const axios = require("axios");
// import { useReCaptcha } from 'vue-recaptcha-v3'
export default {
	setup() {
		// const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
		// const recaptcha = async () => {
		//     await recaptchaLoaded()
		//     const token = await executeRecaptcha('login')
		//     console.log({ token })
		// }
		return {
			v$: useVuelidate(),
			// recaptcha
		};
	},
	components: { VueRecaptcha },
	data() {
		return {
			xnQsjsdp:
				"d7e7f1c4eee964f4c8d101542b9bac94903228b407d7fc834686355f5ac645de",
			zc_gad: "",
			xmIwtLD:
				"2d55eed370387cca922cd89738132b2c0cae16a21b8630ea8db07bb897093bff",
			actionType: "TGVhZHM=",
			returnURL: "/thank-you",
			ldeskuid: "",
			LDTuvid: "",
			LeadSource: "WebSite Visit",
			LeadStatus: "Expression of Interest",
			LEADCF2: "www.iipvapi.com",
			LEADCF4: "[rxck name='msclkid'][/rxck]",
			LEADCF7: "[rxck name='gclid'][/rxck]",
			LEADCF8: "[rxck name='utm_medium'][/rxck]",
			LEADCF9: "[rxck name='utm_source'][/rxck]",
			LEADCF10: "[rxck name='utm_term'][/rxck]",
			LEADCF11: "[rxck name='utm_content'][/rxck]",
			LEADCF13: "[rxck name='adroll_segments'][/rxck]",
			FullName: "",
			JobTitle: "",
			JobCode: "",
			Email: "",
			Phone: "",
			State: "",
			City: "",
			CV: "",
			enterdigest: "",
			submitted: false,
			recaptchaToken: null,
			sitekey: siteKey,
			showRecaptcha: true,
		};
	},
	validations: {
		FullName: { required },
		JobTitle: { required },
		JobCode: { required },
		State: { required },
		City: { required },
		Email: { required, email },
		Phone: {
			required,
			numeric,
			minLength: minLength(10),
			maxLength: maxLength(10),
		},
		// enterdigest: { required },
		recaptchaToken: { required },
	},
	methods: {
		reloadImg() {
			var captcha = document.getElementById("imgid2404939000185091803");
			if (captcha.src.indexOf("&d") !== -1) {
				captcha.src =
					captcha.src.substring(0, captcha.src.indexOf("&d")) +
					"&d" +
					new Date().getTime();
			} else {
				captcha.src = captcha.src + "&d" + new Date().getTime();
			}
		},
		checkMandatory() {
			// console.log(this.recaptchaToken)
			// this.submitted = true;
			// this.v$.$touch();
			// if(this.recaptchaToken){
			//     if (this.v$.$invalid) {
			//         return;
			//     } else {
			// let dataBody = {
			//     formData.append('xnQsjsdp', this.xnQsjsdp)
			//     formData.append('zc_gad', this.zc_gad)
			//     formData.append('xmIwtLD',this.xmIwtLD)
			//     formData.append('actionType', this.actionType)
			//     formData.append('returnURL', this.returnURL)
			//     formData.append('ldeskuid', this.ldeskuid)
			//     formData.append('LDTuvid', this.LDTuvid)
			//     formData.append('FullName', this.FullName)
			//     formData.append('Email', this.Email)
			//     formData.append('JobTitle', this.JobTitle)
			//     formData.append('JobCode', this.JobCode)
			//     formData.append('Phone', this.Phone)
			//     formData.append('State', this.State)
			//     formData.append('City', this.City)
			//     formData.append('LeadSource', this.LeadSource)
			//     formData.append('LEADCF2', this.LEADCF2)
			//     formData.append('LeadStatus', this.LeadStatus)
			//     formData.append('LEADCF7', this.LEADCF7)
			//     formData.append('LEADCF4', this.LEADCF4)
			//     formData.append('LEADCF13', this.LEADCF13)
			//     formData.append('LEADCF11', this.LEADCF11)
			//     formData.append('LEADCF10', this.LEADCF10)
			//     formData.append('LEADCF8', this.LEADCF8)
			//     formData.append('LEADCF9', this.LEADCF9)
			//     formData.append('CV', this.CV)
			// }
			// console.log(dataBody);
			//     let formData = new FormData();
			//         formData.append('xnQsjsdp', this.xnQsjsdp)
			//         formData.append('zc_gad', this.zc_gad)
			//         formData.append('xmIwtLD',this.xmIwtLD)
			//         formData.append('actionType', this.actionType)
			//         formData.append('returnURL', this.returnURL)
			//         formData.append('ldeskuid', this.ldeskuid)
			//         formData.append('LDTuvid', this.LDTuvid)
			//         formData.append('FullName', this.FullName)
			//         formData.append('Email', this.Email)
			//         formData.append('JobTitle', this.JobTitle)
			//         formData.append('JobCode', this.JobCode)
			//         formData.append('Phone', this.Phone)
			//         formData.append('State', this.State)
			//         formData.append('City', this.City)
			//         formData.append('LeadSource', this.LeadSource)
			//         formData.append('LEADCF2', this.LEADCF2)
			//         formData.append('LeadStatus', this.LeadStatus)
			//         formData.append('LEADCF7', this.LEADCF7)
			//         formData.append('LEADCF4', this.LEADCF4)
			//         formData.append('LEADCF13', this.LEADCF13)
			//         formData.append('LEADCF11', this.LEADCF11)
			//         formData.append('LEADCF10', this.LEADCF10)
			//         formData.append('LEADCF8', this.LEADCF8)
			//         formData.append('LEADCF9', this.LEADCF9)
			//         formData.append('CV', this.CV)
			// // let self = this;
			//     axios({
			//         method: "post",
			//         url: "https://crm.zoho.com/crm/WebForm",
			//         data: formData,
			//         headers: { "Content-Type": "multipart/form-data" }
			//         processData: false,
			//         contentType: false,
			//     })
			//     .then(function (response) {
			//         const status = response.status;
			//         if (status == "200") {
			//             console.log(response);
			//             // self.$router.push({ path: "/thank-you" });
			//         }
			//         })
			//         .catch(function (response) {
			//         console.log(response);
			//         });
			//     }
			// }else{
			//     return;
			// }
			this.$recaptchaLoaded().then(() => {
				console.log("recaptcha loaded");
				this.$recaptcha("login")
					.then(async (token) => {
						console.log("token ", token);
					})
					.catch((e) => {
						console.log("ReCaptcha error:", e);
					});
			});
		},
		setCV(e) {
			if (e.target.files) {
				this.filemessage = "";
				this.CV = e.target.files[0] || "";
				// console.log(e.target.files[0]);

				if (this.CV != "") {
					var extFile = this.CV.name.split(".")[1];

					if (
						extFile == "pdf" ||
						extFile == "odt" ||
						extFile == "doc" ||
						extFile == "docx" ||
						extFile == "rtf" ||
						extFile == "txt"
					) {
						const fsize = this.CV.size;
						const file = Math.round(fsize / 1024);
						if (file > 20 * 1024) {
							this.filemessage = `${this.CV.name} - File exceeds size limit`;
						} else {
							this.filemessage = "";
							this.CV = e.target.files[0];
						}
					} else {
						this.filemessage =
							"The uploaded file type is not allowed.";
					}
				}
			}
		},
		Capitalize(s) {
			return s[0].toUpperCase() + s.slice(1);
		},
		async validate(res) {
			// if validate true exec recaptcha
			// this.$refs.recaptcha.execute()
			// this.recaptchaToken = res
			try {
				let secret = process.env.VUE_APP_SECRET_KEY;
				console.log(res);
				const data = {
					secret: secret,
					response: res,
				};
				let url = "https://www.google.com/recaptcha/api/siteverify";
				const result = await axios.post(url, data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				});
				console.log(result);
				if (result.success) {
					console.log("verified");
					this.recaptchaToken = res;
				} else {
					console.log("invalid token");
				}
			} catch (error) {
				console.log("ReCaptcha error:", error);
			}
		},

		onCaptchaExpired() {
			this.$refs.recaptcha.reset();
			this.recaptchaToken = null;
		},
		async recaptchaVerified(res) {
			try {
				console.log(res);
				let secret = process.env.VUE_APP_SECRET_KEY;
				const data = {
					secret: secret,
					response: res,
				};
				let url = "https://www.google.com/recaptcha/api/siteverify";
				const result = await axios.post(url, data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				});
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		},
		recaptchaExpired() {
			this.$refs.vueRecaptcha.reset();
		},
		recaptchaFailed() {},
	},
};
</script>

<style scoped>
#crmWebToEntityForm.zcwf_lblLeft {
	width: 100%;
	padding: 25px;
	margin: 0 auto;
	box-sizing: border-box;
}
#crmWebToEntityForm.zcwf_lblLeft * {
	box-sizing: border-box;
}
#crmWebToEntityForm {
	text-align: left;
}
#crmWebToEntityForm * {
	direction: ltr;
}
.zcwf_lblLeft .zcwf_title {
	word-wrap: break-word;
	padding: 0px 6px 10px;
	font-weight: bold;
}
.zcwf_lblLeft .zcwf_col_fld input[type="text"],
.zcwf_lblLeft .zcwf_col_fld textarea {
	width: 60%;
	border: 1px solid #ccc !important;
	resize: vertical;
	border-radius: 2px;
	float: left;
}
.zcwf_lblLeft .zcwf_col_lab {
	width: 30%;
	word-break: break-word;
	padding: 0px 6px 0px;
	margin-right: 10px;
	margin-top: 5px;
	float: left;
	min-height: 1px;
}
.zcwf_lblLeft .zcwf_col_fld {
	float: left;
	width: 68%;
	padding: 0px 6px 0px;
	position: relative;
	margin-top: 5px;
}
.zcwf_lblLeft .zcwf_privacy {
	padding: 6px;
}
.zcwf_lblLeft .wfrm_fld_dpNn {
	display: none;
}
.dIB {
	display: inline-block;
}
.zcwf_lblLeft .zcwf_col_fld_slt {
	width: 60%;
	border: 1px solid #ccc;
	background: #fff;
	border-radius: 4px;
	font-size: 12px;
	float: left;
	resize: vertical;
}
.zcwf_lblLeft .zcwf_row:after,
.zcwf_lblLeft .zcwf_col_fld:after {
	content: "";
	display: table;
	clear: both;
}
.zcwf_lblLeft .zcwf_col_help {
	float: left;
	margin-left: 7px;
	font-size: 12px;
	max-width: 35%;
	word-break: break-word;
}
.zcwf_lblLeft .zcwf_help_icon {
	cursor: pointer;
	width: 16px;
	height: 16px;
	display: inline-block;
	background: #fff;
	border: 1px solid #ccc;
	color: #ccc;
	text-align: center;
	font-size: 11px;
	line-height: 16px;
	font-weight: bold;
	border-radius: 50%;
}
.zcwf_lblLeft .zcwf_row {
	margin: 15px 0px;
}
.zcwf_lblLeft .formsubmit {
	margin-right: 5px;
	cursor: pointer;
	color: #333;
	font-size: 12px;
}
.zcwf_lblLeft .zcwf_privacy_txt {
	width: 90%;
	color: rgb(0, 0, 0);
	font-size: 12px;
	font-family: Arial;
	display: inline-block;
	vertical-align: top;
	color: #333;
	padding-top: 2px;
	margin-left: 6px;
}
.zcwf_lblLeft .zcwf_button {
	font-size: 12px;
	color: #333;
	border: 1px solid #ccc;
	padding: 3px 9px;
	border-radius: 4px;
	cursor: pointer;
	max-width: 120px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.zcwf_lblLeft .zcwf_tooltip_over {
	position: relative;
}
.zcwf_lblLeft .zcwf_tooltip_ctn {
	position: absolute;
	background: #dedede;
	padding: 3px 6px;
	top: 3px;
	border-radius: 4px;
	word-break: break-all;
	min-width: 50px;
	max-width: 150px;
	color: #333;
}
.zcwf_lblLeft .zcwf_ckbox {
	float: left;
}
.zcwf_lblLeft .zcwf_file {
	width: 55%;
	box-sizing: border-box;
	float: left;
}
.clearB:after {
	content: "";
	display: block;
	clear: both;
}
@media all and (max-width: 600px) {
	.zcwf_lblLeft .zcwf_col_lab,
	.zcwf_lblLeft .zcwf_col_fld {
		width: auto;
		float: none !important;
	}
	.zcwf_lblLeft .zcwf_col_help {
		width: 40%;
	}
}
</style>
