<script lang="ts">

    let intId: NodeJS.Timer;

    let movElem: HTMLElement;

    //export let grabber: HTMLElement;

    let downX = 0;
    let downY = 0;

    let mouseX = 0;
    let mouseY = 0;

    let isDown = false;

    function down() {
        if(!isDown) {
            clearInterval(intId);
            return;
        }
        const contRect = document.body.getBoundingClientRect();
        const movRect = movElem.getBoundingClientRect();

        const x = mouseX - downX;
        const y = mouseY - downY;

        const maxX = contRect.width - movRect.width;
        const maxY = contRect.height - movRect.height;
        if((0 < x && x < maxX) && (0 < y && y < maxY)) {
            movElem.style.top = y + 'px';
            movElem.style.left = x + 'px';
        }
    }
</script>

<svelte:body
on:mousemove={(e) => {
    mouseX = e.x;
    mouseY = e.y;
}}
on:mouseup={() => {
    isDown = false;
}}/>
<div class="container">
    <div bind:this={movElem} class="elem" on:mousedown={(e) => {
        const movRect = movElem.getBoundingClientRect();
        downX = e.x - movRect.left;
        downY = e.y - movRect.top;
        isDown = true;
        intId = setInterval(down, 10);
    }}>
        <slot name="element"></slot>
    </div>
</div>

<style>
    .container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: none;

        pointer-events: none;
    }

    .elem {
        position: absolute;
        top: 5em;
        left: 0;
        pointer-events: auto;
    }
</style>