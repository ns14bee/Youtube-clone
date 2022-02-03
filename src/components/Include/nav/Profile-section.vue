<template>
	<div class="profile-box d-flex justify-content-end align-items-center">
		<div class="profile-body d-flex">
			<button
				type="button"
				class="btn icon-button d-flex align-items-center justify-content-center icon-p"
				id="mSearchIconButton"
			>
				<img
					:src="`${imgLink}/search.svg`"
					alt="search"
					class="icon-item"
				/>
			</button>

			<button
				type="button"
				class="btn icon-button d-flex align-items-center justify-content-center icon-p dropdown"
				id="videoIconButton"
				data-bs-toggle="dropdown"
				data-bs-target="#video-content"
			>
				<img
					:src="`${imgLink}/video.svg`"
					alt="video"
					class="icon-item"
				/>
			</button>
			<!-- Youtube video -->
			<div
				class="dropdown-menu dropdown-color video-dropdown"
				id="#video-content"
			>
				<a
					href="#"
					class="profile-section-link video-section-link d-flex align-items-center"
				>
					<div class="profile-section-link-img" id="play-logo">
						<img
							:src="`${imgLink}/play.svg`"
							alt="play"
							class="icon-item"
						/>
					</div>
					<div class="profile-section-link-content">Upload video</div>
				</a>
				<a
					href="#"
					class="profile-section-link video-section-link d-flex align-items-center"
				>
					<div class="profile-section-link-img" id="live-logo">
						<img
							:src="`${imgLink}/live.svg`"
							alt="live"
							class="icon-item"
						/>
					</div>
					<div class="profile-section-link-content">Go live</div>
				</a>
			</div>

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

			<button
				type="button"
				class="btn icon-button d-flex align-items-center justify-content-center icon-p"
				id="bellIconButton"
			>
				<img
					:src="`${imgLink}/bell.svg`"
					alt="bell"
					class="icon-item"
				/>
			</button>
			<!-- dropdown-profile -->
			<div class="dropup dropstart">
				<button
					type="button"
					class="btn profile-button dropdown d-flex align-items-center justify-content-center icon-p"
					id="profileIconButton"
					data-bs-toggle="dropdown"
					data-bs-target="#profile-content"
					@focus="focusFunction"
					@blur="blurFunction"
				>
					<img
						src="img/deku.jpeg"
						alt="image"
						class="rounded-circle profile-image"
						id="profileImg"
					/>
				</button>
				<div
					class="dropdown-menu dropdown-color overflow-auto profile-dropdown profile-index"
					id="#profile-content"
				>
					<div class="profile-dropdown-header d-flex">
						<div class="profile-header-body d-flex">
							<div class="profile-header-image">
								<img
									src="img/deku.jpeg"
									alt="image"
									class="rounded-circle"
								/>
							</div>
							<div class="profile-header-title">
								<div class="profile-header-item">
									Niraj Surati
								</div>
								<div class="profile-header-link">
									<a href="#"> Manage your Google Account </a>
								</div>
							</div>
						</div>
					</div>
					<div class="dropdown-divider"></div>
					<div class="profile-dropdown-container">
						<div class="profile-dropdown-section">
							<!-- 
                                    <a href="" class="dropdown-item">a</a>
                                -->
							<div class="profile-section-item">
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="profile-logo"
									>
										<img
											:src="`${imgLink}/profile.svg`"
											alt="profile"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Your channel
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="money-logo"
									>
										<img
											:src="`${imgLink}/dollar.svg`"
											alt="dollar"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Purchases and memberships
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="setting-logo"
									>
										<img
											:src="`${imgLink}/setting.svg`"
											alt="setting"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Creator Studio
									</div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="profile-1-logo"
									>
										<img
											:src="`${imgLink}/profile-1.svg`"
											alt="profile-1"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Switch account
									</div>
									<div
										class="profile-section-link-dropdown link-dropdown-logo d-flex-end"
									></div>
								</a>
								<a
									href="#"
									class="profile-section-link d-flex align-items-center"
								>
									<div
										class="profile-section-link-img"
										id="exit-logo"
									>
										<img
											:src="`${imgLink}/exit.svg`"
											alt="exit"
											class="icon-item"
										/>
									</div>
									<div class="profile-section-link-content">
										Sign out
									</div>
								</a>
							</div>
							<div class="dropdown-divider"></div>
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
									></div>
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
									></div>
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
									></div>
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
									></div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- dropdown-theme -->
		</div>
		<!-- <div class="profile-body bg-danger d-flex icon-p">
            </div>
            <div class="profile-body bg-danger d-flex icon-p">
            </div> -->
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
		changeTheme() {
			this.$store.dispatch("theme/changeTheme", !this.theme);
		},
		focusFunction() {
			document
				.getElementById("profileImg")
				.classList.add("border", "border-primary");
		},
		blurFunction() {
			document
				.getElementById("profileImg")
				.classList.remove("border", "border-primary");
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
