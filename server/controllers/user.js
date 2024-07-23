const jwt = require("jsonwebtoken");
const User = require("../models/User");
const postModel = require("../models/post")

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        "luffy-onepiece",
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ 
        msg: "user logged in", 
        user : foundUser , 
        token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentails" });
  }
};

const profile = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  console.log(req);
  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};


const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).send("No files were given");
  }

  try {
    const file = req.file;
    const userId = req.body.userId;
    const authToken = req.body.authToken;

    // Ensure userId and authToken are valid and exist
    if (!userId || !authToken) {
      return res.status(400).send("User ID or auth token missing");
    }

    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create a new post
    const post = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaption,
      user: user._id
    });

    // Add the post ID to the user's posts array
    user.posts.push(post._id);

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      post: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


const getAllPosts = async (req,res,next) =>{
  const allPost = await postModel.find()

  // console.log(allPost);

  res.status(200).json({
    success : true,
    allPost : allPost
  })
} 



module.exports = {
  login,
  register,
  profile,
  uploadFile,
  getAllPosts
};
