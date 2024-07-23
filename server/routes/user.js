const express = require("express");
const router = express.Router();

const { login, register, profile, uploadFile, getAllPosts } = require("../controllers/user");
const authMiddleware = require('../middleware/auth')
const upload = require("../middleware/multer") 

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/profile").get(authMiddleware, profile);

router.post('/upload', authMiddleware , upload.single('file'), uploadFile);
// router.route("/users").get(getAllUsers);
router.get('/getAllPosts' , getAllPosts)

module.exports = router;