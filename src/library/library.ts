/**
 * The "Library" contains funtionality pertaining to "Books", like:
 *     + Retrieving/Adding/Editing/Deleting bookmarks.
 *     + ^-- for unread chapters.
 */

import db from './database';
import type { Bookmark, NewChapter, Source } from './types';
import { openUrl, sourceToBaseURL } from './utilities';

// Gets all the bookmarks.
export function getBookmarks(): Promise<Bookmark[]> {
    return new Promise((resolve, reject) => {
        db.bookmarks.find({}, (e, bookmarks) => {
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
export function editBookmark(bookmark: Bookmark): Promise<Bookmark> {
    return new Promise((resolve, reject) => {
        db.bookmarks.update(
            {_id: bookmark._id},                   // Match id.
            bookmark,                              // Data for update.
            {returnUpdatedDocs: true},             // Additional options.
            (e, _numAffected, updatedBookmark, _upsert) => { // Callback.
                e ? reject(e) : resolve(updatedBookmark);
            }
        );
    });
}

// Set the bookmarks current chapter.
export function setChapter(id: string, chapter: number): Promise<Bookmark> {
    return new Promise((resolve, reject) => {
        db.bookmarks.update(
            { _id: id },                           // Match id.
            { $set: { chapter: chapter } },        // Data for update.
            { returnUpdatedDocs: true },           // Additional options.
            (e, _numAffected, updatedBookmark, _upsert) => { // Callback.
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
export function openChapter(source: Source, chapter: number) {
    // Open bookmark
    let url = 'https://' + sourceToBaseURL(source, chapter);
    openUrl(url);
}

export function getNewChapters(): Promise<NewChapter[]> {
    return new Promise((resolve, reject) => {
        db.new.find({}, (e, chapters) => {
            e ? reject(e) : resolve(chapters);
        });
    });
}

// Add a new chapter if one does not exist.
export function addNewChapter(newChapter: NewChapter): Promise<NewChapter> {
    return new Promise((resolve, reject) => {
        db.new.insert(newChapter, (e, newChapter) => {
            e ? reject(e) : resolve(newChapter);
        });
    });
}

// Update existing chapter.
export function updateNewChapter(bookmark_id: string, chapter: number): Promise<NewChapter> {
    return new Promise((resolve, reject) => {
        db.new.update(
            {_id: bookmark_id},                              // Match id.
            {chapter: chapter},                              // Data for update.
            {returnUpdatedDocs: true},                       // Additional options.
            (e, _numAffected, updatedBookmark, _upsert) => { // Callback.
                e ? reject(e) : resolve(updatedBookmark);
            }
        );
    });
}

export function deleteNewChapter(bookmark_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
        db.new.remove(
            {_id: bookmark_id},         // Match id.
            {},                         // Additional options.
            (e, numRemoved) => {        // Callback.
                e ? reject(e) : resolve(numRemoved);
            }
        );
    });
}