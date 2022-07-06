<script lang="ts">
    import { onMount } from 'svelte';
    import Input from './components/base/Input.svelte';
    import BookmarkWidget from './components/BookmarkWidget.svelte';
    import AddBookmarkDialog from './components/AddBookmarkDialog.svelte';
    import type { Bookmark } from './library/types';
    import { getBookmarks, addBookmark } from './library/library';

    let bookmarks: Bookmark[] = [];

    let addDialog: AddBookmarkDialog;
    let search_value: string;
    let view_type = 'card';

    onMount(async () => {
        bookmarks = await getBookmarks();
    })

    function add(bookmark: Bookmark) {
        addBookmark(bookmark).then((addedBookmark) => {
            bookmarks.push(addedBookmark);
            bookmarks = bookmarks;
            addDialog.hide();
        });
    }
</script>

<button on:click={() => addDialog.show()}>Show Dialog</button>
<Input placeholder="Search"
            bind:value={search_value}
            on:change={(e) => console.log('App Change', e)}
            on:input={(e) => console.log('App Input', e)}></Input>
<div class="bookmark-bar">
    <div><h3>Divine Library</h3></div>
    <div><i>Central Standard Time</i></div>
    <div>
        <select bind:value={view_type}>
            <option value="card" selected>Card</option>
            <option value="list" selected>List</option>
        </select>
    </div>
</div>
{#if bookmarks.length > 0}
  <div class="bookmarks">
    {#each bookmarks as bookmark}
        <BookmarkWidget type={view_type} backup_img="./assets/Magic-Scroll.png" bind:bookmark on:click={() => {
            console.log('BookmarkWidget', bookmark.title);
        }} />
    {/each}
  </div>
{/if}
<AddBookmarkDialog bind:this={addDialog} on:add={(e) => add(e.detail)} />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

    :root {
        font-family: 'Oswald', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    :global(body) {
        background-color: #0c0c0c;
        color: white;
    }
    :global(body *) {
        background-color: inherit;
        color: inherit;
    }

    .bookmark-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
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

    .bookmarks {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
