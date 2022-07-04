<script lang="ts">
    import { onMount } from 'svelte';
    import Input from './components/base/Input.svelte';
    import BookmarkCard from './components/BookmarkCard.svelte';
    import AddBookmarkDialog from './components/AddBookmarkDialog.svelte';
    import type { Bookmark } from './library/types';
    import { getBookmarks } from './library/library';

    let bookmarks: Bookmark[] = [];

    let addDialog: AddBookmarkDialog;
    let search_value: string;

    onMount(async () => {
        bookmarks = await getBookmarks();
    })
</script>

<button on:click={() => addDialog.show()}>Show Dialog</button>
<Input placeholder="Search"
    bind:value={search_value}
    on:change={(e) => console.log('App Change', e)}
    on:input={(e) => console.log('App Input', e)}></Input>
{#if bookmarks.length > 0}
  <div class="bookmarks">
    {#each bookmarks as bookmark}
      <BookmarkCard bind:bookmark on:click={() => {
        console.log('BookmarkCard', bookmark.title);
      }}></BookmarkCard>
    {/each}
  </div>
{/if}
<AddBookmarkDialog bind:this={addDialog} on:add={(e) => console.log(e.detail)} />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

  :root {
    font-family: 'Oswald', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  :global(body) {
    background-color: #121212;
    color: white;
  }

  .bookmarks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
