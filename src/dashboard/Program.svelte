<script lang="ts">
    import { replicant } from '../utils/nodecg';

    const programRepl = replicant('program.name', '');
    const issueRepl = replicant('program.issue', '');
    const startRepl = replicant('program.start', '');

    let program = '';
    let issue = '';
    let start = '';

    function update() {
        if (!program || !issue || !start) return;

        $programRepl = program;
        $issueRepl = issue;
        $startRepl = start;
    }
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
</style>

<div class="app">
    <label>
        Program Name:
        <input type="text" bind:value={program} />
    </label>
    <label>
        Issue:
        <input type="text" bind:value={issue} />
    </label>
    <label>
        Start time:
        <input type="time" bind:value={start} />
    </label>
    <button on:click={update}>Update</button>
</div>
