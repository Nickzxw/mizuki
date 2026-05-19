import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import type { CollectionEntry } from "astro:content";

import { permalinkConfig } from "../config";

// ============================================================================
// URL Core Utilities
// ============================================================================

/**
 * 移除文件扩展名（.md, .mdx, .markdown）
 * 用于将 Astro v5 Content Layer API 的 id 转换为 URL 友好的 slug
 */
export function removeFileExtension(id: string): string {
	return id.replace(/\.(md|mdx|markdown)$/i, "");
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function url(path: string) {
	return joinUrl("", import.meta.env.BASE_URL, path);
}

// ============================================================================
// URL Path Utilities
// ============================================================================

export function pathsEqual(path1: string, path2: string) {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
}

export function getDir(path: string): string {
	// 移除文件扩展名
	const pathWithoutExt = removeFileExtension(path);
	const lastSlashIndex = pathWithoutExt.lastIndexOf("/");
	if (lastSlashIndex < 0) {
		return "/";
	}
	return pathWithoutExt.substring(0, lastSlashIndex + 1);
}

export function getFileDirFromPath(filePath: string): string {
	return filePath.replace(/^src\//, "").replace(/\/[^/]+$/, "");
}

// ============================================================================
// Permalink Utilities (Post ID Mapping)
// ============================================================================

// 文章 ID 映射缓存（用于存储按时间排序后的文章序号）
let postIdMap: Map<string, number> | null = null;

/**
 * 初始化文章 ID 映射
 * 按发布时间升序排列（最早的文章 id = 1），草稿文章不参与计算
 * @param posts 所有非草稿文章
 */
export function initPostIdMap(
	posts: CollectionEntry<"posts">[],
): Map<string, number> {
	if (postIdMap) {
		return postIdMap;
	}

	// 按发布时间升序排序（最早的在前）
	const sortedPosts = [...posts].sort(
		(a, b) => a.data.published.getTime() - b.data.published.getTime(),
	);

	postIdMap = new Map();
	sortedPosts.forEach((post, index) => {
		// id 从 1 开始
		postIdMap!.set(post.id, index + 1);
	});

	return postIdMap;
}

/**
 * 获取文章的序号 ID
 * @param postId 文章的 content collection id
 * @returns 文章序号，如果未初始化则返回 0
 */
export function getPostNumericId(postId: string): number {
	if (!postIdMap) {
		// 在客户端或未初始化时返回 0，使用默认 slug
		console.warn("Post ID map not initialized. Returning 0 for post_id.");
		return 0;
	}
	return postIdMap.get(postId) ?? 0;
}

/**
 * 清除文章 ID 映射缓存（用于测试或重新初始化）
 */
export function clearPostIdMap(): void {
	postIdMap = null;
}

/**
 * 生成 permalink slug
 * 根据配置的格式模板和文章数据生成 URL slug
 * @param post 文章数据
 * @returns 生成的 slug（不包含 /posts/ 前缀）
 */
export function generatePermalinkSlug(post: CollectionEntry<"posts">): string {
	// 如果文章有自定义 permalink，优先使用（不在 /posts/ 下）
	if (post.data.permalink) {
		// 移除开头和结尾的斜杠
		return post.data.permalink.replace(/^\/+/, "").replace(/\/+$/, "");
	}

	// 如果全局 permalink 功能未启用，使用默认 slug
	if (!permalinkConfig.enable) {
		// 如果有 alias，使用 alias
		if (post.data.alias) {
			return post.data.alias.replace(/^\/+/, "").replace(/\/+$/, "");
		}
		// 否则使用文件名
		return removeFileExtension(post.id);
	}

	// 使用全局 permalink 格式模板
	const format = permalinkConfig.format;

	const published = post.data.published;
	const postname = removeFileExtension(post.id);

	let rawPostname = postname;
	// Use original file name preserving case from filePath if available
	if (post.filePath) {
		const parts = post.filePath.split("/");
		const filename = parts[parts.length - 1];
		if (filename) {
			rawPostname = removeFileExtension(filename);
		}
	}
	const category = post.data.category || "uncategorized";

	// 替换占位符
	const slug = format
		.replace(/%year%/g, published.getFullYear().toString())
		.replace(
			/%monthnum%/g,
			(published.getMonth() + 1).toString().padStart(2, "0"),
		)
		.replace(/%day%/g, published.getDate().toString().padStart(2, "0"))
		.replace(/%hour%/g, published.getHours().toString().padStart(2, "0"))
		.replace(
			/%minute%/g,
			published.getMinutes().toString().padStart(2, "0"),
		)
		.replace(
			/%second%/g,
			published.getSeconds().toString().padStart(2, "0"),
		)
		.replace(/%post_id%/g, getPostNumericId(post.id).toString())
		.replace(/%postname%/g, postname)
		.replace(/%raw_postname%/g, rawPostname)
		.replace(/%category%/g, category);

	return slug;
}

/**
 * 判断文章是否使用自定义 permalink（根目录下，不在 /posts/ 下）
 * @param post 文章数据
 */
export function hasCustomPermalink(
	post: CollectionEntry<"posts"> | { data: { permalink?: string } },
): boolean {
	return !!post.data.permalink;
}

/**
 * 获取文章的完整 URL 路径
 * @param post 文章数据
 * @returns URL 路径（如 /my-post/ 或 /custom-path/）
 */
export function getPermalinkPath(post: CollectionEntry<"posts">): string {
	const slug = generatePermalinkSlug(post);

	// 所有 permalink 生成的链接都在根目录下
	return `/${slug}/`;
}

// ============================================================================
// Post URL Builders
// ============================================================================

export function getPostUrlBySlug(slug: string): string {
	// 移除文件扩展名（如 .md, .mdx 等）
	const slugWithoutExt = removeFileExtension(slug);
	return url(`/posts/${slugWithoutExt}/`);
}

export function getPostUrlByAlias(alias: string): string {
	// 移除开头的斜杠并确保固定链接在 /posts/ 路径下
	const cleanAlias = alias.replace(/^\/+/, "");
	return url(`/posts/${cleanAlias}/`);
}

export function getPostUrl(post: CollectionEntry<"posts">): string;
export function getPostUrl(post: {
	id: string;
	data: { alias?: string; permalink?: string };
}): string;
export function getPostUrl(post: any): string {
	// 如果文章有自定义 permalink，优先使用（在根目录下）
	if (post.data.permalink) {
		const slug = post.data.permalink
			.replace(/^\/+/, "")
			.replace(/\/+$/, "");
		return url(`/${slug}/`);
	}

	// 如果全局 permalink 功能启用，使用生成的 slug（在根目录下）
	if (permalinkConfig.enable) {
		const slug = generatePermalinkSlug(post);
		return url(`/${slug}/`);
	}

	// 如果文章有 alias，使用 alias（在 /posts/ 下）
	if (post.data.alias) {
		return getPostUrlByAlias(post.data.alias);
	}

	// 否则使用默认的 slug 路径
	return getPostUrlBySlug(post.id);
}

// ============================================================================
// Tag & Category URLs
// ============================================================================

export function getTagUrl(tag: string): string {
	if (!tag) {
		return url("/archive/");
	}
	return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`);
}

export function getCategoryUrl(category: string | null): string {
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() ===
			i18n(I18nKey.uncategorized).toLowerCase()
	) {
		return url("/archive/?uncategorized=true");
	}
	return url(`/archive/?category=${encodeURIComponent(category.trim())}`);
}

// ============================================================================
// Post Path Builder (for dynamic routes)
// ============================================================================

export function buildPostPaths(blogEntries: CollectionEntry<"posts">[]) {
	initPostIdMap(blogEntries);

	return blogEntries
		.map((entry) => {
			const defaultSlug = removeFileExtension(entry.id);

			if (hasCustomPermalink(entry)) {
				return [{ params: { slug: defaultSlug }, props: { entry } }];
			}

			if (permalinkConfig.enable) {
				return [{ params: { slug: defaultSlug }, props: { entry } }];
			}

			const paths: {
				params: { slug: string };
				props: { entry: CollectionEntry<"posts"> };
			}[] = [{ params: { slug: defaultSlug }, props: { entry } }];

			if (entry.data.alias) {
				let alias = entry.data.alias
					.replace(/^\/+/, "")
					.replace(/\/+$/, "");
				if (alias.startsWith("posts/")) {
					alias = alias.replace(/^posts\//, "");
				}
				paths.push({ params: { slug: alias }, props: { entry } });
			}

			return paths;
		})
		.flat();
}