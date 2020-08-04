<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { cubicOut, cubicInOut } from 'svelte/easing';
    import { replicant } from '../utils/nodecg'
    import { fromRelative } from './utils/units';

    let windowHeight: number;
    let windowWidth: number;
    $: fromvh = (v: number) => fromRelative(windowHeight, v);
    $: fromvw = (v: number) => fromRelative(windowWidth, v);

    const programName = replicant('program.name', '');
    const issue = replicant('program.issue', '');

    const headlines = replicant<string[]>('main-headlines', []);
    const current = replicant('main-headlines.current', -1);
</script>

<style lang="scss">
    @use 'utils/layout';

    $safe-area: 5vw;

    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .app {
        @include layout.force-fullscreen;
        box-sizing: border-box;
        padding: {
            left: $safe-area;
            right: $safe-area;
            bottom: 12.5vh + 1.5vh;
        }
        display: flex;
        flex-flow: row wrap-reverse;
        align-items: flex-start;
        align-content: flex-start;
        background: linear-gradient(to top, rgba(black, 0.67) 5%, transparent 34%);
        overflow: hidden;
    }

    .app__headlines {
        position: relative;
    }

    .headline {
        position: absolute;
        bottom: 0;
        margin-left: -15vh;
        height: 8.62vh * 2; /* force two-line */

        display: flex;
        align-items: center;
        color: white;

        transform: translateX(85vw);
        transition: transform 1.25s cubic-bezier(0.4, 0, 0.2, 1);

        &.current {
            transform: translateX(0);

            :global(pre) {
                opacity: 1;
                transition: opacity 0.5s 1s;

                :global(strong) {
                    font-weight: 600;
                    transition: font-weight 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.25s;
                }
            }

            :global(.arrow) {
                background-color: white;
                transition: background-color 1.25s;
            }
        }

        .arrow {
            box-sizing: border-box;
            width: 12.5vh;
            height: 12.5vh;

            border: 0.25vh solid white;
            border-radius: 1vh;
            font: {
                family: 'Material Icons';
                size: 9vh;
            }
            line-height: 1;
            padding: (12.5vh - 9vh) / 2;
            margin-right: 4.5vh;
        }
    }

    pre {
        margin: 0;
        font: {
            family: 'Roboto Slab', serif;
            size: 8.33vh;
        }
        line-height: 8.62vh;
        opacity: 0;

        :global(strong) {
            font-weight: 400;
        }
    }

    .bug {
        position: absolute;
        bottom: 5.5vh;
        height: 4vh;
        color: white;
        display: flex;

        & > :global(*) {
            padding: {
                left: 2vh;
                right: 2vh;
            }
            line-height: 4vh;
        }

        &__program {
            border-right: 0.125vh solid white;
            font: {
                family: 'Roboto Slab', serif;
                weight: 600;
                size: 3.14vh;
            }
        }

        &__issue {
            font: {
                family: 'Open Sans', sans;
                size: 2.39vh;
            }
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transform: translateY(0.15vh); /* align with baseline  */
        }
    }
</style>

<div class="app" in:fade>
    <!-- Headlines and screen bug should appear differently -->
    <div class="app__headlines" style="visibility: { $current >= 0 ? 'visible' : 'hidden' }">
        {#each [$current, $current + 1] as number (number)}
            <div
                class="headline"
                class:current={number === $current}
                out:fly={{ x: fromvw(-25), easing: cubicInOut }}
                in:fly={{ x: fromvw(20), easing: cubicInOut, opacity: 1, duration: 1250 }}
            >
                <div class="arrow">arrow_forward</div>
                <pre class="embolden">{@html $headlines[number] || ''}</pre>
            </div>
        {/each}
    </div>
    {#if $current >= 0}
        <div class="bug" transition:fly={{ y: fromvh(2.5), easing: cubicOut }}>
            <div class="bug__program">{$programName}</div>
            <div class="bug__issue">{$issue}</div>
        </div>
    {/if}
</div>
