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

export function sourceToString(source: Source, chapter: number) {
    try{
        return source.website + source.page + source.format + String(chapter).padStart(source.pad, '0');
    } catch(e) {
        return '';
    }
}

export async function checkChapter(bookmark: Bookmark, chapter: number) {
    let url = 'https://' + sourceToString(bookmark.url, chapter) + '/';
    try {
        let xmlHttp = await GET(url);
        let parsedUrl = parseChapterUrl(xmlHttp.responseURL);

        let urlMatch = sourceToString(parsedUrl.source, parsedUrl.chapter) == sourceToString(bookmark.url, chapter);
        // Check if loaded page contains these known strings
        // ALERT: Add custom list of strings.
        let contains = xmlHttp.responseText.includes('"entry-content');
        if(!contains) contains = xmlHttp.responseText.includes('"container-chapter-reader"');
        if(!contains) contains = xmlHttp.responseText.includes('"pages-container"');
        if(!contains) contains = xmlHttp.responseText.includes('"chapcontent"');
        return urlMatch && contains;
    }catch(e) {
        throw e;
    }
}

export {}