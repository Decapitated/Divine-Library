<script lang="ts">
    import Image from "./base/Image.svelte";
    import Scroller from "./base/Scroller.svelte";
    import Input from "./base/Input.svelte";
    import { openChapter } from "./../library/library";
    import type { Bookmark, NewChapter } from "./../library/types";
    import { sourceToBaseURL } from "./../library/utilities";

    export let bookmark: Bookmark;
    export let backup_img = '';
    export let newChapter: NewChapter;
    export let open: boolean;
    let edited = {
        title: null,
        chapter: null,
        url: null,
        imgUrl: null
    };
    $: {
        if(bookmark) {
            edited = {
                title: bookmark.title,
                chapter: `${bookmark.chapter}`,
                url: sourceToBaseURL(bookmark.url, bookmark.chapter),
                imgUrl: bookmark.imgUrl
            }
        }
    };

    function isEdited() {
        if(bookmark.title != edited.title ||
           `${bookmark.chapter}` != edited.chapter ||
           sourceToBaseURL(bookmark.url, bookmark.chapter) != edited.url ||
           bookmark.imgUrl != edited.imgUrl) return true;
        return false;
    }
</script>

{#key bookmark}
    <div class="widget" class:empty={!bookmark} class:closed={bookmark && !open}>
        <div class="banner">
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
        {#if bookmark}
            {#if open}
                <div class="content">
                    <div class="chapter-actions">
                        <div class="action">
                            <button on:click={() => {
                                openChapter(bookmark.url, bookmark.chapter);
                            }}>
                                Current: {bookmark.chapter}
                            </button>
                        </div>
                        {#if newChapter && newChapter._id == bookmark._id}
                            <button on:click={() => {
                                openChapter(bookmark.url, newChapter.chapter);
                            }}>
                                Next: {newChapter.chapter}
                            </button>
                        {:else}
                            <button>Next: N/A</button>
                        {/if}
                    </div>
                    <div class="field-inputs">
                        <Input placeholder="Title" bind:value={edited.title}></Input>
                        <Input placeholder="Chapter" bind:value={edited.chapter}></Input>
                        <Input placeholder="Url" bind:value={edited.url}></Input>
                        <Input placeholder="Image Url" bind:value={edited.imgUrl}></Input>
                    </div>
                </div>
            {/if}
            <!--Maximize/Minimize button.-->
            <div class="minimize" on:click={() => { open = !open; }}>
                {#if open}
                    <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M10 25.5v-3h28v3Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
                {/if}
            </div>
        {/if}
    </div>
{/key}

<style>
    .widget {
        position: relative;
        width: 20rem;
        background-color: black;
        pointer-events: auto;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
    }

    .widget.closed .banner, .widget.empty .banner {
        height: 3em;
        border-radius: 10px;
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
        right: 0;
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