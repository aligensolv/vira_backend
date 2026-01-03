"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchedulerExecutorQueue = void 0;
const queue_factory_1 = require("./queue.factory");
exports.bookingSchedulerExecutorQueue = (0, queue_factory_1.createQueue)('scheduler-executer');
