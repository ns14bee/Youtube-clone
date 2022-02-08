<template>
	<div class="profile-box d-flex justify-content-end align-items-center">
		<div class="profile-body d-flex">
			<button
				type="button"
				class="btn icon-button d-flex align-items-center justify-content-center icon-p"
				id="menuIconButton"
				data-bs-toggle="dropdown"
				data-bs-target="#apps-content"
			>
				<img
					:src="`${imgLink}/menu.svg`"
					alt="menu"
					class="icon-item"
				/>
			</button>
			<!-- apps dropdown -->
			<div
				class="dropdown-menu dropdown-color overflow-hidden apps-dropdown"
				id="#apps-content"
			>
				<div class="pm-8">
					<a
						href="#"
						class="profile-section-link apps-section-link d-flex align-items-center"
					>
						<div
							class="profile-section-link-img"
							id="YouTube-TV-logo"
						>
							<img
								src="icons/common/YouTube-TV.svg"
								alt="YouTube-TV"
								class="icon-item"
							/>
						</div>
						<div class="profile-section-link-content">
							YouTube TV
						</div>
					</a>
				</div>
				<div class="dropdown-divider"></div>
				<div class="pm-8">
					<a
						href="#"
						class="profile-section-link apps-section-link d-flex align-items-center"
					>
						<div
							class="profile-section-link-img"
							id="YouTube-Music-logo"
						>
							<img
								src="icons/common/YouTube-Music.svg"
								alt="YouTube-Music"
								class="icon-item"
							/>
						</div>
						<div class="profile-section-link-content">
							YouTube Music
						</div>
					</a>
					<a
						href="#"
						class="profile-section-link apps-section-link d-flex align-items-center"
					>
						<div
							class="profile-section-link-img"
							id="YouTube-Kids-logo"
						>
							<img
								src="icons/common/YouTube-Kids.svg"
								alt="YouTube-Kids"
								class="icon-item"
							/>
						</div>
						<div class="profile-section-link-content">
							YouTube Kids
						</div>
					</a>
				</div>
				<div class="dropdown-divider"></div>
				<div class="pm-8">
					<a
						href="#"
						class="profile-section-link apps-section-link d-flex align-items-center"
					>
						<div class="profile-section-link-img YouTube-Play-logo">
							<img
								src="icons/common/YouTube-Button.svg"
								alt="YouTube-Play"
								class="icon-item"
							/>
						</div>
						<div class="profile-section-link-content">
							Creator Academy
						</div>
					</a>
					<a
						href="#"
						class="profile-section-link apps-section-link d-flex align-items-center"
					>
						<div class="profile-section-link-img YouTube-Play-logo">
							<img
								src="icons/common/YouTube-Button.svg"
								alt="YouTube-Play"
								class="icon-item"
							/>
						</div>
						<div class="profile-section-link-content">
							YouTube for Artists
						</div>
					</a>
				</div>
			</div>
			<!-- dropdown-profile -->
			<div class="d-flex align-items-center justify-content-center">
				<button
					type="button"
					class="btn icon-button d-flex align-items-center justify-content-center icon-p"
					id="profileIconButton"
					data-bs-toggle="dropdown"
					data-bs-target="#profile-content"
				>
					<img
						:src="`${imgLink}/three-dots.svg`"
						alt="profile"
						class="icon-item"
					/>
				</button>
				<div
					class="dropdown-menu dropdown-color overflow-auto profile-dropdown profile-index"
					id="#profile-content"
				>
					<div class="profile-dropdown-container-2">
						<div class="profile-dropdown-section">
							<!-- 
                                    <a href="" class="dropdown-item">a</a>
                                -->
							<div class="profile-section-item">
								<a
									class="profile-section-link d-flex align-items-center"
									href="javascript:void(0)"
									id="theme-toggler"
									:onclick="changeTheme"
								>
									<div
										class="profile-section-link-img"
										id="moon-logo"
									>
										<img
											:src="`${imgLink}/moon.svg`"
											alt="moon"
											class="icon-item"
										/>
									</div>
									<div
										class="profile-section-link-content"
										id="theme-text"
									>
										Appearance: {{ themeType }}
									</div>
									<div
										class="profile-section-link-dropdown link-dropdown-logo d-flex-end"
									>
										<img
											:src="`${imgLink}/right-arrow.svg`"
											alt="drop-right"
											class="icon-item"
										/>
									</div>
								</a>

								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="translate-logo"
									>
										<img
											:src="`${imgLink}/translate.svg`"
											alt="translate"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Language: English
									</div>
									<div
										class="profile-section-link-dropdown link-dropdown-logo d-flex-end"
									>
										<img
											:src="`${imgLink}/right-arrow.svg`"
											alt="drop-right"
											class="icon-item"
										/>
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="web-logo"
									>
										<img
											:src="`${imgLink}/web.svg`"
											alt="web"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Location: India
									</div>
									<div
										class="profile-section-link-dropdown link-dropdown-logo d-flex-end"
									>
										<img
											:src="`${imgLink}/right-arrow.svg`"
											alt="drop-right"
											class="icon-item"
										/>
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="settings-logo"
									>
										<img
											:src="`${imgLink}/settings.svg`"
											alt="settings"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Settings
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="shield-logo"
									>
										<img
											:src="`${imgLink}/shield.svg`"
											alt="shield"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Your data in YouTube
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="question-mark-logo"
									>
										<img
											:src="`${imgLink}/question-mark.svg`"
											alt="question-mark"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Help
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="exclamation-mark-logo"
									>
										<img
											:src="`${imgLink}/exclamation-mark.svg`"
											alt="exclamation-mark"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Send feedback
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="keyboard-logo"
									>
										<img
											:src="`${imgLink}/keyboard.svg`"
											alt="keyboard"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Keyboard Shortcuts
									</div>
								</a>
							</div>
							<div class="dropdown-divider"></div>
							<div class="profile-section-item">
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div class="profile-section-link-content">
										Restricted Mode: Off
									</div>
									<div class="profile-section-link-img"></div>
									<div
										class="profile-section-link-dropdown link-dropdown-logo d-flex-end"
									>
										<img
											:src="`${imgLink}/right-arrow.svg`"
											alt="drop-right"
											class="icon-item"
										/>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BaseButton
				type="button"
				BtnClass="d-flex  justify-content-evenly  align-items-center sign-up"
				@click="signIn"
			>
				<i class="far fa-user-circle sign-up-icon"></i>
				<span class="sign-up-text">&nbsp;SIGN IN</span></BaseButton
			>
		</div>
	</div>
</template>

<script>
import mixin from "../../../util/themeMixin.js";
export default {
	mixins: [mixin],
	data() {
		return {
			themeType: null,
		};
	},
	methods: {
		signIn() {
			this.$router.push("login");
		},
		changeTheme() {
			this.$store.dispatch("theme/changeTheme", !this.theme);
		},
	},
	mounted() {
		if (this.theme) {
			this.themeType = "Dark";
		} else {
			this.themeType = "Light";
		}
		var element = document.getElementById("theme-style");
		element.setAttribute("href", `${this.cssLink}`);
	},
	updated() {
		if (this.theme) {
			this.themeType = "Dark";
		} else {
			this.themeType = "Light";
		}
		var element = document.getElementById("theme-style");
		element.setAttribute("href", `${this.cssLink}`);
	},
};
</script>

<style scoped>
.sign-up {
	width: 108px;
	padding: 11px 5px;
	border: 1px solid #3ea6ff;
}
.sign-up:hover {
	background-color: none !important;
}
.sign-up:focus {
	box-shadow: none !important;
}
.sign-up-text {
	font-size: 14px;
	color: #3ea6ff;
}
.sign-up-icon {
	font-size: 18px;
	color: #3ea6ff;
}
</style>
