"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManagersHandler = getManagersHandler;
exports.loginManagerHandler = loginManagerHandler;
exports.getCurrentManagerHandler = getCurrentManagerHandler;
const manager_service_1 = require("./manager.service");
const managerService = new manager_service_1.ManagerService();
async function getManagersHandler(req, res) {
    const data = await managerService.getAllManagers();
    res.json({ data });
}
async function loginManagerHandler(req, res) {
    const { email, password } = req.body;
    const { manager, token } = await managerService.loginManager({ email, password });
    res.json({ manager, token });
}
async function getCurrentManagerHandler(req, res) {
    const manager = req.user;
    res.json({ manager });
}
