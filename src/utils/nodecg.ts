import type { ReplicantOptions } from '../../../../types/browser';
import { Writable, writable } from 'svelte/store';

/**
 * Creates a Svelte store for NodeCG replicant.
 * @param name - name of the replicant
 * @param initialValue - initial value for the store
 * @param options - options for `nodecg.Replicant` with additional `namespace` option
 */
export function replicant<T>(
    name: string,
    initialValue: T,
    options?: ReplicantOptions<T> & { namespace?: string },
): Writable<T> {
    const replicantOptions = options && {
        defaultValue: options.defaultValue,
        persistent: options.persistent,
        schemaPath: options.schemaPath,
    };
    const repl = options?.namespace
        ? nodecg.Replicant(name, options.namespace, replicantOptions)
        : nodecg.Replicant(name, replicantOptions);

    const { subscribe } = writable(initialValue, (set) => {
        repl.on('change', set);
        return () => repl.off('change', set);
    });

    return {
        subscribe,
        set(value: T) {
            repl.value = value;
        },
        update(updater: (value: T) => T) {
            repl.value = updater(repl.value);
        },
    };
}
