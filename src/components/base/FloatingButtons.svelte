<script lang="ts">
    let toggled = false;

    export function toggle() {
        toggled = !toggled
    }
</script>

<div class="fb-container" class:toggled>
    <div class="options" on:click={toggle}>
        <slot name="options">
            <button>N/A</button>
        </slot>
    </div>
    <div class="toggle">
        <button class="toggle" on:click={toggle}>
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
        margin: 0.5rem 1.5rem;
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
        border: none;
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        background-color: black;
        color: white;
        fill: white;
        font-weight: bold;
        pointer-events: auto;
        cursor: pointer;
        padding: 0;
        transition: filter 0.15s;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fb-container div.toggle {
        background: none;
        border-radius: 100%;
        border: none;
    }

    .fb-container.toggled button.toggle {
        background-color: red;
    }

    .fb-container :global(button):hover {
        filter: invert(100%);
    }

    .fb-container :global(button):active {
        filter: invert(75%);
    }

    .fb-container :global(svg) {
        background: none;
    }
</style>