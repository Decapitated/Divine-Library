<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Scroller from './base/Scroller.svelte';
    import type { Bookmark } from '../library/types';

    export let bookmark: Bookmark;

    const dispatch = createEventDispatcher();
</script>

<div class="bookmark" on:click={() => dispatch('click')}>
    <div class="cover">
        <img alt={bookmark.title} src={bookmark.imgUrl}>
    </div>
    <div class="content">
        <div class="title">
            <Scroller speed={10} wait={2000}>{bookmark.title}</Scroller>
        </div>
    </div>
</div>

<style>
    .bookmark {
        display: flex;
        margin: 0.5em;
        height: 14em;
        width: 10em;
        position: relative;
        box-shadow: 0px 5px 5px -5px black;
    }

    .cover {
        height: 100%;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
    }

    .cover > img {
        object-fit: cover;
        object-position: 50% 50%;
        height: 100%;
        width: 100%;
        border-radius: inherit;
        transition: all 0.15s;
    }

    .bookmark:hover img {
        height: 125%;
    }

    .content {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        overflow: hidden;
        align-items: flex-end;
        background: rgb(0,0,0);
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(18,17,17,1) 100%);
    }

    .bookmark > .content > * {
        width: calc(100% - 1em);
        margin: 0.5em;
    }

    .bookmark:not(:hover) .content {
        display: none;
    }
    .content > .title {
        font-size: 1.25rem;
        font-weight: 500;
    }
</style>