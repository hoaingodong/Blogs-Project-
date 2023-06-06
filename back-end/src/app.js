const config = require("./utils/config")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const loginRouter = require("./controllers/login")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const commentsRouter = require("./controllers/comments")

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/comments", commentsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app