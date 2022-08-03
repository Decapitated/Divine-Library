<script lang="ts">
    import type { Bookmark } from "./../library/types";
    import Image from "./base/Image.svelte";

    export let bookmark: Bookmark;
    export let backup_img = '';

    let open = false;
</script>

<div class="widget" class:open>
    <div class="banner">
        <Image alt={bookmark.title} src={bookmark.imgUrl} backup={backup_img}/>
    </div>
    <div class="content">
        <div></div>
    </div>
</div>

<style>
    .widget {
        width: 30rem;
        height: 40rem;
        border-radius: 10px;
    }
</style>