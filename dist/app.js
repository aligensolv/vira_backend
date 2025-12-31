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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const error_handler_1 = __importDefault(require("./core/middlewares/error_handler"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./core/utils/logger"));
const not_found_1 = require("./core/middlewares/not_found");
const server_configs_1 = require("./core/config/server_configs");
const dev_route_1 = require("./dev.route");
const auth_1 = require("./packages/auth");
const region_1 = require("./packages/region");
const place_1 = require("./packages/place");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
exports.app.use('/blueprints', express_1.default.static(path.join(__dirname, 'blueprints')));
if (server_configs_1.appConfig.env == 'development') {
    exports.app.use(dev_route_1.TestRoute);
}
const whitelist = server_configs_1.corsConfig.whitelist;
console.log(whitelist);
const corsMiddleware = (0, cors_1.default)({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) != -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
});
exports.app.use(corsMiddleware);
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, compression_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/api', auth_1.AuthRoutes, region_1.RegionRoutes, place_1.PlaceRoutes);
const $404 = (0, not_found_1.notFoundMiddleware)({
    logger: logger_1.default,
    suggestAlternatives: true,
    includeRequestInfo: true,
    trackMetrics: true
});
exports.app.use($404);
exports.app.use(error_handler_1.default);
