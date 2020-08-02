<script lang="ts">
    import { rotate } from '../utils/transition';

    export let text: string;

    let embolden = false;
    let stretch = true;
    function introStart() {
        setTimeout(() => {
            stretch = false;
            embolden = true;
        }, 100); // needed for animation to play
    }
</script>

<style lang="scss">
    @use '../utils/shapes';

    $decelerated: cubic-bezier(0, 0, 0.2, 1);

    .headline {
        position: relative;
        box-sizing: border-box;
        height: 10vh;
        padding: {
            top: 0.75vh;
            left: 3vh;
            right: 3.5vh;
        }
        @include shapes.bubble(1vh);
        overflow: hidden;

        font: {
            family: 'Roboto Slab', serif;
            weight: 400;
            size: 5.56vh;
        }
        color: white;
        background-color: #140a0ea0;

        :global(strong) {
            font-weight: 400;
        }

        .embolden :global(strong) {
            font-weight: 600;
            transition: font-weight 0.5s $decelerated 0.5s;
        }
    }

    .headline__bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5vh;
        background-color: #5500d4;

        transition: transform 0.5s $decelerated 0.5s;
        transform-origin: left;

        &.stretch {
            transform: scaleX(0);
        }
    }
</style>

<div class="headline" transition:rotate={{ origin: 'left' }} on:introstart={introStart}>
    <div class:embolden>
        {@html text}
    </div>
    <div class="headline__bar" class:stretch />
</div>
