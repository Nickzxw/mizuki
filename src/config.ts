/**
 * Configuration Module
 * @description This file is maintained for backward compatibility.
 * All configurations have been moved to the config/ directory.
 * Please import from config/ submodules for new code.
 */

/* bangumi: { userId: "your-bangumi-id" } */

// Re-export all configurations from the config/ directory for backward compatibility
export { sidebarLayoutConfig } from "./config/components";
export {
	commentConfig,
	expressiveCodeConfig,
	footerConfig,
	fullscreenWallpaperConfig,
	licenseConfig,
	navBarConfig,
	permalinkConfig,
	shareConfig,
	siteConfig,
} from "./config/site";
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
} from "./config/theme";
export {
	announcementConfig,
	musicPlayerConfig,
	pioConfig,
	profileConfig,
	randomPostsConfig,
	relatedPostsConfig,
	sakuraConfig,
	widgetConfigs,
} from "./config/widgets";
export type {
	AnnouncementConfig,
	Favicon,
	FullscreenWallpaperConfig,
	MusicPlayerConfig,
	PageProgressBarConfig,
	PioConfig,
	ProfileConfig,
	RandomPostsConfig,
	RelatedPostsConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	ThirdPartyAnalyticsConfig,
} from "./types";