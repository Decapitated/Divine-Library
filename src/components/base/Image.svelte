<script lang="ts">
    import { onMount } from "svelte";

    export let src: string;
    export let backup = '';
    export let alt = '';

    let image: HTMLImageElement;
    onMount(() => {
        image.onerror = (e) => {
            if(image.src == src && backup != '')
                image.src = backup;
        };
        image.src = src;
    });
</script>

<img bind:this={image} alt={alt}/>