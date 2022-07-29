<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import Progress from "../Progress.svelte";
    import type { Alert } from "./../types";
    import { elementVisible } from "./../utilities";

    const dispatch = createEventDispatcher();

    export let alert: Alert;
    export let lifetime = 5000;
    export let interval = 25;

    let start = -1;
    let end = -1;
    let current = -1;

    let enteredViewport = false;
    let intervalId: NodeJS.Timer;

    let element: HTMLDivElement;

    onMount(() => {
        intervalId = setInterval(update, interval);
        return () => clearInterval(intervalId);
    });

    function update() {
        if(enteredViewport){
            current = Date.now();
            if(start == -1) {
                start = current;
                end = start + lifetime;
            }
            if(end <= current) {
                dispatch('expire');
            }
        }else{
            enteredViewport = elementVisible(element);
        }
    }
</script>

<div bind:this={element} class="alert {alert.type}" on:click={() => console.log(element)}>
    <div class="title">{alert.title}</div>
    <div class="message">{alert.message}</div>
    <Progress progress={(current - start) / (end - start) * 100}/>
</div>

<style>
    .alert {
        padding: 0.5rem;
        pointer-events: auto;
        position: relative;
        overflow: hidden;
    }

    :global(.progress) {
        height: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .debug {
        background-color: #c1c1c1;
        color: black;
    }

    .info {
        background-color: #45C639;
        color: white;
    }

    .error {
        background-color: #FA4655;
        color: white;
    }

    .warning {
        background-color: #FCB800;
        color: white;
    }
</style>