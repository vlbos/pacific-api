"use strict";
// Copyright 2017-2021 @polkadot/test-support authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.waitFor = void 0;
async function waitFor(predicate, { interval = 500, timeout = 10000 } = {}) {
    const asyncPredicate = () => Promise.resolve(predicate());
    let elapsed = 0;
    while (!(await asyncPredicate())) {
        if (elapsed > timeout) {
            throw Error('Timeout');
        }
        await (0, exports.sleep)(interval);
        elapsed += interval;
    }
    return true;
}
exports.waitFor = waitFor;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
//# sourceMappingURL=waitFor.js.map