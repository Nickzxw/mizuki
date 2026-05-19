/**
 * Theme Configuration
 * Contains theme-related settings including banner, TOC, wallpaper, fonts, and appearance options
 */
import type {
	Favicon,
	PageProgressBarConfig,
	SiteConfig,
	ThirdPartyAnalyticsConfig,
} from "../types";

/**
 * Banner Configuration
 */
export const banner = {
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

	position: "center" as const,

	carousel: {
		enable: true,
		interval: 3,
	},

	waves: {
		enable: true as const,
		performanceMode: false as const,
		mobileDisable: false as const,
	},

	imageApi: {
		enable: false as const,
		url: "http://domain.com/api_v2.php?format=text&count=4",
	},

	homeText: {
		enable: true as const,
		title: "My Space",
		subtitle: [
			"Record life, share thoughts",
			"Knowledge is more valuable when shared",
			"Every step is a trace of growth",
			"Capture moments with words",
			"Today is another day of discovery",
		],
		typewriter: {
			enable: true as const,
			speed: 100,
			deleteSpeed: 50,
			pauseTime: 2000,
		},
	},

	credit: {
		enable: false as const,
		text: "Describe" as const,
		url: "" as const,
	},

	navbar: {
		transparentMode: "semifull" as const,
	},
};

/**
 * TOC (Table of Contents) Configuration
 */
export const toc = {
	enable: true,
	mobileTop: true,
	desktopSidebar: true,
	floating: true,
	depth: 2 as const,
	useJapaneseBadge: false,
};

/**
 * Show cover image in article content page
 */
export const showCoverInContent = true;

/**
 * Generate OpenGraph images
 */
export const generateOgImages = false;

/**
 * Favicon Configuration
 */
export const favicon: Favicon[] = [];

/**
 * Font Configuration
 */
export const font = {
	asciiFont: {
		fontFamily: "ZenMaruGothic-Medium",
		fontWeight: "400",
		localFonts: ["ZenMaruGothic-Medium.ttf"],
		enableCompress: true,
	},
	cjkFont: {
		fontFamily: "萝莉体 第二版",
		fontWeight: "500",
		localFonts: ["loli.ttf"],
		enableCompress: true,
	},
};

/**
 * Show last modified indicator
 */
export const showLastModified = true;

/**
 * Page Progress Bar Configuration
 */
export const pageProgressBar: PageProgressBarConfig = {
	enable: true,
	height: 3,
	duration: 6000,
};

/**
 * Third Party Analytics Configuration
 */
export const thirdPartyAnalytics: ThirdPartyAnalyticsConfig = {
	enable: false,
	clarityId: "",
};

// Re-export SiteConfig type for convenience
export type { Favicon, PageProgressBarConfig, ThirdPartyAnalyticsConfig };