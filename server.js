require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const slack = require("slack")
const app = express()
const port = 3000
const routes = require("./routes")

app.get("/", (req, res) => {
  return res.send(404)
})

for (let i in routes) {
  app.post(routes[i], (req, res) => {
    slack.chat.postMessage({
      token: process.env.SLACK_API_TOKEN,
      channel: "general",
      text: "Hello world from Node. Payload: " + JSON.stringify(req.body) || "none",
    })

    return res.send("Ok")
  })
}

app
  .use(helmet())
  .listen(port, () => console.log(`Chesscoders webhook app listening on port ${port}`))
