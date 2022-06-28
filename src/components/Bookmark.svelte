<script lang="ts">
    import Image from './base/Image.svelte';
    import type { Bookmark } from './../library/types';
    export let bookmark: Bookmark;
</script>

<div class="bookmark">
    <div class="cover">
        <img alt={bookmark.title} src={bookmark.imgUrl}>
    </div>
    <div class="title">{bookmark.title}</div>
</div>

<style>
    .bookmark {
        display: flex;
        padding: 0.5em;
    }

    .cover {
        height: 14em;
        width: 10em;
        border-radius: 5px;
        border: 1px solid #b1b1b1;
    }

    .cover > img {
        object-fit: cover;
        object-position: 50% 50%;
        height: 100%;
        width: 100%;
        border-radius: inherit;
    }

    .title, .chapter {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0.5em;
    }

    .title {
        display: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;
    }

</style>