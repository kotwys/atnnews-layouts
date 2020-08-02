<script lang="ts">
    import Omnibar from './main/Omnibar.svelte';
    import Headline from './main/Headline.svelte';
    import Nameplate from './main/Nameplate.svelte';
    import { replicant } from '../utils/nodecg';

    import type { ShowNameplateMsg } from '../types/nameplate';

    const omnibarShown = replicant('omnibar.shown', false);
    const program = replicant('program.name', '');

    const headlineShown = replicant('headline.shown', false);
    const headlineContent = replicant('headline.content', '');

    let nameplateShown = false;
    let nameplateData = {};

    function showNameplate({ duration, data }: ShowNameplateMsg) {
        nameplateData = data;
        nameplateShown = true;
        setTimeout(() => (nameplateShown = false), duration * 1000);
    }
    nodecg.listenFor('nameplate.show', showNameplate);
</script>

<style lang="scss">
    @use 'utils/layout';

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
        align-items: flex-start;
        align-content: flex-start;
        @include layout.gap(2.5vh);
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
        {#if nameplateShown}
            <Nameplate {...nameplateData} />
        {/if}
    </div>
</div>
