<script lang="ts">
    import Omnibar from './main/Omnibar.svelte';
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
    <Omnibar program="События" />
</div>
