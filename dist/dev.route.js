"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoute = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.TestRoute = router;
router.get('/test', async (req, res) => {
    return res.json({
        success: true
    });
});
