import express from "express"
import fs from "fs/promises"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
var router = express.Router()

router.post("/signup",async (req,res)=>{
    let {name,phone,aadhar,pancard,passcode} = req.body

    let fileData = await fs.readFile("/home/rizwan/projects/Server/data.json")
    fileData = JSON.parse(fileData)

    let userfound = await fileData.find(ele=>ele.phone == req.body.phone)
    if(userfound){
        res.status(409).send("User Already Exist")
    }else{
        passcode = await bcrypt.hash(passcode,12)
        let data = {name,phone,aadhar,pancard,balance:0,passcode,transaction:[]}
        fileData.push(data)
        await fs.writeFile("/home/rizwan/projects/Server/data.json",JSON.stringify(fileData))
        res.status(200).json({MSG:"Registered Successfully"})
    }
})

router.post("/login",async (req,res)=>{
    let fileData = await fs.readFile("/home/rizwan/projects/Server/data.json")
    fileData = JSON.parse(fileData)
    let emailfound = fileData.find((ele)=>ele.phone == req.body.phone)
    const matchpassword = await bcrypt.compare(req.body.passcode,emailfound.passcode)
    if(emailfound&&matchpassword){
        const payload = {phone:req.body.phone,passcode:req.body.passcode}
        const privatekey = 'codeforindia'
        const token = jwt.sign(payload,privatekey,{expiresIn:"1h"})
        res.status(200).json({message:"success",token,AccountNo:req.body.phone})
    }
   else{
     return res.status(401).json({mes:"Invalid Credentials"})

   }
})

export default router;

