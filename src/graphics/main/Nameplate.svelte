<script lang="ts">
    import { rotate } from '../utils/transition';

    export let name: string;
    export let position: string = '';
</script>

<style lang="scss">
    @use '../utils/shapes';

    .nameplate {
        @include shapes.bubble(1vh);
        background: linear-gradient(90deg, #310046, #500071);
        color: white;

        padding: {
            top: 1.25vh;
            left: 2vh;
            right: 2.25vh;
            bottom: 1.9vh;
        }
    }

    .nameplate__name {
        font: {
            family: 'Roboto Slab', serif;
            weight: 600;
            size: 3.07vh;
        }
        line-height: 3.18vh;
        margin-bottom: 0.75vh;

        &:last-child {
            margin: 0;
        }
    }

    .nameplate__position {
        font: {
            family: 'Open Sans', sans;
            size: 2.69vh;
        }
        line-height: 2.95vh;
    }
</style>

<div class="nameplate" transition:rotate={{ origin: 'left' }}>
    <div class="nameplate__name">{name}</div>
    {#if position != ''}
        <div class="nameplate__position">{position}</div>
    {/if}
</div>
