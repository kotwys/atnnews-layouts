import type { NodeCG } from '../../../../types/server';

export = function (nodecg: NodeCG): void {
    require('./ticker')(nodecg);
};
