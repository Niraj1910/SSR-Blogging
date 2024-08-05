const blog = require("../models/blog");
const comment = require("../models/comment");

async function createNewBlog(req, res) {
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
}

async function getBlogByID(req, res) {
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
}

async function createComment(req, res) {
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
}

module.exports = { createNewBlog, getBlogByID, createComment };
