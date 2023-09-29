const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new ErrorResponse("E-mail already exists", 400));
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  console.log("hellooo");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("E-mail and password are required", 400));
    }

    // check user e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // verify user password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // const token = await user.jwtGenerateToken();
    // res.status(200).json({
    //   success: true,
    //   token,
    // });

    generateToken(user, 200, res);
  } catch (error) {
    console.log(error);

    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.EXPIRE_TOKEN),
  };
  const userDetails = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user: userDetails });
};

//LOG OUT USER
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// USESR PROFILE
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    user,
  });
};

exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//Retrive a list of users
exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
