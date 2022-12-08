import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface JwtPayload {
  username: string,
  role: string
}


// MIDDLEWARE FOR AUTHORIZATION: HEADER (MAKING SURE THEY ARE LOGGED IN)
const isLoggedIn = async (req: any, res: any, next: any) => {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET)  as JwtPayload;
        if (payload) {
          req.username = payload.username;
          req.role = payload.role;
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malformed auth header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// MIDDLEWARE FOR AUTHORIZATION: COOKIES (MAKING SURE THEY ARE LOGGED IN)
const authorization = (req: any, res: any, next: any) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.SECRET) as JwtPayload;
    req.username = data.username;
    req.role = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

// export custom middleware
export { isLoggedIn, authorization }