import express, { Request, Response } from 'express'
import { authorization } from '../middleware/jwt'
import { Course } from '../models/course'

const router = express.Router()

router.get("/", authorization, async (req: any, res: any) => {
  res.json(
    await Course.find({}).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// Show Route with authorization middleware
router.get("/:id", authorization, async (req: any, res: any) => {
  const username = req.username;
  const _id = req.params.id;
  res.json(
    await Course.findOne({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

// create Route with authorization middleware
router.post("/", authorization, async (req: any, res: any) => {
  const username = req.username;
  req.body.username = username;
  res.json(
    await Course.create(req.body).catch((error) =>
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
    await Course.updateOne({ username, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );
});

// update Route with authorization middleware
router.delete("/:id", authorization, async (req: any, res: any) => {
  const username = req.username;
  const _id = req.params.id;
  res.json(
    await Course.remove({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

export { router as courseRouter }

