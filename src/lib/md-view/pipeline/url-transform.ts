import { defaultUrlTransform, type UrlTransform } from "react-markdown";

/** Protocols that are stripped from URLs for security. */
const DANGEROUS_PROTOCOL = /^\s*(javascript|data|vbscript|file):/i;

/** Strips dangerous protocols from a URL. */
export function sanitizeUrl(url: string | null | undefined): string | undefined {
    if (url == null) return undefined;
    const trimmed = String(url).trim();
    if (trimmed === "" || DANGEROUS_PROTOCOL.test(trimmed)) return undefined;
    return trimmed;
}

/** Hardened urlTransform for use with react-markdown. */
export const strictUrlTransform: UrlTransform = (url) => {
    return sanitizeUrl(defaultUrlTransform(url)) ?? "";
};
