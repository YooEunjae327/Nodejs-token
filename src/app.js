const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = 3000
const KEY = "test_key"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/sign_token", (req, res) => {
  let token = jwt.sign(
    { name: "sancho", exp: parseInt(Date.now() / 1000) + 10 },
    KEY
  ) // 만료기간 10초
  res.json({ token })
})

app.get("/check_token", (req, res) => {
  let token = req.headers["token"]
  try {
    let payload = jwt.verify(token, KEY)
    console.log("토큰 인증 성공", payload)
    res.json({ msg: "success" })
  } catch (err) {
    console.log("인증 에러")
    res.status(405).json({ msg: "error" })
    next(err)
  }
})

function errorHandler(err, req, res, next) {
  console.log("에러 처리 핸들러")
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:/${PORT}`)
})
