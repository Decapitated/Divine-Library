<script lang="ts">
    export let speed: number, wait: number;

    let interval_id, timeout_id;
    let direction = true; // True = Scrolling moving left.

    let scroller: HTMLDivElement;

    function enter() {
        interval_id = setInterval(scroll, speed);
    }

    function leave() {
        clearTimeout(timeout_id);
        clearInterval(interval_id);
        scroller.scroll(0, 0);
    }

    function scroll() {
        const scrollLength = scroller.scrollWidth - scroller.clientWidth;

        if(scroller.clientWidth < scroller.scrollWidth) {
            scroller.scrollBy(direction ? 1 : -1, 0);
            // Change directions if at the end.
            if((direction && scroller.scrollLeft >= scrollLength) || (!direction && scroller.scrollLeft <= 0)) {
                clearTimeout(timeout_id);
                clearInterval(interval_id);
                direction = !direction;
                timeout_id = setTimeout(() => {
                    interval_id = setInterval(scroll, speed);
                }, wait);
            }
        }
    }
</script>

<div class="scroller"
    bind:this={scroller}
    on:mouseenter={enter}
    on:mouseleave={leave}>
    <slot></slot>
</div>

<style>
    .scroller {
        white-space: nowrap;
        overflow-x: hidden;
    }
</style>