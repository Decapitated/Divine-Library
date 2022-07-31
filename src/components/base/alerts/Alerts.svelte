<script lang="ts">
    import type { Alert } from './../types';
    import AlertItem from './AlertItem.svelte';

    let alerts = [];
    let lifetimes = [];

    export function alert(alert: Alert, lifetime = -1) {
        const key = crypto.randomUUID();
        alerts[key] = alert;
        lifetimes[key] = lifetime;
    }
</script>

<div class="container">
    <div class="column">
        {#each Object.keys(alerts) as key (key)}
            <AlertItem alert={alerts[key]} lifetime={lifetimes[key]} on:expire={() => {
                delete alerts[key];
                delete lifetimes[key];
                alerts = alerts;
            }} />
        {/each}
    </div>
</div>

<style>
    .container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        background: none !important;
        pointer-events: none;
    }

    .column {
        height: 100%;
        max-width: 20rem;
        display: flex;
        flex-direction: column-reverse;
        justify-content: end;
    }

    :global(.alert) {
        border-left: 2.5px solid white;
        border-radius: 0 0.5rem 0.5rem 0;
        margin-bottom: 0.25rem;
    }
</style>