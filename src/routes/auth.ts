import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from '../models/user'
import { isLoggedIn } from '../middleware/jwt';

const router = express.Router()

const { SECRET = "secret" } = process.env;

router.post('/signup', async (req: Request, res: Response) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        res.json(user)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.get("/signout", isLoggedIn, (req: Request, res: Response) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out" });
  });

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                // sign token and send it in response
                const token = await jwt.sign({ username: user.username }, SECRET);
                // res.
                // res.json({ token });
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                    .status(200)
                    .json({ message: "Logged in successfully" });
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error })
    }
})

export { router as authRouter }
