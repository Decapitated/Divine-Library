/**
 * Low-Level datastore bindings.
 * Implement type checking at a higher level.
 */
const Datastore = require('nedb');
const dataPath = 'datastores/';

type Databases = {
    bookmarks: typeof Datastore;
    new: typeof Datastore;
};

const db = {} as Databases;
// Bookmarks datastore setup
db.bookmarks = new Datastore({
    filename: dataPath + 'bookmarks.db',
    autoload: true });

db.bookmarks.ensureIndex({ fieldName: 'title', unique: true }, function (e) {
    if(e !== null) console.log("Failed to ensure index.", e.message);
});

// New chapters datastore setup
db.new = new Datastore({
    filename:  dataPath + 'new.db',
    autoload: true });

db.new.ensureIndex({ fieldName: 'bookmark_id', unique: true }, function (e) {
    if(e !== null) console.log("Failed to ensure index.", e.message);
});

export default db;