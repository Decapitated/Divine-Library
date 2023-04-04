/**
 * Low-Level datastore bindings.
 * Implement type checking at a higher level.
 */
const nedb = require('nedb');
import type Datastore from 'nedb'
import { Bookmark, NewChapter } from './types';
// Folder name to store datastores.
const DATA_PATH = 'datastores/';

export type Databases = {
    bookmarks: Datastore<Bookmark>;
    new: Datastore<NewChapter>;
};

const db = {} as Databases;
// Bookmarks datastore setup
db.bookmarks = new nedb({
    filename: DATA_PATH + 'bookmarks.db',
    autoload: true });

db.bookmarks.ensureIndex({ fieldName: 'title', unique: true }, function (e) {
    if(e !== null) console.log("Failed to ensure index.", e.message);
});

// New chapters datastore setup
db.new = new nedb({
    filename:  DATA_PATH + 'new.db',
    autoload: true });

/* Testing setting _id manually.
db.new.ensureIndex({ fieldName: 'bookmark_id', unique: true }, function (e) {
    if(e !== null) console.log("Failed to ensure index.", e.message);
}); */

export default db;