/**
 * Site Configuration
 * Contains core site settings, navigation, and related runtime configurations
 */
import type {
	CommentConfig,
	ExpressiveCodeConfig,
	FooterConfig,
	FullscreenWallpaperConfig,
	LicenseConfig,
	NavBarConfig,
	PermalinkConfig,
	ShareConfig,
	SiteConfig,
} from "../types";
import { LinkPreset } from "../types";
// Import theme configuration values to merge into siteConfig
import {
	banner,
	favicon,
	font,
	generateOgImages,
	pageProgressBar,
	showCoverInContent,
	showLastModified,
	thirdPartyAnalytics,
	toc,
} from "./theme";

// Define site language
const SITE_LANG = "en";

/**
 * Site Configuration
 * Core site settings including title, URL, language, theme color, and feature flags
 */
export const siteConfig: SiteConfig = {
	title: "Mizuki",
	subtitle: "One demo website",
	siteURL: "https://Nickzxw.github.io/", // Please replace with your site URL, ending with a slash
	siteStartDate: "2025-01-01", // Site start date for calculating uptime

	lang: SITE_LANG,

	themeColor: {
		hue: 240, // Theme color hue, range 0-360. Example: red: 0, cyan: 200, blue-green: 250, pink: 345
		fixed: false, // Hide theme color picker from visitors
	},

	// Feature page switches (disabling unused pages helps SEO; remember to remove links from navbarConfig)
	featurePages: {
		anime: true, // Anime page switch
		diary: true, // Diary page switch
		friends: true, // Friends page switch
		projects: true, // Projects page switch
		skills: true, // Skills page switch
		timeline: true, // Timeline page switch
		albums: true, // Albums page switch
		devices: true, // Devices page switch
	},

	// Navbar title configuration - set to null to hide
	navbarTitle: null,

	// Page auto-scaling configuration
	pageScaling: {
		enable: true, // Enable auto-scaling
		targetWidth: 2000, // Target width, scaling starts below this width
	},

	bangumi: {
		userId: "your-bangumi-id", // Set your Bangumi user ID here, can set to "sai" for testing
		fetchOnDev: false, // Whether to fetch Bangumi data in dev mode (default false), run pnpm build first to build json files
	},

	bilibili: {
		vmid: "your-bilibili-vmid", // Set your Bilibili user ID (uid) here, e.g. "1129280784"
		fetchOnDev: false, // Whether to fetch Bilibili data in dev mode (default false)
		coverMirror: "", // Cover image mirror source (optional), e.g. "https://images.weserv.nl/?url="
		useWebp: true, // Use WebP format (default true)

		// Bilibili watch progress configuration (read carefully if needed):
		// 1. Local dev: Fill BILI_SESSDATA=your_SESSDATA in .env file
		// 2. Remote build: Add BILI_SESSDATA in GitHub repo Settings -> Secrets
		// Note: SESSDATA is account credentials, do not hardcode to prevent leakage
		// Security: If SESSDATA is leaked, open B app -> Profile -> Settings -> Security Privacy -> Login Device Management -> Log out all devices
	},

	anime: {
		mode: "local", // Anime page mode: "bangumi" uses Bangumi API, "local" uses local config, "bilibili" uses Bilibili API
	},

	// Diary page Memos API URL, empty uses static data
	diaryApiUrl: "",

	// Post list layout configuration
	postListLayout: {
		defaultMode: "list", // Default layout mode: "list" = single column, "grid" = double column
		// Note: If sidebar is set to "both" dual sidebar, post list cannot use "grid" layout
		allowSwitch: true, // Allow users to switch layout
		categoryBar: {
			enable: true, // Show category navigation bar on post list page
		},
	},

	// Tag style configuration
	tagStyle: {
		useNewStyle: false, // Use new style (hover highlight) or old style (always visible border)
	},

	// Wallpaper mode configuration
	wallpaperMode: {
		defaultMode: "banner", // Default wallpaper mode: banner=header banner, fullscreen=fullscreen wallpaper, none=no wallpaper
		showModeSwitchOnMobile: "desktop", // Show mode switch button: "off", "mobile", "desktop", "both"
	},

	// Banner configuration
	banner,

	// TOC configuration
	toc,

	// Show cover in content
	showCoverInContent,

	// Generate OG images
	generateOgImages,

	// Favicon configuration
	favicon,

	// Font configuration
	font,

	// Show last modified indicator
	showLastModified,

	// Page progress bar configuration
	pageProgressBar,

	// Third party analytics configuration
	thirdPartyAnalytics,
};

/**
 * Fullscreen Wallpaper Configuration
 */
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	src: {
		desktop: [
			"/assets/desktop-banner/1.webp",
			"/assets/desktop-banner/2.webp",
			"/assets/desktop-banner/3.webp",
			"/assets/desktop-banner/4.webp",
		],
		mobile: [
			"/assets/mobile-banner/1.webp",
			"/assets/mobile-banner/2.webp",
			"/assets/mobile-banner/3.webp",
			"/assets/mobile-banner/4.webp",
		],
	},
	position: "center",
	carousel: {
		enable: true,
		interval: 5,
	},
	zIndex: -1,
	opacity: 0.8,
	blur: 1,
};

/**
 * Navigation Bar Configuration
 */
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links",
			url: "/links/",
			icon: "material-symbols:link",
			children: [
				{
					name: "GitHub",
					url: "https://github.com/LyraVoid/Mizuki",
					external: true,
					icon: "fa7-brands:github",
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
					icon: "fa7-brands:bilibili",
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
					icon: "mdi:git",
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			icon: "material-symbols:person",
			children: [
				{
					name: "Anime",
					url: "/anime/",
					icon: "material-symbols:movie",
				},
				{
					name: "Diary",
					url: "/diary/",
					icon: "material-symbols:book",
				},
				{
					name: "Gallery",
					url: "/albums/",
					icon: "material-symbols:photo-library",
				},
				{
					name: "Devices",
					url: "/devices/",
					icon: "material-symbols:devices",
					external: false,
				},
			],
		},
		{
			name: "About",
			url: "/content/",
			icon: "material-symbols:info",
			children: [
				{
					name: "About",
					url: "/about/",
					icon: "material-symbols:person",
				},
				{
					name: "Friends",
					url: "/friends/",
					icon: "material-symbols:group",
				},
			],
		},
		{
			name: "Others",
			url: "#",
			icon: "material-symbols:more-horiz",
			children: [
				{
					name: "Projects",
					url: "/projects/",
					icon: "material-symbols:work",
				},
				{
					name: "Skills",
					url: "/skills/",
					icon: "material-symbols:psychology",
				},
				{
					name: "Timeline",
					url: "/timeline/",
					icon: "material-symbols:timeline",
				},
			],
		},
	],
};

/**
 * Permalink Configuration
 */
export const permalinkConfig: PermalinkConfig = {
	enable: false,
	format: "%postname%",
};

/**
 * Expressive Code Configuration
 */
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
	hideDuringThemeTransition: true,
};

/**
 * Comment Configuration
 */
export const commentConfig: CommentConfig = {
	enable: false,
	system: "twikoo",
	twikoo: {
		envId: "https://twikoo.vercel.app",
		lang: SITE_LANG,
	},
	giscus: {
		repo: "your-github-username/your-repo-name",
		repoId: "your-repo-id",
		category: "Announcements",
		categoryId: "your-category-id",
		mapping: "pathname",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: SITE_LANG,
		loading: "lazy",
	},
};

/**
 * Share Configuration
 */
export const shareConfig: ShareConfig = {
	enable: true,
};

/**
 * Footer Configuration
 */
export const footerConfig: FooterConfig = {
	enable: false,
	customHtml: "",
};

/**
 * License Configuration
 */
export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// Re-export SITE_LANG for use in other config modules
export { SITE_LANG };