import { join } from 'path';
import { readFile } from 'fs';
import type { NodeCG } from '../../../../types/server';
import { isUnhandled } from './utils/acknowledgement';

export = function (nodecg: NodeCG): void {
    let lines: string[] = [];

    nodecg.Replicant<string>('omnibar.ticker-file').on('change', (path) => {
        if (!path) {
            lines = [];
            return;
        }

        // It's needed for server to properly locate the file
        const actualPath = join('.', path);
        readFile(actualPath, { encoding: 'utf-8' }, (err, content) => {
            if (err) {
                nodecg.log.error(`Couldn't load ticker file ${actualPath}`);
                return;
            }

            lines = content.split('\n');
        });
    });

    nodecg.listenFor('omnibar.get-headlines', (_message, ack) => {
        if (lines.length == 0) {
            isUnhandled(ack) && ack(new Error('No headlines available.'));
            return;
        }

        ack && isUnhandled(ack) && ack(null, lines);
    });
};
