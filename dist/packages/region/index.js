"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionRoutes = void 0;
__exportStar(require("./region.controller"), exports);
__exportStar(require("./region.service"), exports);
__exportStar(require("./region.mapper"), exports);
__exportStar(require("./region.dto"), exports);
__exportStar(require("./region.schema"), exports);
__exportStar(require("./region.repo"), exports);
__exportStar(require("./region.factory"), exports);
__exportStar(require("./region.seeder"), exports);
var region_routes_1 = require("./region.routes");
Object.defineProperty(exports, "RegionRoutes", { enumerable: true, get: function () { return __importDefault(region_routes_1).default; } });
