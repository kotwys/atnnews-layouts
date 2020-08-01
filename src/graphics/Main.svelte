<script lang="ts">
    import Omnibar from './main/Omnibar.svelte';
    import { replicant } from '../utils/nodecg';

    const omnibarShown = replicant<boolean>('omnibar.shown', false);
    const program = replicant<string>('program-name', '');
</script>

<style lang="scss">
    $safe-area: 5vw;

    :global(body) {
        margin: 0;
        padding: 0 {
            left: $safe-area;
            right: $safe-area;
        }
        overflow: hidden;
    }
</style>

<div>
    {#if $omnibarShown}
        <Omnibar program={$program} />
    {/if}
</div>
