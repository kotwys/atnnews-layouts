<script lang="ts">
    import Omnibar from './main/Omnibar.svelte';
    import Headline from './main/Headline.svelte';
    import { replicant } from '../utils/nodecg';

    const omnibarShown = replicant<boolean>('omnibar.shown', false);
    const program = replicant<string>('program-name', '');

    const headlineShown = replicant('headline.shown', false);
    const headlineContent = replicant('headline.content', '');
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

    .app__content {
        box-sizing: border-box;
        height: 100vh;
        padding: {
            bottom: 12.5vh;
        }

        display: flex;
        flex-flow: row wrap-reverse;
    }
</style>

<div>
    {#if $omnibarShown}
        <Omnibar program={$program} />
    {/if}
    <div class="app__content">
        {#if $headlineShown}
            <Headline text={$headlineContent} />
        {/if}
    </div>
</div>
