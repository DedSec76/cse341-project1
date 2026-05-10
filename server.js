const env = require("dotenv").config()
const express = require("express")
const app = express()

app
   .use(express.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      next()
    })
    .use(require("./routes/"))

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
    console.log(`Start the server ${host}:${port}`)
})
