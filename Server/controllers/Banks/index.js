import express from "express"
import fs from "fs/promises"
import {sendsms,generateotp,date,time} from "../../../banking/utils/index.js"
const router = express.Router()

router.post("/addmoney",async(req,res)=>{
   try {
    let fileData = await fs.readFile("/home/rizwan/projects/Server/data.json")
    fileData = JSON.parse(fileData)
    let phonefound =  fileData.find(ele=>ele.phone == req.body.phone)
    if(!phonefound){
        return res.status(401).json({message:"Account does not exist"})
    }
    phonefound.balance = phonefound.balance + req.body.deposit
    let draw = "-";
    let transaction = {"date": date()+" "+time(),"Added":req.body.deposit,"Withdraw":draw,"Balance":phonefound.balance}
    phonefound.transaction.push(transaction)
    fileData.push(phonefound)
    await fs.writeFile("/home/rizwan/projects/Server/data.json",JSON.stringify(fileData))
    res.status(200).json({message:`The total balance = ${phonefound.balance}`})
   } catch (error) {
    console.error("Invalid Server error")
   }
})

router.post("/withdraw",async(req,res)=>{
    try {
       let fileData = await fs.readFile("/home/rizwan/projects/Server/data.json")
       fileData = JSON.parse(fileData)
       let phonefound = fileData.find(ele=>ele.phone == req.body.phone)
       if(!phonefound){
        return res.status(401).json({message:"Account does not exist"})
       }
       
    
    } catch (error) {
        
    }
})

