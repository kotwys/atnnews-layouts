import { ListenForCb, UnhandledListenForCb } from '../../../../../types/lib/nodecg-instance';

export function isUnhandled(cb: ListenForCb): cb is UnhandledListenForCb {
    return !cb.handled;
}
