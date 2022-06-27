import db from './database.js';

export default {
    // Gets all the bookmarks.
    getBookmarks: () => {
        return new Promise((resolve, reject) => {
            db.bookmarks.find({}, (e, bookmarks) => {
                e ? reject(e) : resolve(bookmarks);
            });
        });
    },
    // Adds a new bookmark.
    addBookmark: (bookmark) => {
        return new Promise((resolve, reject) => {
            db.bookmarks.insert(bookmark, (e, newBookmark) => {
                e ? reject(e) : resolve(newBookmark);
            });
        });
    },
    // Edits a bookmark.
    editBookmark: (id, bookmark) => {
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
    },
    // Set the bookmarks current chapter.
    setChapter: (id, chapter) => {
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
    },
    deleteBookmark: (bookmark_id) => {
        return new Promise((resolve, reject) => {
            db.bookmarks.remove(
                {_id: bookmark_id},  // Match id.
                {},                  // Additional options.
                (e, numRemoved) => { // Callback.
                    e ? reject(e) : resolve(numRemoved);
                }
            );
        });
    },
    // Send url to electron to open browser.
    openUrl: (url) => {
        ipcRenderer.send('openUrl', url);
    },
    getNewChapters: () => {
        return new Promise((resolve, reject) => {
            db.new.find({}, (e, chapters) => {
                e ? reject(e) : resolve(chapters);
            });
        });
    },
    // Add a new chapter if one does not exist.
    addNewChapter: (bookmark_id, chapter) => {
        return new Promise((resolve, reject) => {
            db.new.insert({bookmark_id: bookmark_id, chapter: chapter}, (e, newChapter) => {
                e ? reject(e) : resolve(newChapter);
            });
        });
    },
    // Update existing chapter.
    updateNewChapter: (bookmark_id, chapter) => {
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
    },
    deleteNewChapter: (bookmark_id) => {
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
}