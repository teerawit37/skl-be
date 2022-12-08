import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface JwtPayload {
  username: string,
  role: string
}

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
export { authorization }