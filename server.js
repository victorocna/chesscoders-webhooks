require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const slack = require("slack")
const app = express()
const port = 3000

app.use(helmet())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  return res.send(404)
})

const notify = (text, channel = "general") => {
  return slack.chat.postMessage({ token: process.env.SLACK_API_TOKEN, channel, text })
}

app.post("/chesscoders", (req, res) => {
  if (req.body.event) {
    notify(`Webhook triggered on chesscoders.com admin. Event: ${req.body.event}`)
  }

  return res.send("Ok")
})

app.post("/inspacare", (req, res) => {
  if (req.body.event) {
    notify(`Webhook triggered on inspacare.com admin. Event: ${req.body.event}`)
  }

  return res.send("Ok")
})

app.post("/masterplanner", (req, res) => {
  if (req.body.event && req.body.event === "login") {
    notify(`Webhook triggered on masterplanner login for user ${req.body.user.email}`)
  }
  // TODO: signup && validate events

  return res.send("Ok")
})

app.listen(port, () => console.log(`Chesscoders Webhook app listening on port ${port}`))
