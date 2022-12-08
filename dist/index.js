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
mongoose_1.default.connect(process.env.DB_URL);
const app = (0, express_1.default)();
// const corsOptions = {
//   origin: ["http://localhost:3000", "https://skl-fe-teerawit37.vercel.app", "https://skl-fe.vercel.app"],
//   credentials: true // For legacy browser support
// }
const whitelist = [
    "http://localhost:3000",
    "https://skl-fe-teerawit37.vercel.app",
    "https://skl-fe.vercel.app",
    "https://wormth.com",
    "https://www.wormth.com"
];
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS: " + origin));
        }
    },
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions)); // add cors headers
app.use((0, morgan_1.default)("tiny")); // log the request for debugging
app.use((0, body_parser_1.json)({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.use("/api/courses", course_1.courseRouter);
app.use("/api/auth", auth_1.authRouter);
app.use("/api/user", user_1.userRouter);
const port = process.env.BACK_PORT;
app.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
// start the server
app.listen(port, () => {
    console.log(`server running`);
});
//# sourceMappingURL=index.js.map