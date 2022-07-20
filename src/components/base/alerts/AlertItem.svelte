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
            enteredViewport = elementInViewport() && elementVisible();
        }
    }

    // Credit: https://awik.io/check-if-element-is-inside-viewport-with-javascript/
    // Not that I couldn't do it. I'm just too lazy. And this works perfectly.
    function elementInViewport(): boolean {
        const bounding = element.getBoundingClientRect();
        return bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }

    type Point = {
        x: number;
        y: number;
    };

    // Check four sides. Could do four corners, but doesn't work with border-radius.
    // Child elements that overlap need pointer-events: none; or else it'll return false;
    function elementVisible(): boolean {
        const bounding = element.getBoundingClientRect();
        const middle = { x: bounding.left + (bounding.right - bounding.left)/2, y: bounding.top + (bounding.bottom - bounding.top)/2 } as Point;
        const points = [
            { x: middle.x, y: bounding.top+1 },     // Top-Left
            { x: bounding.right-1, y: middle.y },    // Top-Right
            { x: middle.x, y: bounding.bottom-1 }, // Bottom-Right
            { x: bounding.left+1, y: middle.y },     // Bottom-Left
        ] as Point[];
        let valid = true;
        points.forEach((point) => {
            if(document.elementFromPoint(point.x, point.y) !== element) valid = false;
        });
        return valid;
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