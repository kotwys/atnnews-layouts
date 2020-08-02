<script lang="ts">
    import { replicant } from '../utils/nodecg';

    const programRepl = replicant('program.name', '');
    const issueRepl = replicant('program.issue', '');

    let program = '';
    let issue = '';

    function update() {
        if (!program || !issue) return;

        $programRepl = program;
        $issueRepl = issue;
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
    <button on:click={update}>Update</button>
</div>
