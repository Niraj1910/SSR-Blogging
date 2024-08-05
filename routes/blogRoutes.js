const { Router } = require("express");

const { upload } = require("../services/multerDiskStorage");
const {
  createNewBlog,
  createComment,
  getBlogByID,
} = require("../controllers/blogControllers");
const router = Router();

router
  .route("/add-new")
  .get((req, res) => {
    return res.render("addBlog", {
      user: req.user,
    });
  })
  .post(upload.single("coverImage"), createNewBlog);

router.get("/:blogId", getBlogByID);

router.post("/comment/:blogId", createComment);

module.exports = router;
