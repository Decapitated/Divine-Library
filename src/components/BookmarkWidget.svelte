<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Scroller from './base/Scroller.svelte';
    import Image from './base/Image.svelte';
    import type { Bookmark } from '../library/types';

    export let bookmark: Bookmark;
    export let type = 'card';
    export let backup_img = '';

    const dispatch = createEventDispatcher();
</script>

<div class="bookmark" class:list={type == 'list'} on:click={() => dispatch('click')}>
    <div class="cover">
        <Image alt={bookmark.title} src={bookmark.imgUrl} backup={backup_img}/>
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
        height: 14em;
        width: 10em;
        margin: 0.5em;
        position: relative;
        box-shadow: 0px 5px 5px -5px black;
        border-radius: 5px;
        background-color: #0c0c0c;
    }

    .bookmark.list {
        height: 5em;
        min-width: 15em;
        flex-grow: 1;
        flex-direction: row;
    }

    .cover {
        height: 100%;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
    }

    .list .cover {
        width: 5em;
    }

    .cover > :global(img) {
        object-fit: cover;
        object-position: 50% 50%;
        height: 100%;
        width: 100%;
        border-radius: inherit;
        transition: all 0.15s;
    }

    .bookmark:not(.list):hover :global(img) {
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

    .list .content {
        position: relative;
        align-items: center;
        background: none;
    }

    .bookmark > .content > * {
        width: calc(100% - 1em);
        margin: 0.5em;
    }

    .bookmark:not(.list):not(:hover) .content {
        display: none;
    }

    .content > .title {
        font-size: 1.25rem;
        font-weight: 500;
    }
</style>