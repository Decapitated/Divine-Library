<script lang="ts">
    let toggled = false;
</script>

<div class="fb-container" class:toggled>
    <div class="options">
        <slot name="options">
            <button>N/A</button>
        </slot>
    </div>
    <div>
        <button class="toggle" on:click={() => toggled = !toggled}>
            <slot name="toggle-text" {toggled}>{(toggled)? '-' : '+'}</slot>
        </button>
    </div>
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
        margin-right: 1.1rem;
        z-index: 98;
        background: none !important;
        pointer-events: none;
    }

    .options {
        display: flex;
        flex-direction: column;
        height: fit-content;
        transition: height 0.15s, opacity 0.15s;
    }

    .fb-container:not(.toggled) .options {
        display: none;
        height: 0;
        opacity: 0;
    }

    .fb-container :global(button) {
        border: 1px solid white;
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        background-color: black;
        color: white;
        pointer-events: auto;
        cursor: pointer;
        margin: 0.5rem 0;
        transition: filter 0.15s;
    }

    .fb-container.toggled .toggle {
        background-color: red;
        color:  white;
    }

    .fb-container :global(button):hover {
        filter: invert(100%);
    }

    .fb-container :global(button):active {
        filter: invert(75%);
    }
</style>