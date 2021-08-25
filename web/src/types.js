"use strict";
exports.__esModule = true;
exports.AUDIO_PADDING = exports.OUTRO_DURATION = exports.fpms = exports.FPS = void 0;
exports.FPS = 24;
var fpms = function (ms) { return Math.round((exports.FPS / 1000) * ms); };
exports.fpms = fpms;
exports.OUTRO_DURATION = exports.FPS * 3;
exports.AUDIO_PADDING = exports.FPS;
