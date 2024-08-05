const express = require("express");
const { connectToDB } = require("./db");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middelwares/authentication");
const blog = require("./models/blog");

const app = express();

const PORT = process.env.PORT || 4000;

connectToDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));

//Middelwares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", async (req, res) => {
  const allBlogs = await blog.find({});

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

// user based routes
app.use("/user", userRouter);

// blog based routes
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
