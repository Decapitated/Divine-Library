<script lang="ts">
    import { createEventDispatcher, getContext } from 'svelte';
    import Input from './base/Input.svelte';
    import Dialog from './base/Dialog.svelte';
    import { parseChapterUrl } from './../library/utilities';
    import type { Bookmark } from './../library/types';

    import { APP_CONTEXT_KEY, ContextType } from './../App.svelte';
    import { AlertTypes } from './base/types';

    const { alert } = getContext<ContextType>(APP_CONTEXT_KEY);

    const dispatch = createEventDispatcher();

    type FieldError = {  [field: string]: boolean;  };

    const newBookmark = {
        title: undefined,
        chapter: undefined,
        url: undefined,
        imgUrl: undefined,
    } as Bookmark;

    const fieldErrors = {
        title: false,
        url: false,
        imgUrl: false
    } as FieldError;

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
        fieldErrors.title = newBookmark.title == undefined || newBookmark.title.length <= 0;
        fieldErrors.url = newBookmark.url === undefined || newBookmark.chapter === undefined;
        fieldErrors.imgUrl = newBookmark.imgUrl === undefined || newBookmark.imgUrl.length <= 0;
        return Object.values(fieldErrors).indexOf(true) == -1;
    }

    function addBookmark() {
        if(checkBookmark()) {
            dispatch('add', newBookmark);
        }else{
            alert({
                title: 'ERROR',
                message: 'Bookmark information entered is invalid.',
                type: AlertTypes.Error
            });
        }
    }

    export function show() {
        dialog.show();
    }
</script>

<Dialog bind:this={dialog}>
    <div class="add-chapter-dialog">
        <div class="content">
            <Input placeholder="Title" bind:value={newBookmark.title}></Input>
            {#if fieldErrors.title}
                <small>Invalid title.</small>
            {/if}
            <Input placeholder="Url" bind:value={chapterUrl}></Input>
            {#if  fieldErrors.url}
                <small>Invalid chapter url.</small>
            {/if}
            <Input placeholder="Cover Image" bind:value={newBookmark.imgUrl}></Input>
            {#if  fieldErrors.imgUrl}
                <small>Invalid image url.</small>
            {/if}
        </div>
        <div class="actions">
            <button type="button" on:click={addBookmark}>Add</button>
            <button type="button" on:click={() => dispatch('cancel')}>Cancel</button>
        </div>
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

    .add-chapter-dialog > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    .actions {
        display: flex;
        justify-content: space-between;
    }

    small {
        margin-left: 0.5rem;
        color: red;
    }
</style>