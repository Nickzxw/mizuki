/**
 * Configuration Index
 * Re-exports all configuration modules for convenient importing
 */

// Site Configuration - Core site settings
export {
	siteConfig,
	fullscreenWallpaperConfig,
	navBarConfig,
	permalinkConfig,
	expressiveCodeConfig,
	commentConfig,
	shareConfig,
	footerConfig,
} from "./site";

export type { SiteConfig } from "../types";

// Theme Configuration - Appearance settings
export {
	banner,
	toc,
	showCoverInContent,
	generateOgImages,
	favicon,
	font,
	showLastModified,
	pageProgressBar,
	thirdPartyAnalytics,
} from "./theme";

export type {
	Favicon,
	PageProgressBarConfig,
	ThirdPartyAnalyticsConfig,
} from "../types";

// Component Configuration - Layout settings
export { sidebarLayoutConfig } from "./components";

// Widget Configuration - Interactive widgets
export {
	profileConfig,
	announcementConfig,
	musicPlayerConfig,
	sakuraConfig,
	pioConfig,
	relatedPostsConfig,
	randomPostsConfig,
	widgetConfigs,
} from "./widgets";

export type {
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
} from "../types";