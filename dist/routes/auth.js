"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const jwt_1 = require("../middleware/jwt");
const router = express_1.default.Router();
exports.authRouter = router;
const { SECRET = "secret" } = process.env;
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = yield bcryptjs_1.default.hash(req.body.password, 10);
        const user = yield user_1.User.create(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
router.get("/signout", jwt_1.authorization, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
});
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ username: req.body.username });
        if (user) {
            const result = yield bcryptjs_1.default.compare(req.body.password, user.password);
            if (result) {
                const token = yield jsonwebtoken_1.default.sign({ username: user.username, role: user.role }, SECRET);
                return res
                    .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'none'
                })
                    .status(200)
                    .json({
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    img: user.img
                });
            }
            else {
                res.status(400).json({ error: "password doesn't match" });
            }
        }
        else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
//# sourceMappingURL=auth.js.map