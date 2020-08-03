<script lang="ts">
    import { replicant } from '../utils/nodecg';

    let count: number = 0;
    let headlines: string[] = [];

    const headlinesRepl = replicant<string[]>('main-headlines', []);
    const current = replicant('main-headlines.current', -1);
</script>

<style lang="scss">
    @use './styles';

    label {
        display: block;
    }

    button {
        display: block;
        width: 100%;
    }

    .editor {
        height: 200px;
        overflow-y: scroll;
    }

    .controls {
        display: flex;
    }
</style>

<div class="app">
    <section>
        <label>
            Count:
            <input type="number" bind:value={count} on:blur={() => headlines.length = count} />
        </label>
    </section>
    <section>
        <div class="editor">
            {#each headlines as headline, i (i)}
                <label>
                    {i + 1}:
                    <textarea bind:value={headline} rows={2} wrap="off"></textarea>
                </label>
            {/each}
        </div>
    </section>
    <section>
        <div class="controls">
            {#if $current == -1}
                <button on:click={() => $current = 0}>Start</button>
            {:else}
                <button on:click={() => $current = -1}>Stop</button>
            {/if}
            <button disabled={$current < 0 || $current >= $headlinesRepl.length - 1} on:click={() => $current++}>Next</button>
            <button on:click={() => $headlinesRepl = headlines}>Update</button>
        </div>
    </section>
</div>
