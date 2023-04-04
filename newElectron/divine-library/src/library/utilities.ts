import type { Source } from './types';

/* Regex to break url into proper object.
Group 1: https://www.
Group 2: asurascans.com
Group 3: /return-of-the-8th-class-magician
Group 4: -ch-
Group 5: 52
*/
export const regexpURL = /^((?:http|https):\/\/(?:www.)?)?(\w+.\w{2,63})([^?#]+?[^\/-])((?:\/|-|_)?(?:(?:ch\w*)|(?:\d*(?=\/|$)))?(?:[\/\-_]))(\d+)\/?$/;

export type ParsedUrl = {
    source: Source;
    chapter: number;
};

export function parseChapterUrl(url: string): ParsedUrl|null {
    const groups = url.match(regexpURL);
    if(groups !== null) {
        let pad = 0;
        if(groups[5].charAt(0) === '0') pad = groups[5].length;
        const source = {
            website: groups[2],
            page: groups[3],
            format: groups[4],
            pad: pad // String(n).padStart(pad, '0');
        } as Source;
        return {
            source: source,
            chapter: parseInt(groups[5])
        } as ParsedUrl;
    } else {
        return null;
    }
}

export function sourceToBaseURL(source: Source, chapter: number) {
    return source.website + source.page + source.format + String(chapter).padStart(source.pad, '0');
}