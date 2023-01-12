import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from '../models/user'
import { authorization } from '../middleware/jwt';

const router = express.Router()

const { SECRET = "secret" } = process.env;

router.post('/signup', handleSignUp)
router.get("/signout", authorization, handleSignOut)
router.post('/signin', handleSignIn)

async function handleSignUp(req: Request, res: Response) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        res.json(user)
    } catch (error) {
        res.status(400).json({ error })
    }
}

function handleSignOut(req: Request, res: Response) {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
}

async function handleSignIn(req: Request, res: Response) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ error: "password doesn't match" });
        }

        const token = await jwt.sign({ username: user.username, role: user.role }, SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        return res.status(200).json({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            img: user.img,
        });
    } catch (error) {
        res.status(400).json({ error })
    }
}

export { router as authRouter }
