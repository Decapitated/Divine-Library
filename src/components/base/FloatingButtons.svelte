<script lang="ts">
    let toggled = false;
</script>

<div class="fb-container">
    <div class="options" class:toggled>
        <slot name="options">
            <button>^</button>
        </slot>
    </div>
    <button class="toggle" on:click={() => toggled = !toggled}>{(toggled)? '-' : '+'}</button>
</div>

<style>
    .fb-container {
        display: flex;
        flex-direction: column;
        justify-content: end;

        position: fixed;
        right: 0;
        bottom: 0;
        height: fit-content;
        width: fit-content;
        z-index: 100;
        background: none !important;
        pointer-events: none;
    }

    .options {
        display: flex;
        flex-direction: column;
        height: fit-content;
        transition: height 0.15s;
    }

    .options:not(.toggled) {
        height: 0;
        opacity: 0;
    }

    .fb-container :global(button) {
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        background-color: white;
        color: black;
        pointer-events: auto;
        cursor: pointer;
        margin: 0.5rem 1rem;
    }

    button:hover {
        filter: invert(100%);
    }
</style>