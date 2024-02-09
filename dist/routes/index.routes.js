"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.route.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Welcome to the API');
});
exports.default = router;
