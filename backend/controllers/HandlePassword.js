import sendEmail from '../helpers/index.js';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
//  @desc   Forgot Password User
//  @route  PUT /forgotpassword
//  @access Public

const forgotPassword = async (req, res) => {
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
    // const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const templateEmail = {
      from: 'Lela Cookies',
      to: email,
      subject: 'Link Reset Password',
      html: `<p> Silahkan klik link dibawah untuk melakukan reset password anda </p><p>${link}</p>`,
    };
    sendEmail(templateEmail);

    console.log(token);
    return res.status(200).json({
      status: true,
      message: 'link reset password terkirim',
    });
  } else {
    res.status(500);
    throw new Error('Email Tidak Tersedia');
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    console.log('Token', token);
    console.log('passWord', password);
    const user = await User.findOne({ resetPasswordLink: token });
    console.log(user);
    if (user) {
      if (req.body.password) {
        user.password = req.body.password;
      }
      await user.save();
      return res.status(201).json({
        status: true,
        message: 'password Berhasil Di ganti',
      });
    }
  } catch (error) {
    res.status(500).send(e.toString());
  }
};

export { forgotPassword, resetPassword };
