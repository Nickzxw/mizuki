import type { LinkPreset, NavBarLink } from "../../../types";

export interface NavMenuPanelProps {
	links: NavBarLink[];
}

export interface DropdownMenuProps {
	link: NavBarLink;
	class?: string;
}

export interface ProcessedNavBarLink extends Omit<NavBarLink, "children"> {
	children?: ProcessedNavBarLink[];
}

export type { LinkPreset };
