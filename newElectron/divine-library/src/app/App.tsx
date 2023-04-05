import React from 'react';
import { useState, useEffect, Fragment } from 'react';

import type { Bookmark, NewChapter } from '../library/types';
import Scroller from './components/Scroller/Scroller';

function App() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [newBookmarks, setNewBookmarks] = useState<NewChapter[]>([]);

    useEffect(() => {
        refresh().then(()=>{});
    }, []);

    async function refresh() {
        window.electronAPI.getBookmarks().then((bookmarks) => {
            if(bookmarks && bookmarks.length > 0) {
                setBookmarks(sortBookmarks(bookmarks));
            }
        });
    }

    function sortBookmarks(bParam: Bookmark[]) {
        return bParam.sort((a, b) => {
            let aNew = newBookmarks.some((newMark) => newMark._id === a._id);
            let bNew = newBookmarks.some((newMark) => newMark._id === b._id);
            if(aNew && !bNew) return -1;
            if(!aNew && bNew) return 1;
            return a.title.localeCompare(b.title);
        });
    }

    // Render stuff here.
    const listMarks = bookmarks.map((bookmark, index) => 
        <Scroller key={index} speed={10} wait={2000}>
            {bookmark.title}
        </Scroller>
    );
    return(
    <Fragment>
        <h1>Hello World! :|</h1>
        <p>
            Why do I do this to myself? Re-Building this all over again.
        </p>
        <div>
            {listMarks}
        </div>
    </Fragment>);
}

export default App;