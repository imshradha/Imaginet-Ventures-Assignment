import userModel from '../model/usermodel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
      const requestBody = req.body;
      const { name, mobile, email, password } = requestBody;
  
      // Check that all required fields are present in the request body
      if (!name || !mobile || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
      }

      // Validate the mobile number using a regex
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        return res.status(400).send({ message: 'Invalid password number' });
      }
  
      // Validate the email address using a regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ message: 'Invalid email address' });
      }
  
      // Validate the password using a regex
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).send({
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
      });
    }
  
      const user = await userModel.create(requestBody);
      res.status(201).send({ message: 'User Registered Successfully', data: user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

export const login = async (req, res) => {
  try {
    let requestBody = req.body;
    const { email, password } = requestBody;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required' });
    }

    // Find user by email and password
    const user = await userModel.findOne({ email:email,password:password });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "Imaginet", { expiresIn: '1h' });

    res.status(200).send({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


