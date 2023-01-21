import express from "express"
const app = express()
const port = 6001
import userverify from "../Server/controllers/users/index.js"

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Server 1")
})

app.use("/api/user",userverify)

app.listen(port,()=>{
    console.log("server started at",port)
})