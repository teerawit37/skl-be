"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.username = data.username;
        req.role = data.role;
        return next();
    }
    catch (_a) {
        return res.sendStatus(403);
    }
};
exports.authorization = authorization;
//# sourceMappingURL=jwt.js.map