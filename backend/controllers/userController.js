import AsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
import sendEmail from '../helpers/index.js';

//  @desc   Auth user & get token
//  @route  POST /api/users/login
//  @access Public
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid Email or Password');
  }
});

//  @desc   Register a New User
//  @route  POST /api/users/login
//  @access Public
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email Alredy alexist');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('User not Found');
  }
});

//  @desc   GET user profile
//  @route  GET /api/users/profile
//  @access Private
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

//  @desc   Update user profile
//  @route  PUT /api/users/profile
//  @access Private
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.status(201).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

//  @desc   GET all users
//  @route  GET /api/users
//  @access PrivateAdmin
const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//  @desc   DELETED user
//  @route  DELETE /api/users/:id
//  @access PrivateAdmin
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//  @desc   GET user by id
//  @route  GET /api/users/:id
//  @access PrivateAdmin
const getUsersById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    throw new Error('user not found');
  }
});

//  @desc   Update user profile
//  @route  PUT /api/users/:id
//  @access Private/admin
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updateUser = await user.save();
    res.status(201).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

//  @desc   Forgot Password User
//  @route  PUT /forgotpassword
//  @access Public
const forgotpassword = AsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    const token = jsonwebtoken.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    await user.updateOne({ resetPasswordLink: token });

    const link = `${process.env.CLIENT_URL}/reset-password/${user.id}/${token}`;

    const templateEmail = {
      from: 'Lela Cookies',
      to: email,
      subject: 'Link Reset Password',
      html: `<p> Silahkan klik link dibawah untuk melakukan reset password anda </p><p>${link}</p>`,
    };
    console.log(link);

    sendEmail(templateEmail);
    return res.status(200).json({
      status: true,
      message: 'link reset password terkirim',
    });
  } else {
    res.status(500);
    throw new Error('Email Tidak Tersedia');
  }
});

const resetPassword = AsyncHandler(async (req, res) => {
  const { password, token } = req.body;
  console.log('token', token);
  console.log('password', password);

  const user = User.findOne({ resetPasswordLink: token });
  console.log(user);

  res.status(200).json({ status: true, message: 'Berhasil' });
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
  forgotpassword,
  resetPassword,
};
