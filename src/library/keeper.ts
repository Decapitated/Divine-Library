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
    return source.website + source.page + source.format + String(chapter).padStart(source.pad, '0');
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
    const request = await GET('https://' + url + '/'); // Make request.
    const parsedUrl = parseChapterUrl(request.responseURL); // Parse the URL where the request landed.
    // ALERT: May want to remove this. May help with weird redirects. Known strings should be the goto anyhow.
    const urlMatch = parsedUrl != null && sourceToBaseURL(parsedUrl.source, parsedUrl.chapter) == url;
    const contains = knownRegex.test(request.responseText); // Check if requested page contains these known strings.
    return urlMatch && contains;
}