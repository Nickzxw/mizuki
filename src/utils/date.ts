import { siteConfig } from "../config";

/**
 * Format date to YYYY-MM-DD string
 */
export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

/**
 * Format date with internationalization support
 */
export function formatDateI18n(dateString: string): string {
	const date = new Date(dateString);
	const lang = siteConfig.lang || "en";

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const localeMap: Record<string, string> = {
		zh_CN: "zh-CN",
		zh_TW: "zh-TW",
		en: "en-US",
		ja: "ja-JP",
		ko: "ko-KR",
		es: "es-ES",
		th: "th-TH",
		vi: "vi-VN",
		tr: "tr-TR",
		id: "id-ID",
		fr: "fr-FR",
		de: "de-DE",
		ru: "ru-RU",
		ar: "ar-SA",
	};

	const locale = localeMap[lang] || "en-US";
	return date.toLocaleDateString(locale, options);
}

/**
 * Format relative time for diary moments
 * @param dateString ISO date string
 * @param minutesAgo text for minutes
 * @param hoursAgo text for hours
 * @param daysAgo text for days
 */
export function formatRelativeTime(
	dateString: string,
	minutesAgo: string,
	hoursAgo: string,
	daysAgo: string,
): string {
	const date = new Date(dateString);
	const diffInMinutes = Math.floor(
		(Date.now() - date.getTime()) / (1000 * 60),
	);

	if (diffInMinutes < 60) {
		return `${diffInMinutes}${minutesAgo}`;
	}
	if (diffInMinutes < 1440) {
		const hours = Math.floor(diffInMinutes / 60);
		return `${hours}${hoursAgo}`;
	}
	const days = Math.floor(diffInMinutes / 1440);
	return `${days}${daysAgo}`;
}