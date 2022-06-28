<script lang="ts">
  import { onMount } from 'svelte';
  import Bookmark from './components/Bookmark.svelte';
  import Input from './components/base/Input.svelte';

  import { getBookmarks } from './library/library';
  import type { Bookmark as BookmarkType } from './library/types';

  let bookmarks: BookmarkType[] = [];

  onMount(async () => {
    const results = await getBookmarks();
    bookmarks = results;
  })
</script>

<Input placeholder="Search"></Input>
{#if bookmarks.length > 0}
  <div class="bookmarks">
    {#each bookmarks as bookmark}
      <Bookmark bind:bookmark></Bookmark>
    {/each}
  </div>
{/if}

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
