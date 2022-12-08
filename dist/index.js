"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const course_1 = require("./routes/course");
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
dotenv_1.default.config();
mongoose_1.default.connect('mongodb+srv://root:PV2WBgZvdlr80YgY@cluster0.g3bhdno.mongodb.net/skilllane?retryWrites=true&w=majority');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
})); // add cors headers
app.use((0, morgan_1.default)("tiny")); // log the request for debugging
app.use((0, body_parser_1.json)({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use("/api/courses", course_1.courseRouter);
app.use("/api/auth", auth_1.authRouter);
app.use("/api/user", user_1.userRouter);
const port = process.env.BACK_PORT;
app.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
// start the server
app.listen(port, () => {
    console.log(`server running : http://${process.env.BACK_HOST}:${port}`);
});
//# sourceMappingURL=index.js.map