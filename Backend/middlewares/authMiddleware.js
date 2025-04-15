import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try{
    const tokenHeader = req.header("Authorization").split(" ");
    const token = tokenHeader[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token',error });
  }
};