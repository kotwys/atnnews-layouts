<script lang="ts">
    import Ticker from './Ticker.svelte';
    import { rotate, weight } from '../utils/transition';

    export let program: string;
    const pull = () =>
        Promise.resolve(Array(4).fill('Lorem ipsum dolor sit amet consectetur adipisicing elit.'));
</script>

<style lang="scss">
    .omnibar {
        position: absolute;
        bottom: 0;

        width: 90vw;
        height: 10vh;
        border-radius: 1vh 1vh 0 0;
        background-color: #140a0ea0;
    }

    .omnibar__content {
        height: 5vh;
        display: flex;
        padding-left: 2vh;
    }

    .omnibar__title {
        color: #ffcc00;
        font: {
            family: 'Roboto Slab', serif;
            size: 3.14vh;
            weight: 600;
        }
        line-height: 5vh;
        vertical-align: -0.3vh;
        margin-right: 2vh;
        will-change: font-weight;
    }

    .omnibar__ticker {
        flex-basis: 100%;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(black, 0.2), transparent 5%);
    }
</style>

<div transition:rotate="{{ origin: 'bottom' }}" class="omnibar">
    <div class="omnibar__content">
        <div class="omnibar__title" in:weight="{{ from: 300, delay: 500 }}">{program}</div>
        <div class="omnibar__ticker">
            <Ticker {pull} />
        </div>
    </div>
</div>
