import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

type CustomizableProps = {
    delay?: number;
    duration?: number;
    easing?: (t: number) => number;
};

type FlyProps = CustomizableProps & {
    origin?: 'top' | 'bottom' | 'right' | 'left';
};

/**
 * Rotates the node in 3D.
 *
 * Takes usual transition options with additional `origin` option which specifies
 * the origin of the rotation. `origin` may be one of top, bottom, right, or left.
 *
 * @param node - node to animate
 * @param options - animation options
 */
export function rotate(node: Element, options: FlyProps = {}): TransitionConfig {
    const resolved = {
        delay: 0,
        duration: 500,
        easing: cubicOut,
        origin: 'left',
        ...options,
    };

    const getRotation = (value) =>
        ({
            top: `rotateX(${-value}deg)`,
            bottom: `rotateX(${value}deg)`,
            right: `rotateY(${-value}deg)`,
            left: `rotateY(${value}deg)`,
        }[resolved.origin]);

    return {
        ...resolved,
        css: (t, u) => `
            transform-origin: ${resolved.origin};
            opacity: ${t};
            transform: perspective(1000px) translateZ(${u * 100}px) ${getRotation(u * 45)};
        `,
    };
}

type WeightProps = CustomizableProps & {
    from?: number;
};

/**
 * Changes the weight of text elements.
 *
 * Takes usual transition options with additional `from` option which specifies
 * node's font weight at intro start and outro end.
 *
 * @param node - node to animate
 * @param options - animation options
 */
export function weight(node: Element, options: WeightProps = {}): TransitionConfig {
    const resolved = {
        delay: 0,
        duration: 500,
        easing: cubicOut,
        ...options,
    };

    const initial = +getComputedStyle(node).fontWeight;

    return {
        ...resolved,
        css: (t, u) => `font-weight: ${initial + (resolved.from - initial) * u}`,
    };
}
