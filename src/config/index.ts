/**
 * Configuration Index
 * Re-exports all configuration modules for convenient importing
 */

// Site Configuration - Core site settings
export type { SiteConfig } from "../types";
export {
	commentConfig,
	expressiveCodeConfig,
	footerConfig,
	fullscreenWallpaperConfig,
	navBarConfig,
	permalinkConfig,
	shareConfig,
	siteConfig,
} from "./site";

// Theme Configuration - Appearance settings
export type {
	Favicon,
	PageProgressBarConfig,
	ThirdPartyAnalyticsConfig,
} from "../types";
export {
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

// Component Configuration - Layout settings
export { sidebarLayoutConfig } from "./components";

// Widget Configuration - Interactive widgets
export type {
	AnnouncementConfig,
	FullscreenWallpaperConfig,
	MusicPlayerConfig,
	PioConfig,
	ProfileConfig,
	RandomPostsConfig,
	RelatedPostsConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
} from "../types";
export {
	announcementConfig,
	musicPlayerConfig,
	pioConfig,
	profileConfig,
	randomPostsConfig,
	relatedPostsConfig,
	sakuraConfig,
	widgetConfigs,
} from "./widgets";