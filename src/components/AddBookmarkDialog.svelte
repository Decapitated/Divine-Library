<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Input from './base/Input.svelte';
    import Dialog from './base/Dialog.svelte';
    import { parseChapterUrl } from './../library/utilities';
    import type { Bookmark } from './../library/types';
    
    const dispatch = createEventDispatcher();

    const newBookmark = {
        title: undefined,
        chapter: undefined,
        url: undefined,
        imgUrl: undefined,
    } as Bookmark;

    let dialog: Dialog;

    let chapterUrl = '';
    $: {
        const parsedUrl = parseChapterUrl(chapterUrl);
        if(parsedUrl !== null) {
            newBookmark.url = parsedUrl.source;
            newBookmark.chapter = parsedUrl.chapter;
        }
    }

    function checkBookmark() {
        if(newBookmark.title !== undefined && newBookmark.title.length > 0) {
            if(newBookmark.imgUrl !== undefined && newBookmark.imgUrl.length > 0) {
                if(newBookmark.chapter !== undefined && newBookmark.imgUrl !== undefined) {
                    return true;
                }
            }
        }
        return false;
    }

    function addBookmark() {
        if(checkBookmark()) dispatch('add', newBookmark);
    }

    export function show() {
        dialog.show();
    }

    export function hide() {
        dialog.hide();
    }
</script>

<Dialog bind:this={dialog}>
    <div class="add-chapter-dialog">
        <Input placeholder="Title" bind:value={newBookmark.title}></Input>
        <Input placeholder="Url" bind:value={chapterUrl}></Input>
        <Input placeholder="Cover Image" bind:value={newBookmark.imgUrl}></Input>
        <button type="button" on:click={addBookmark}>Add Bookmark</button>
    </div>
</Dialog>

<style>
    .add-chapter-dialog {
        display: flex;
        flex-direction: column;
        background-color: #121212;
        border-radius: 0.5rem;
        padding: 1rem;
    }
</style>