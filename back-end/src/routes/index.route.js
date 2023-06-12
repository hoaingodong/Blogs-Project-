const express = require("express")
const router = express.Router()
const blogsRouter = require("./blog.route")
const usersRouter = require("./user.route")
const loginRouter = require("./login.route")
const commentsRouter = require("./comment.route")
const middleware = require("../utils/middleware")

router.use("/users", usersRouter)
router.use("/login", loginRouter)

router.use(middleware.tokenValidator)
router.use("/blogs", blogsRouter)
router.use("/comments", commentsRouter)

module.exports = router
