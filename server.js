const env = require("dotenv").config()
const express = require("express")
const app = express()

app.use("/", (req, res, next) => {
    res.send("Hello World!!")
});

app
   .use(express.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      next()
    })
    .use("/contacts", require("./routes/"))

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
    console.log(`Start the server ${host}:${port}`)
})
