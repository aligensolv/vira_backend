"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerQueue = void 0;
const queue_factory_1 = require("../event-bus/queue.factory");
exports.schedulerQueue = (0, queue_factory_1.createQueue)("scheduler");
