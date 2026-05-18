/**
 * Configuration Module
 * @description This file is maintained for backward compatibility.
 * All configurations have been moved to the config/ directory.
 * Please import from config/ submodules for new code.
 */

/* bangumi: { userId: "your-bangumi-id" } */

// Re-export all configurations from the config/ directory for backward compatibility
export {
	licenseConfig,
	siteConfig,
	fullscreenWallpaperConfig,
	navBarConfig,
	permalinkConfig,
	expressiveCodeConfig,
	commentConfig,
	shareConfig,
	footerConfig,
} from "./config/site";

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
} from "./config/theme";

export { sidebarLayoutConfig } from "./config/components";

export {
	profileConfig,
	announcementConfig,
	musicPlayerConfig,
	sakuraConfig,
	pioConfig,
	relatedPostsConfig,
	randomPostsConfig,
	widgetConfigs,
} from "./config/widgets";

export type {
	Favicon,
	PageProgressBarConfig,
	ThirdPartyAnalyticsConfig,
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
} from "./types";