<script lang="ts">
    import type { Asset } from '../types/asset';
    import { replicant } from '../utils/nodecg';

    const shown = replicant<boolean>('omnibar.shown', false);

    const availableTickers = replicant<Asset[]>('assets:ticker-files', []);
    const currentTicker = replicant('omnibar.ticker-file', '');
</script>

<style lang="scss">
    @use './styles';

    .controls {
        display: flex;
    }

    label {
        display: block;
    }

    button {
        display: block;
        width: 100%;
    }
</style>

<div class="app">
    <section>
        <div class="controls">
            <button on:click={() => ($shown = true)} disabled={$shown}>Show</button>
            <button on:click={() => ($shown = false)} disabled={!$shown}>Hide</button>
        </div>
    </section>
    <section>
        <label>
            Ticker file
            <select bind:value={$currentTicker}>
                <option value="">Select ticker</option>
                {#each $availableTickers as ticker}
                    <option value={ticker.url}>{ticker.base}</option>
                {/each}
            </select>
        </label>
    </section>
</div>
