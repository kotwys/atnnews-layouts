<script lang="ts">
    import { replicant } from '../utils/nodecg';

    let name = '';
    let position = '';
    let shown = false;

    function show(duration: number) {
        if (!name) return;

        shown = true;
        nodecg.sendMessage('nameplate.show', {
            duration,
            data: { name, position }
        });
        setTimeout(() => shown = false, duration * 1000);
    }
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
        <label>
            Name:
            <input type="text" bind:value={name} />
        </label>
        <label>
            Position:
            <input type="text" bind:value={position} />
        </label>
    </section>
    <section>
        <div class="controls">
            <button on:click={() => show(5)} disabled={shown}>5s</button>
            <button on:click={() => show(10)} disabled={shown}>10s</button>
            <button on:click={() => show(15)} disabled={shown}>15s</button>
        </div>
    </section>
</div>
