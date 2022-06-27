<script lang="ts">
  import { onMount } from 'svelte';
  import { getBookmarks } from './library/library';
  import type { Bookmark as BookmarkType } from './library/types';
  import Bookmark from './components/Bookmark.svelte';

  let bookmarks: BookmarkType[] = [];

  onMount(async () => {
    const results = await getBookmarks();
    bookmarks = results;
  })
</script>

<main>
  {#if bookmarks.length > 0}
    <div class="bookmarks">
      {#each bookmarks as bookmark}
        <Bookmark bind:bookmark></Bookmark>
      {/each}
    </div>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main > .bookmarks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
