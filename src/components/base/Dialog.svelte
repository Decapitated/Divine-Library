<script lang="ts">
    import A11yDialog from 'a11y-dialog'
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    let element: Element;
    let dialog: A11yDialog;

    onMount(() => {
        dialog = new A11yDialog(element);
        dialog.on('show', () => {
            document.documentElement.style.overflowY = 'hidden';
        });
        dialog.on('hide', () => {
            document.documentElement.style.overflowY = '';
        });
    });

    export function show() {
        dialog.show();
    }

    export function hide() {
        dialog.hide();
    }
    
</script>
<div class="dialog-container" role="alertdialog" aria-hidden="true" bind:this={element}>
    <div class="dialog-overlay"></div>
    <div class="dialog-content" role="document">
        <slot></slot>
    </div>
</div>

<style>
    /**
    * 1. Make the dialog container, and its child overlay spread across
    *    the entire window.
    */
    .dialog-container,
    .dialog-overlay {
        position: fixed; /* 1 */
        top: 0; /* 1 */
        right: 0; /* 1 */
        bottom: 0; /* 1 */
        left: 0; /* 1 */
    }

    /**
    * 1. Make sure the dialog container and all its descendants sits on
    *    top of the rest of the page.
    * 2. Make the dialog container a flex container to easily center the
    *    dialog.
    */
    .dialog-container {
        z-index: 2; /* 1 */
        display: flex; /* 2 */
    }

    /**
    * 1. Make sure the dialog container and all its descendants are not
    *    visible and not focusable when it is hidden.
    */
    .dialog-container[aria-hidden='true'] {
        display: none; /* 1 */
    }

    /**
    * 1. Make the overlay look like an overlay.
    */
    .dialog-overlay {
        background-color: rgba(43, 46, 56, 0.9); /* 1 */
    }

    /**
    * 1. Vertically and horizontally center the dialog in the page.
    * 2. Make sure the dialog sits on top of the overlay.
    * 3. Make sure the dialog has an opaque background.
    */
    .dialog-content {
        margin: auto; /* 1 */
        z-index: 2; /* 2 */
        position: relative; /* 2 */
    }
</style>