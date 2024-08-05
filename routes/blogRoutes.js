const { Router } = require("express");
const multer = require("multer");
const blog = require("../models/blog");
const comment = require("../models/comment");
const path = require("path");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router
  .route("/add-new")
  .get((req, res) => {
    return res.render("addBlog", {
      user: req.user,
    });
  })
  .post(upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;

    try {
      const newBlog = await blog.create({
        title,
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user.id,
      });

      return res.redirect(`/blog/${newBlog._id}`);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

router.get("/:blogId", async (req, res) => {
  try {
    const requestedBlog = await blog
      .findById(req.params.blogId)
      .populate("createdBy");

    const comments = await comment.find({ blogId: req.params.blogId });

    return res.render("blog", {
      blog: requestedBlog,
      user: req.user,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/comment/:blogId", async (req, res) => {
  try {
    await comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      commentedBy: req.user.id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
