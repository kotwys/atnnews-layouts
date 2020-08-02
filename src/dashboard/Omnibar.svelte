<script lang="ts">
    import type { Asset } from '../types/asset';
    import { replicant } from '../utils/nodecg';

    const shown = replicant<boolean>('omnibar.shown', false);

    const availableTickers = replicant<Asset[]>('assets:ticker-files', []);
    const currentTicker = replicant<string>('omnibar.ticker-file', '');

    const programNameRepl = replicant<string>('program-name', '');
    let programName = '';
</script>

<style lang="scss">
    :global(body) {
        margin: 0;
        padding: 0;
    }

    .app {
        padding: 15px;

        :global(.mdc-button),
        :global(.mdc-text-field) {
            width: 100%;
        }
    }

    section {
        margin-bottom: 10px;
    }

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
            Program Name
            <input type="text" bind:value={programName} />
        </label>
        <button
            on:click={() => programNameRepl.set(programName)}
            disabled={$programNameRepl === programName}
        >
            Update
        </button>
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
