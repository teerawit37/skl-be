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
exports.courseRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../middleware/jwt");
const course_1 = require("../models/course");
const router = express_1.default.Router();
exports.courseRouter = router;
router.get("/", jwt_1.authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    res.json(yield course_1.Course.find({ username }).catch((error) => res.status(400).json({ error })));
}));
// Show Route with authorization middleware
router.get("/:id", jwt_1.authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    const _id = req.params.id;
    res.json(yield course_1.Course.findOne({ username, _id }).catch((error) => res.status(400).json({ error })));
}));
// create Route with authorization middleware
router.post("/", jwt_1.authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    req.body.username = username;
    res.json(yield course_1.Course.create(req.body).catch((error) => res.status(400).json({ error })));
}));
// update Route with authorization middleware
router.put("/:id", jwt_1.authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    req.body.username = username;
    const _id = req.params.id;
    res.json(yield course_1.Course.updateOne({ username, _id }, req.body, { new: true }).catch((error) => res.status(400).json({ error })));
}));
// update Route with authorization middleware
router.delete("/:id", jwt_1.authorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.username;
    const _id = req.params.id;
    res.json(yield course_1.Course.remove({ username, _id }).catch((error) => res.status(400).json({ error })));
}));
//# sourceMappingURL=course.js.map