import db from './database';
import type { Bookmark } from './types';

export function getBookmarks(): Promise<Bookmark[]> {
    return new Promise((resolve, reject) => {
        db.bookmarks.find({}, (e: Error, bookmarks: Bookmark[]) => {
            e ? reject(e) : resolve(bookmarks);
        });
    });
}

// Adds a new bookmark.
export function addBookmark(bookmark: Bookmark): Promise<Bookmark> {
    return new Promise((resolve, reject) => {
        db.bookmarks.insert(bookmark, (e, newBookmark) => {
            e ? reject(e) : resolve(newBookmark);
        });
    });
}

// Edits a bookmark.
export function editBookmark(id: string, bookmark: Bookmark): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.bookmarks.update(
            {_id: id},                             // Match id.
            bookmark,                              // Data for update.
            {returnUpdatedDocs: true},             // Additional options.
            (e, numAffected, updatedBookmark) => { // Callback.
                e ? reject(e) : resolve(updatedBookmark);
            }
        );
    });
}

// Set the bookmarks current chapter.
export function setChapter(id: string, chapter: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.bookmarks.update(
            { _id: id },                           // Match id.
            { $set: { chapter: chapter } },        // Data for update.
            { returnUpdatedDocs: true },           // Additional options.
            (e, numAffected, updatedBookmark) => { // Callback.
                e ? reject(e) : resolve(updatedBookmark);
            }
        );
    });
}

export function deleteBookmark(bookmark_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
        db.bookmarks.remove(
            {_id: bookmark_id},  // Match id.
            {},                  // Additional options.
            (e, numRemoved) => { // Callback.
                e ? reject(e) : resolve(numRemoved);
            }
        );
    });
}

// Send url to electron to open browser.
export function openUrl(url: string) {
    nw.Shell.openExternal(url);
}

/* New datastore functions.
    export function getNewChapters() {
        return new Promise((resolve, reject) => {
            db.new.find({}, (e, chapters) => {
                e ? reject(e) : resolve(chapters);
            });
        });
    }

    // Add a new chapter if one does not exist.
    export function addNewChapter(bookmark_id, chapter) {
        return new Promise((resolve, reject) => {
            db.new.insert({bookmark_id: bookmark_id, chapter: chapter}, (e, newChapter) => {
                e ? reject(e) : resolve(newChapter);
            });
        });
    }

    // Update existing chapter.
    export function updateNewChapter(bookmark_id, chapter) {
        return new Promise((resolve, reject) => {
            db.new.update(
                {bookmark_id: bookmark_id},           // Match id.
                {bookmark_id: bookmark_id, chapter: chapter}, // Data for update.
                {returnUpdatedDocs: true},            // Additional options.
                (e, numAffected, updatedChapter) => { // Callback.
                    e ? reject(e) : resolve(updatedChapter);
                }
            );
        });
    }

    export function deleteNewChapter(bookmark_id) {
        return new Promise((resolve, reject) => {
            db.new.remove(
                {bookmark_id: bookmark_id},  // Match id.
                {},                  // Additional options.
                (e, numRemoved) => { // Callback.
                    e ? reject(e) : resolve(numRemoved);
                }
            );
        });
    }
*/