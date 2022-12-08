import express, { Request, Response } from 'express'
import { authorization } from '../middleware/jwt'
import { User } from '../models/user'

const router = express.Router()

router.get("/", authorization, async (req: any, res: any) => {
    const username = req.username;
    res.json(
      await User.find({ username }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });

  // update Route with authorization middleware
  router.put("/:id", authorization, async (req: any, res: any) => {
    const username = req.username;
    req.body.username = username;
    const _id = req.params.id;
    res.json(
      await User.updateOne({ username, _id }, req.body, { new: true }).catch(
        (error) => res.status(400).json({ error })
      )
    );
  });

  // update Route with authorization middleware
  router.delete("/:id", authorization, async (req: any, res: any) => {
    const username = req.username;
    const _id = req.params.id;
    res.json(
      await User.remove({ username, _id }).catch((error) =>
        res.status(400).json({ error })
      )
    );
  });

export { router as userRouter }

