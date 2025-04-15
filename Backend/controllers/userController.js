import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { fullName, email, password } = req.body;
    const user = new User({ fullName, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email," and ",password);
    const isMatch = await user.comparePassword(password) ;
    console.log(isMatch);
    if (!user || !isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Logged in successfully',token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


export const logout = (req, res) => {
  req.userId = null;
  res.status(200).json({ message: 'Logged out successfully' });
};