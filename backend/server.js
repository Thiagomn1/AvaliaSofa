const path = require("path")
const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/sofas", require("./routes/sofaRoutes"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"))
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API" })
  })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
