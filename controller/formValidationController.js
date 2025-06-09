const { userModel } = require('../model/formValidationModel'); // Correct destructure

const userValidation = async (req, res) => {
  try {
    const { name, email, age, password, confirmPassword } = req.body;

    if (!name || !email || !age || !password || !confirmPassword) {
        console.log()
      return res.status(400).json({
        message: 'All fields are required',
        status: false,
      });
    }

    const newUser = new userModel({
      name,
      email,
      age,
      password,
      confirmPassword
    });

    await newUser.save();

    res.status(201).json({
      message: 'Form submitted successfully',
      status: true,
    });
  } catch (error) {
    console.error('Internal server error:', error.message);
    res.status(500).json({
      message: error.message || 'Internal server error',
      status: false,
    });
  }
};

module.exports = { userValidation };
