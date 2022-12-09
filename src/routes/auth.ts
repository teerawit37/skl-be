import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from '../models/user'
import { authorization } from '../middleware/jwt';

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

router.get("/signout", authorization, (req: Request, res: Response) => {
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
                const token = await jwt.sign({ username: user.username, role: user.role }, SECRET);
                return res
                    .cookie("access_token", token, {
                        path: "/",
                        httpOnly: true,    // safety, does not allow cookie to be read in the frontend javascript
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'none',
                        domain: process.env.NODE_ENV === 'development' ? '.localhost' : '.vercel.app'
                    })
                    .status(200)
                    .json({
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role: user.role,
                        img: user.img
                    });
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
