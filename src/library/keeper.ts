import type { Bookmark, Source } from './types';
import { parseChapterUrl } from './utilities';

function GET(url: string): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
        // Setup request.
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url, true);
        xmlHttp.responseType = 'text';
        xmlHttp.timeout = 5000; // Timeout after 5 seconds.
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status < 400)){
                resolve(xmlHttp);
            }else if(xmlHttp.status >= 400) {
                xmlHttp.abort();
                reject("Page not found.");
            }
        };
        const rejectError = (e: ProgressEvent<EventTarget>) => reject(e);
        xmlHttp.ontimeout = rejectError;
        xmlHttp.onerror = rejectError;
        // Send request.
        xmlHttp.send(null);
    });
}

export function sourceToBaseURL(source: Source, chapter: number) {
    try{
        return source.website + source.page + source.format + String(chapter).padStart(source.pad, '0');
    } catch(e) {
        return '';
    }
}

const knownStrings = [
    '"entry-content',
    '"container-chapter-reader"',
    '"pages-container"',
    '"chapcontent"'
].join('|');
const knownRegex = new RegExp(knownStrings);

export async function checkChapter(bookmark: Bookmark, chapter: number) {
    const url = sourceToBaseURL(bookmark.url, chapter);
    // Make request.
    const request = await GET('https://' + url + '/');
    // Parse the URL where the request landed.
    const parsedUrl = parseChapterUrl(request.responseURL);
    // ALERT: May want to remove this. May help with weird redirects. Known strings should be the goto anyhow.
    // Check if the parsed url matches the requested url.
    const urlMatch = parsedUrl != null && sourceToBaseURL(parsedUrl.source, parsedUrl.chapter) == url;
    // ALERT: Add custom list of strings.
    // Check if requested page contains these known strings.
    const contains = knownRegex.test(request.responseText);
    return urlMatch && contains;
}