import sendEmail from '../helpers/index.js';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
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
      // { expiresIn: '15m' }
    );

    console.log(token);

    await user.updateOne({ resetPasswordLink: token });

    const link = `${process.env.CLIENT_URL}/reset-password/${user.id}/${token}`;
    // const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const templateEmail = {
      from: 'Lela Cookies',
      to: email,
      subject: 'Link Reset Password',
      html: `<h1>Token Hanya Berlaku Selama 15 Menit</h1><p> Silahkan klik link dibawah untuk melakukan reset password anda </p><p>${link}</p>`,
    };
    sendEmail(templateEmail);

    return res.status(200).json({
      status: true,
      message: 'link reset password terkirim',
    });
  } else {
    res.status(500).json({
      status: false,
      message: 'Email tidak Tersedia',
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    console.log({
      password: password,
      token: token,
    });
    const user = await User.findOne({ resetPasswordLink: token });

    if (user) {
      if (req.body.password) {
        user.password = req.body.password;
      }
      await user.save();
      return res.status(201).json({
        status: true,
        message: 'password Berhasil Di ganti',
      });
    } else {
      return res.status(201).json({
        status: false,
        message: 'token tidak valid atau expired',
      });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export { forgotPassword, resetPassword };
