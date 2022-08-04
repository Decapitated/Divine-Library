<script lang="ts">
    import Image from "./base/Image.svelte";
    import Scroller from "./base/Scroller.svelte";
    import { openChapter } from "./../library/library";
    import type { Bookmark } from "./../library/types";

    export let bookmark: Bookmark;
    export let backup_img = '';

    let open = !!bookmark; // Convert bookmark to boolean.
    console.log(open);
</script>

{#if bookmark}
    <div class="widget" class:open>
        <div class="banner">
            <div class="vignette"></div>
            <Image alt={bookmark.title} src={bookmark.imgUrl} backup={backup_img}/>
        </div>
        <div class="content">
            <div class="title">
                <Scroller speed={10} wait={2000}>{bookmark.title}</Scroller>
            </div>
            <div class="chapter-actions">
                <div class="action">
                    <button on:click={() => { openChapter(bookmark.url, bookmark.chapter); }}>Current: {bookmark.chapter}</button>
                </div>
                <div class="action">
                    <button>Next: N/A</button>
                </div>
            </div>
        </div>
    </div>
{/if}


<style>
    .widget {
        width: 20rem;
        height: 20rem;
        background-color: #0c0c0c;
        pointer-events: auto;
        border-radius: 10px;
        margin: 0.5rem;
        display: flex;
        flex-direction: column;
        border: 1px solid #0c0c0c;
    }

    .banner {
        position: relative;
        overflow: clip;
        height: 5em;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .banner > .vignette {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        background: radial-gradient(circle,transparent 0%,black 200%);
    }

    .banner > :global(img) {
        object-fit: cover;
        object-position: 50% 50%;
        height: 100%;
        width: 100%;
        border-radius: inherit;
        transition: all 0.15s;
        filter: blur(0.15rem);
    }

    .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: none;
        z-index: 2;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5em;
        margin-top: -5em;
        padding: 0 2rem;
        border-radius: 5px;
        box-shadow: 0px 0px 5px 1px black;
    }

    .title :global(.scroller > div) {
        text-shadow: -1px 1px 0 #000,
                      1px 1px 0 #000,
                      1px -1px 0 #000,
                     -1px -1px 0 #000;
    }

    .chapter-actions {
        display: flex;
        justify-content: space-around;
    }

    .action {
        display: flex;
        margin: 0 1rem;
    }

    .action button {
        white-space: nowrap;
    }

    .content > * {
        margin-bottom: 0.5rem;
    }
</style>