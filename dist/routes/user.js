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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.userRouter = router;
router.get("/", jwt_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.user;
    res.json(yield user_1.User.find({ username }).catch((error) => res.status(400).json({ error })));
}));
// update Route with isLoggedIn middleware
router.put("/:id", jwt_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.user;
    req.body.username = username;
    const _id = req.params.id;
    res.json(yield user_1.User.updateOne({ username, _id }, req.body, { new: true }).catch((error) => res.status(400).json({ error })));
}));
// update Route with isLoggedIn middleware
router.delete("/:id", jwt_1.isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.user;
    const _id = req.params.id;
    res.json(yield user_1.User.remove({ username, _id }).catch((error) => res.status(400).json({ error })));
}));
//# sourceMappingURL=user.js.map