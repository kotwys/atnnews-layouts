<script lang="ts">
    import { readable, derived } from 'svelte/store';
    import moment, { duration } from 'moment';
    import { replicant } from '../utils/nodecg';

    const pad = (n: number) => n.toString().padStart(2, '0');

    const start = derived(replicant('program.start', ''), ($time) => moment($time, 'HH:mm', true));
    const now = readable(moment(), (set) => {
        let timeout;
        const loop = () => {
            set(moment());
            timeout = setTimeout(loop, 100);
        };
        timeout = setTimeout(loop, 100);

        return () => clearTimeout(timeout);
    });
    const remaining = derived([start, now], ([$start, $now]) => duration($start.diff($now)));

    const issue = replicant('program.issue', '');

    const text = derived([remaining, issue], ([$remaining, $issue]) => {
        if ($remaining.asMilliseconds() > 1000) {
            return `${pad(~~$remaining.asMinutes())}:${pad($remaining.seconds())}`;
        } else {
            return $issue;
        }
    });
</script>

<style lang="scss">
    @use 'sass:math';
    @use 'utils/layout';

    @mixin glitchy($name) {
        @keyframes #{$name} {
            $steps: 20;

            @for $i from 0 through $steps {
                #{percentage($i/$steps)} {
                    clip-path: inset(percentage(random()) 0 percentage(random()));
                }
            }
        }

        animation: {
            name: $name;
            duration: 2s;
            timing-function: linear;
            iteration-count: infinite;
            direction: alternate-reverse;
        }
    }

    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .app {
        @include layout.force-fullscreen;
        background: rgba(black, 0.25);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        color: white;
        white-space: nowrap;
        font: {
            family: 'Open Sans', serif;
            weight: 600;
            size: 23vh;
        }
        text-shadow: 0 0.05em 0.1em rgba(black, 0.25);

        &.title {
            font-family: 'Roboto Slab', serif;
            transform: scale(0.75);
            transition: transform 0.5s cubic-bezier(0, 0, 0.2, 1);
        }
    }

    .glitch {
        $offset: 0.05em;
        position: relative;

        &::before, &::after {
            position: absolute;
            content: attr(data-text);
            color: white;
        }

        &::before {
            left: -$offset;
            text-shadow: -0.045em 0 rgba(#f9004c, 0.5);
            @include glitchy(glitch-before);
        }

        &::after {
            right: -$offset;
            text-shadow: 0.045em 0 rgba(#00f5ee, 0.5);
            @include glitchy(glitch-after);
        }
    }
</style>

<div class="app">
    {#if $start.isValid()}
        <div
            class="content"
            class:glitch={Math.abs($remaining.asMilliseconds() - 1000) < 250}
            class:title={$remaining.asMilliseconds() <= 1000}
            data-text={$text}
        >
            {$text}
        </div>
    {/if}
</div>
