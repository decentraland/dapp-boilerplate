"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMobile() {
    // WARN: Super naive mobile device check.
    // we're using it on low-stake checks, where failing to detect some browsers is not a big deal.
    // If you need more specificity you may want to change this implementation.
    const navigator = window.navigator;
    return (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent));
}
exports.isMobile = isMobile;
//# sourceMappingURL=utils.js.map