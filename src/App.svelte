<script context="module" lang="ts">
    export const APP_CONTEXT_KEY = Symbol();
    export type ContextType = {
        alert: (alert: Alert, lifetime?: number) => void;
    };
</script>
<script lang="ts">
    import { onMount, setContext } from 'svelte';

    // Components
    import Input from './components/base/Input.svelte';
    import BookmarkCard from './components/BookmarkCard.svelte';
    import BookmarkWidget from './components/BookmarkWidget.svelte';
    import AddBookmarkDialog from './components/AddBookmarkDialog.svelte';
    import Alerts from './components/base/alerts/Alerts.svelte';
    import { Alert, AlertTypes } from './components/base/types';
    import FloatingButtons from './components/base/FloatingButtons.svelte';

    import type { Bookmark, NewChapter } from './library/types';
    import { getBookmarks, getNewChapters, addBookmark } from './library/library';
    import { checkNewChapters } from './library/keeper';

    let alerter: Alerts;

    // Bookmark stuff.
    let view_type = 'card';
    let bookmarks: Bookmark[] = [];
    let newBookmarks: NewChapter[] = [];
    let currentReading: Bookmark;

    // Dialog stuff.
    let addDialog: AddBookmarkDialog;
    let addDialogReset = {};

    let search_value: string;

    setContext(APP_CONTEXT_KEY, {
        alert: (alert: Alert, lifetime = -1) => alerter.alert(alert, lifetime)
    });

    onMount(async () => {
        await refresh();
    });

    async function refresh() {
        newBookmarks = await getNewChapters();
        bookmarks = sortBookmarks(await getBookmarks());
    }

    function sortBookmarks(bParam: Bookmark[]) {
        return bParam.sort((a, b) => {
            let aNew = newBookmarks.some((newMark) => newMark.bookmark_id === a._id);
            let bNew = newBookmarks.some((newMark) => newMark.bookmark_id === b._id);
            if(aNew && !bNew) return -1;
            if(!aNew && bNew) return 1;
            return a.title.localeCompare(b.title);
        });
    }

    function add(bookmark: Bookmark) {
        addBookmark(bookmark).then((addedBookmark) => {
            bookmarks.push(addedBookmark);
            bookmarks = bookmarks;
            addDialogReset = {};
        });
    }

    // Test alerting.
    const alerts = [
        {
            title: 'Debug',
            message: 'Test message...',
            type: AlertTypes.Debug
        },
        {
            title: 'Info',
            message: 'Test message...',
            type: AlertTypes.Info
        },
        {
            title: 'Warning',
            message: 'Test message...',
            type: AlertTypes.Warning
        },
        {
            title: 'Error',
            message: 'Test message...',
            type: AlertTypes.Error
        },
    ] as Alert[];
    function alertTest() {
        alerts.forEach((alert) => alerter.alert(alert));
    }

    // Scroll to Top
    let bookmarksElem: HTMLDivElement;
    function scrollToTop() {
        bookmarksElem.scrollTo({
            left: 0, top: 0, behavior: 'smooth'
        });
    }

    async function bookmarkClick(bookmark: Bookmark) {
        currentReading = bookmark;
    }

    function check() {
        alerter.alert({
            title: 'Checking For New Chapters!',
            message: 'Please wait patiently for check to finish.',
            type: AlertTypes.Info
        });
        checkNewChapters().then(async () => {
            alerter.alert({
                title: 'Checking Finished!',
                message: 'Please wait for refresh.',
                type: AlertTypes.Info
            });
            newBookmarks = [];
            bookmarks = [];
            await refresh();
        }).catch((error) => {
            alerter.alert({
                title: 'Failed to check new chapters.',
                message: error,
                type: AlertTypes.Error
            });
        });
    }
</script>

{#key addDialogReset}
    <AddBookmarkDialog
        bind:this={addDialog}
        on:add={(e) => add(e.detail)}
        on:cancel={() => addDialogReset = {}} />
{/key}
<div style:display="flex" style:justify-content="flex-end">
    <button on:click={alertTest}>Test Alert</button>
    <button on:click={() => addDialog.show()}>Show Dialog</button>
</div>
<div class="bookmark-bar">
    <!-- Left -->
    <div class="left">
        <select bind:value={view_type}>
            <option value="card" selected>Card</option>
            <option value="list" selected>List</option>
        </select>
    </div>
    <!-- Center -->
    <div class="center">
        <Input placeholder="Search"
            bind:value={search_value}
            on:change={(e) => console.log('App Change', e)}
            on:input={(e) => console.log('App Input', e)}></Input>
    </div>
    <!-- Right -->
    <div class="right">
        <button on:dblclick={check}>Check</button>
    </div>
</div>
<main>
    <Alerts bind:this={alerter} />
    {#if bookmarks.length > 0}
        <div bind:this={bookmarksElem} class="bookmarks">
            {#each bookmarks as bookmark}
                <BookmarkCard type={view_type} backup_img="./assets/Magic-Scroll.png" {bookmark}
                    class={(newBookmarks.some(newMark => newMark.bookmark_id === bookmark._id))? 'new':''}
                    on:click={async () => await bookmarkClick(bookmark) }
                />
            {/each}
        </div>
    {/if}
    <div class="overlay">
        {#key currentReading}
            <BookmarkWidget bookmark={currentReading} backup_img="./assets/Magic-Scroll.png"></BookmarkWidget>
        {/key}
        <FloatingButtons>
            <svelte:fragment slot="options">
                <button on:click={scrollToTop}>^</button>
            </svelte:fragment>
            <svelte:fragment slot="toggle-text" let:toggled>
                {#if !toggled}
                    <svg xmlns="http://www.w3.org/2000/svg" height="50%" width="50%" viewBox="0 0 24 24"><path d="M12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" height="50%" width="50%" viewBox="0 0 24 24"><path d="M12 17q2.075 0 3.538-1.463Q17 14.075 17 12t-1.462-3.538Q14.075 7 12 7 9.925 7 8.463 8.462 7 9.925 7 12q0 2.075 1.463 3.537Q9.925 17 12 17Zm0 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>
                {/if}
            </svelte:fragment>
        </FloatingButtons>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&display=swap');

    :root {
        font-family: 'Oswald', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    :global(body) {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: #0c0c0c;
        color: white;
        padding: 0;
        margin: 0;
    }

    :global(body *) {
        background-color: inherit;
        color: inherit;
    }

    .bookmark-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        z-index: 2;
        box-shadow: 0px 10px 5px -5px black;
    }

    .bookmark-bar > * {
        display: flex;
        align-items: center;
        flex-basis: 33.333333%;
        flex-grow: 1;
    }

    .bookmark-bar > * > :global(*) {
        height: fit-content;
    }

    .bookmark-bar > :not(:first-child):not(:last-child) {
        justify-content: center;
    }

    .bookmark-bar > :last-child{
        justify-content: flex-end;
    }

    .bookmark-bar :global(input) {
        margin-bottom: 0.5rem;
    }

    main {
        position: relative;
        display: flex;
        flex-grow: 1;
        overflow-y: hidden;
    }

    .bookmarks {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow-y: auto;
        scroll-snap-type: y proximity;
    }

    /* width */
    .bookmarks::-webkit-scrollbar {
        width: 0.75rem;
    }

    /* Track */
    .bookmarks::-webkit-scrollbar-track {
        background-color: #202020;
    }

    /* Handle */
    .bookmarks::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    .bookmarks::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    :global(.bookmark) {
        scroll-snap-align: end;
    }

    :global(.bookmark.new) {
        box-shadow: 0px 0px 5px 3px yellow !important;
    }

    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: flex;
        justify-content: end;
        align-items: end;

        background: none;
        pointer-events: none;
    }

    :global(button) {
        --bg-color: 255, 255, 255;
        --color: 0, 0, 0;
        border: 1px solid transparent;
        background: none;
        border-radius: 5px;
        color: rgb(var(--bg-color));
        padding: 0.25rem 0.5rem;
        margin: 0.25rem;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s;
    }

    :global(button:hover, button:active) {
        border: 1px solid rgb(var(--bg-color));
        background-color: rgb(var(--bg-color));
        color: rgb(var(--color));
    }

    :global(button:active) {
        filter: invert(1);
        box-shadow: 0px 0px 0px 3px rgba(var(--bg-color), 0.5);
    }
</style>