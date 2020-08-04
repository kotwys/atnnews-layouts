"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnhandled = void 0;
function isUnhandled(cb) {
    return !cb.handled;
}
exports.isUnhandled = isUnhandled;
