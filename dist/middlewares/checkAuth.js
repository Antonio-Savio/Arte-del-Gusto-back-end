"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = checkAuth;
const jsonwebtoken_1 = require("jsonwebtoken");
function checkAuth(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).end();
        return;
    }
    const token = authToken.split(' ')[1]; //isolar "token" do "Bearer"
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = sub;
        return next();
    }
    catch (e) {
        res.status(401).end();
        return;
    }
}
