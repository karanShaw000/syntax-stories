import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import errorHandler from "./middlewares/errorHandler"
import { userRouter } from "./routes/user"
import { blogRouter } from "./routes/blog"
import connectDB from "./db/dbConnect"
import cookieParser from "cookie-parser"


dotenv.config()
const port = process.env.PORT || 5000
const cookieSecret = process.env.COOKIE_SECRET as string
const fronendUrl = process.env.FRONTEND_URL as string
const app = express()

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4173", fronendUrl],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Set-Cookie",
    "Access-Control-Allow-Origin",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  optionsSuccessStatus: 200,
  credentials: true,
};


app.use(cors(corsOptions))
app.use(cookieParser(cookieSecret))
app.use(express.json())

connectDB()
app.use("/api/user", userRouter)
app.use("/api/blog", blogRouter)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
