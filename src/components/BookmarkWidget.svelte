<script lang="ts">
    import Image from "./base/Image.svelte";
    import Scroller from "./base/Scroller.svelte";
    import { openChapter } from "./../library/library";
    import type { Bookmark } from "./../library/types";

    export let bookmark: Bookmark;
    export let backup_img = '';
    export let open: boolean;
</script>

{#key bookmark}
    <div class="widget" class:empty={!bookmark} class:closed={bookmark && !open}>
        <div class="banner" on:click={() => { if(bookmark && !open) open = true; }}>
            {#if bookmark}
                <Image alt={bookmark.title} src={bookmark.imgUrl} backup={backup_img}/>
                <div class="vignette"></div>
            {/if}
            <div class="title">
                <Scroller speed={10} wait={2000}>
                    {#if bookmark}
                        {bookmark.title}
                    {:else}
                        Select a bookmark to start reading.
                    {/if}
                </Scroller>
            </div>
        </div>
        {#if bookmark && open}
            <div class="content">
                <div class="chapter-actions">
                    <div class="action">
                        <button on:click={() => { openChapter(bookmark.url, bookmark.chapter); }}>Current: {bookmark.chapter}</button>
                    </div>
                    <div class="action">
                        <button>Next: N/A</button>
                    </div>
                </div>
            </div>
            <div class="minimize" on:click={() => { open = false; }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M10 25.5v-3h28v3Z"/></svg>
            </div>
        {/if}
    </div>
{/key}

<style>
    .widget {
        position: relative;
        width: 20rem;
        background-color: #0c0c0c;
        pointer-events: auto;
        border-radius: 10px;
        margin: .75rem 0;
        display: flex;
        flex-direction: column;
        border: 1px solid #0c0c0c;
    }

    .widget.closed .banner, .widget.empty .banner {
        height: 3em;
        border-radius: 10px;
    }

    .widget.closed:not(.empty) .banner {
        cursor: pointer;
    }

    .banner {
        position: relative;
        overflow: clip;
        height: 5em;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .title {
        background: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
    }

    .title :global(.scroller > div) {
        text-shadow: -1px 1px 0 #000,
                      1px 1px 0 #000,
                      1px -1px 0 #000,
                     -1px -1px 0 #000;
    }

    .banner > .vignette {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(circle,transparent 50%,black 110%);
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
        background: none;
        padding: 0.5rem;
    }

    .content > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    .chapter-actions {
        display: flex;
        justify-content: space-around;
    }

    .chapter-actions .action {
        display: flex;
        margin: 0 1rem;
    }

    .chapter-actions .action button {
        white-space: nowrap;
    }

    .minimize {
        position: absolute;
        top: 0;
        right: 0.5em;
        height: 1.5em;
        width: 1.5em;
        background: none;
        fill: white;
        border-radius: 100%;
        cursor: pointer;
        transition: fill 0.2s;
    }

    .minimize:hover {
        filter: brightness(0.5);
    }
</style>