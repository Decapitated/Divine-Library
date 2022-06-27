<script lang="ts">
  import { onMount } from 'svelte';
  import { getBookmarks } from './library/library';
  import type { Bookmark } from './library/types';

  let bookmarks: Bookmark[] = [];

  onMount(async () => {
    const results = await getBookmarks();
    bookmarks = results;
  })
</script>

<main>
  <h1>You have entered the <i>Divine Library</i></h1>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
