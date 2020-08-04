"use strict";
const path_1 = require("path");
const fs_1 = require("fs");
const acknowledgement_1 = require("./utils/acknowledgement");
module.exports = function (nodecg) {
    let lines = [];
    nodecg.Replicant('omnibar.ticker-file').on('change', (path) => {
        if (!path) {
            lines = [];
            return;
        }
        // It's needed for server to properly locate the file
        const actualPath = path_1.join('.', path);
        fs_1.readFile(actualPath, { encoding: 'utf-8' }, (err, content) => {
            if (err) {
                nodecg.log.error(`Couldn't load ticker file ${actualPath}`);
                return;
            }
            lines = content.split('\n');
        });
    });
    nodecg.listenFor('omnibar.get-headlines', (_message, ack) => {
        if (lines.length == 0) {
            acknowledgement_1.isUnhandled(ack) && ack(new Error('No headlines available.'));
            return;
        }
        ack && acknowledgement_1.isUnhandled(ack) && ack(null, lines);
    });
};
