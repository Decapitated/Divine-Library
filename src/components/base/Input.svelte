<script lang="ts">
    export let placeholder: string;
    let value: string;
</script>

<div class="input">
    <input
        id="input"
        class:valid = {value != null && value.length > 0}
        type="text" bind:value>
    <label for="input">{placeholder}</label>
</div>

<style>
    .input {
        display: flex;
        width: 100%;
        position: relative;
        height: min-content;
        z-index: 2;
        background-color: inherit;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
    }

    .input > input {
        width: 100%;
        height: 100%;

        padding: 0.5rem 0.75rem;

        --blue: 0, 123, 255;
        --grey: 211, 211, 211;
        --border-color: var(--grey);

        border: 1px solid rgb(var(--border-color));
        outline: none;
        border-radius: 0.5rem;
        background-color: inherit;
        color: inherit;
    }

    .input > label {
        position: absolute;
        margin: 0.5rem 0.75rem;
        top: 0rem;
        left: 0rem;
        background-color: inherit;
        line-height: 1rem;
        font-size: 1rem;
        pointer-events: none;
        transition: all 0.15s;
    }
    .input > input:focus ~ label, .input > input.valid ~ label {
        top: -1rem;
        font-size: 0.75rem;
        padding: 0 0.25rem;
    }

    input:focus, input:focus-visible, input:valid {
        --border-color: var(--blue);
        border-width: 2px;
    }
</style>