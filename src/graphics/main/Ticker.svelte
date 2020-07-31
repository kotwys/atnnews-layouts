<script lang="ts">
    import { onMount, onDestroy, tick } from 'svelte';
    import { px2vh } from '../../utils/units';

    export let speed: number = 15;
    export let pull: () => Promise<string[]>;

    let ticker: HTMLElement;
    let firstLineLength: number;
    const getFirstLength = () => {
        const firstElement = ticker?.firstElementChild as HTMLElement;
        const styles = firstElement && window.getComputedStyle(firstElement);
        firstLineLength =
            styles &&
            px2vh(window.innerHeight, parseFloat(styles.width) + parseFloat(styles.marginRight));
    };

    let lines: string[] = [];
    let translation = 0;
    let loading: Promise<void>;

    async function getLines() {
        lines = [...lines, ...(await pull())];
        loading = null;
    }

    let frameRequest: number;
    let previousFrame: number;

    function step() {
        const currentFrame = performance.now();

        if (lines.length > 0) {
            const delta = (currentFrame - previousFrame) / 1000;
            translation += speed * delta;

            if (firstLineLength && translation >= firstLineLength) {
                lines = lines.slice(1);
                translation -= firstLineLength;
                tick().then(getFirstLength);
            }

            if (lines.length < 4 && !loading) loading = getLines();
        } else {
            if (!loading) loading = getLines();

            translation = -px2vh(window.innerHeight, ticker.clientWidth);
            loading.then(getFirstLength);
        }

        previousFrame = currentFrame;
        frameRequest = requestAnimationFrame(step);
    }

    onMount(() => {
        previousFrame = performance.now();
        step();
    });

    onDestroy(() => {
        frameRequest && cancelAnimationFrame(frameRequest);
    });
</script>

<style lang="scss">
    .ticker {
        height: 100%;
        white-space: nowrap;
        color: white;
        font: {
            family: 'Open Sans', sans;
            size: 2.69vh;
        }

        :global(span) {
            display: inline-block;
            position: relative;
            margin-right: 4.5vh;
            line-height: 5vh;

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 2.17vh;
                right: -4.5vh / 2 - 0.4vh;

                width: 0.8vh;
                height: 0.8vh;
                border-radius: 100%;
                background-color: #ffcc00;
            }
        }
    }
</style>

<svelte:options immutable={true} />
<div class="ticker" style="transform: translateX({-translation}vh)" bind:this={ticker}>
    {#each lines as line}
        <span>{line}</span>
    {/each}
</div>
