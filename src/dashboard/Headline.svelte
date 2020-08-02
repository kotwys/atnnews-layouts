<script lang="ts">
    import { replicant } from '../utils/nodecg';

    const shown = replicant('headline.shown', false);
    const content = replicant('headline.content', '');
    let headline = '';
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
            Headline:
            <input type="text" bind:value={headline} />
        </label>
        <button on:click={() => content.set(headline)} disabled={$content === headline}>
            Update
        </button>
    </section>
</div>
