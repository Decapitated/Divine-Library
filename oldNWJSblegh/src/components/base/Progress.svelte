<script lang="ts">
    export let progress = 0; // Percent

    let bar: HTMLDivElement;
</script>

<div class="progress">
    <div class="bar" style:width="{progress}%"></div>
</div>

<style>
    * {
        pointer-events: none;
    }

    .progress {
        display: flex;
        background-color: transparent !important;
    }

    .bar {
        background-color: white;
    }
</style>