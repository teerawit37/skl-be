import express, { Request, Response } from 'express'
import { isLoggedIn } from '../middleware/jwt'
import { User } from '../models/user'

const router = express.Router()

router.get("/", isLoggedIn, async (req: any, res: any) => {
    const { username } = req.user;
    res.json(
      await User.find({ username }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });

  // update Route with isLoggedIn middleware
  router.put("/:id", isLoggedIn, async (req: any, res: any) => {
    const { username } = req.user;
    req.body.username = username;
    const _id = req.params.id;
    res.json(
      await User.updateOne({ username, _id }, req.body, { new: true }).catch(
        (error) => res.status(400).json({ error })
      )
    );
  });

  // update Route with isLoggedIn middleware
  router.delete("/:id", isLoggedIn, async (req: any, res: any) => {
    const { username } = req.user;
    const _id = req.params.id;
    res.json(
      await User.remove({ username, _id }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });

export { router as userRouter }

