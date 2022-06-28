<script lang="ts">
    // Speed and Wait Time in ms.
    export let speed: number, wait: number;

    let interval_id = null, timeout_id = null;
    let direction = true; // True = Scrolling moving left.

    let scroller: HTMLDivElement;
    let inner: HTMLDivElement;

    function enter() {
        interval_id = setInterval(scroll, speed);
    }

    function leave() {
        clear();
        scroller.scroll(0, 0);
    }

    function clear() {
        clearTimeout(timeout_id);
        timeout_id = null;

        clearInterval(interval_id);
        interval_id = null;
    }

    function scroll() {
        const parent = scroller.getBoundingClientRect();
        const child =  inner.getBoundingClientRect();

        if(parent.width < child.width) {
            scroller.scrollBy(direction ? 1 : -1, 0);
            if((!direction && child.left >= parent.left-1) || (direction && child.right <= parent.right+1)) {
                if(timeout_id == null) {
                    timeout_id = setTimeout(() => {
                        direction = !direction;
                        timeout_id = null;
                    }, wait);
                }
            }
        }
    }
</script>

<div class="scroller"
    bind:this={scroller}
    on:mouseenter={enter}
    on:mouseleave={leave}>
        <div bind:this={inner}><slot></slot></div>
    </div>

<style>
    .scroller {
        overflow-x: hidden;
    }

    .scroller > div {
        white-space: nowrap;
        width: fit-content;
    }
</style>