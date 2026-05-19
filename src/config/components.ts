/**
 * Component Layout Configuration
 * Contains sidebar and component layout settings
 */
import type { SidebarLayoutConfig, WidgetComponentConfig } from "../types";

/**
 * Sidebar Layout Configuration
 * Controls the display, ordering, animation, and responsive behavior of sidebar components
 *
 * Note: Sidebar controls which sidebar (left or right) a component belongs to.
 * Mobile typically doesn't show right sidebar content. If a component is set to right,
 * ensure layout.position is set to "both".
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// Sidebar component property configuration list
	properties: [
		{
			type: "profile",
			position: "top",
			class: "onload-animation",
			animationDelay: 0,
		},
		{
			type: "announcement",
			position: "top",
			class: "onload-animation",
			animationDelay: 50,
		},
		{
			type: "music-sidebar",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 100,
		},
		{
			type: "categories",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 150,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "tags",
			position: "top",
			class: "onload-animation",
			animationDelay: 250,
			responsive: {
				collapseThreshold: 20,
			},
		},
		{
			type: "card-toc",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 200,
		},
		{
			type: "site-stats",
			position: "top",
			class: "onload-animation",
			animationDelay: 200,
		},
		{
			type: "calendar",
			position: "top",
			class: "onload-animation",
			animationDelay: 250,
		},
	],

	// Sidebar component layout configuration
	components: {
		left: ["profile", "announcement", "tags", "card-toc"],
		right: ["site-stats", "calendar", "categories", "music-sidebar"],
		drawer: [
			"profile",
			"announcement",
			"music-sidebar",
			"categories",
			"tags",
		],
	},

	// Default animation configuration
	defaultAnimation: {
		enable: true,
		baseDelay: 0,
		increment: 50,
	},

	// Responsive layout configuration
	responsive: {
		breakpoints: {
			mobile: 768,
			tablet: 1280,
			desktop: 1280,
		},
	},
};