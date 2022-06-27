<script lang="ts">
  import { onMount } from 'svelte';
  import library from './js/library';

  let bookmarks = [];

  onMount(async () => {
    const results = await library.getBookmarks();
    bookmarks = results;
  })
</script>

<main>
  <h1>You have entered the <i>Divine Library</i></h1>
  <div>
    {#if bookmarks.length > 0}
      {#each bookmarks as bookmark }
        <div><pre>
          {JSON.stringify(bookmark, null, 4)}
        </pre></div>
      {/each}
    {/if}
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
