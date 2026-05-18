/**
 * Widget Configuration
 * Contains all widget-related settings including profile, announcement, music player, and decorative widgets
 */
import type {
	AnnouncementConfig,
	MusicPlayerConfig,
	PioConfig,
	ProfileConfig,
	RandomPostsConfig,
	RelatedPostsConfig,
	SakuraConfig,
	ShareConfig,
	FullscreenWallpaperConfig,
	SidebarLayoutConfig,
} from "../types/config";

// Import from other config modules to avoid circular dependency
import { sidebarLayoutConfig } from "./components";
import { fullscreenWallpaperConfig, shareConfig } from "./site";

/**
 * Profile Configuration
 */
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp",
	name: "Nick",
	bio: "The world is big, go explore",
	typewriter: {
		enable: true,
		speed: 80,
	},
	links: [
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/701864046",
		},
		{
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/matsuzakayuki",
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/matsuzaka-yuki",
		},
		{
			name: "Codeberg",
			icon: "simple-icons:codeberg",
			url: "https://codeberg.org",
		},
		{
			name: "Discord",
			icon: "fa7-brands:discord",
			url: "https://discord.gg/MqW6TcQtVM",
		},
	],
};

/**
 * Announcement Configuration
 */
export const announcementConfig: AnnouncementConfig = {
	title: "",
	content: "Welcome to my blog! This is a sample announcement",
	closable: true,
	link: {
		enable: true,
		text: "Learn More",
		url: "/about/",
		external: false,
	},
};

/**
 * Music Player Configuration
 */
export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true,
	showFloatingPlayer: true,
	floatingEntryMode: "fab",
	mode: "local",
	meting_api: "https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
	id: "14164869977",
	server: "netease",
	type: "playlist",
};

/**
 * Sakura (Cherry Blossom) Effect Configuration
 */
export const sakuraConfig: SakuraConfig = {
	enable: false,
	sakuraNum: 21,
	limitTimes: -1,
	size: {
		min: 0.5,
		max: 1.1,
	},
	opacity: {
		min: 0.3,
		max: 0.9,
	},
	speed: {
		horizontal: {
			min: -1.7,
			max: -1.2,
		},
		vertical: {
			min: 1.5,
			max: 2.2,
		},
		rotation: 0.03,
		fadeSpeed: 0.03,
	},
	zIndex: 100,
};

/**
 * Pio (Live2D) Configuration
 */
export const pioConfig: PioConfig = {
	enable: false,
	models: ["/pio/models/pio/model.json"],
	position: "left",
	width: 280,
	height: 250,
	mode: "draggable",
	hiddenOnMobile: true,
	dialog: {
		welcome: "Welcome to Mizuki Website!",
		touch: [
			"What are you doing?",
			"Stop touching me!",
			"HENTAI!",
			"Don't bully me like that!",
		],
		home: "Click here to go back to homepage!",
		skin: ["Want to see my new outfit?", "The new outfit looks great~"],
		close: "QWQ See you next time~",
		link: "https://github.com/LyraVoid/Mizuki",
	},
};

/**
 * Related Posts Configuration
 */
export const relatedPostsConfig: RelatedPostsConfig = {
	enable: true,
	maxCount: 5,
};

/**
 * Random Posts Configuration
 */
export const randomPostsConfig: RandomPostsConfig = {
	enable: true,
	maxCount: 5,
};

/**
 * Unified Widget Configuration Export
 */
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	music: musicPlayerConfig,
	layout: sidebarLayoutConfig,
	sakura: sakuraConfig,
	fullscreenWallpaper: fullscreenWallpaperConfig,
	pio: pioConfig,
	share: shareConfig,
	relatedPosts: relatedPostsConfig,
	randomPosts: randomPostsConfig,
} as const;