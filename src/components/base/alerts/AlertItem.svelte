<script lang="ts">
    import { onMount, createEventDispatcher, onDestroy } from "svelte";
    import Progress from "../Progress.svelte";
    import type { Alert } from "./../types";

    const dispatch = createEventDispatcher();

    export let alert: Alert;
    export let lifetime = 5000;
    export let interval = 25;

    let start = -1;
    let end = -1;
    let current = -1;

    let intervalId: NodeJS.Timer;

    onMount(() => {
        intervalId = setInterval(update, interval);
        return () => clearInterval(intervalId);
    });

    function update() {
        current = Date.now();
        if(start == -1) {
            start = current;
            end = start + lifetime;
        }
        if(end <= current) {
            dispatch('expire');
        }
    }
</script>

<div class="alert {alert.type}">
    <div class="title">{alert.title}</div>
    <div class="message">{alert.message}</div>
    <Progress progress={(current - start) / (end - start) * 100}/>
</div>

<style>
    .alert {
        padding: 1em;
        pointer-events: auto;
        border-radius: 1rem;
    }

    .debug {
        background-color: #c1c1c1;
        color: black;
    }

    :global(.progress) {
        height: 1rem;
    }
</style>