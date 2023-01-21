import readLineSync from "readline-sync"
import chalk from "chalk"
import fs from "fs/promises"
import twilio from "twilio"
import {sendsms,generateotp} from "../utils/index.js"

async function userdelete(){
    try {
        console.clear()
        console.log(chalk.red("================================================="))
        console.log(chalk.blue("\t \t Banking System"))
        console.log(chalk.red("================================================="));
        console.log(chalk.blue("\t \t User Delete"));
        console.log(chalk.red("================================================="));
        console.log(chalk.red("\t \t Start with the country code"));
        let phone = readLineSync.question("Enter the mobile Number:")
        while(!phone){
            phone = readLineSync.question("Enter the mobile Number:")
        }
        let passcode = readLineSync.question("Enter Your passcode:")
        while(!passcode){
            passcode = readLineSync.question("Enter Your passcode:")
        }
        let fileData = await fs.readFile("data.json")
        fileData = JSON.parse(fileData)
        let otp = generateotp()
        let phonefound =  fileData.find(ele=>ele.phone == phone)
        if(phonefound.phone == phone && phonefound.passcode==passcode){
            console.log("Sending an 4 Digit OTP on to your verified Mobile Number")
            sendsms(otp,phone)
                let userotp = readLineSync.question("Enter the OTP you received:");
                while(!userotp){
                    userotp = readLineSync.question("Enter the OTP you received:")
                }
            // let userotp = readLineSync.question("Enter the OTP you received:")
            // while(!userotp){
            //     userotp = readLineSync.question("Enter the OTP you received:")
            // }
            if(otp == userotp){
                let index = fileData.indexOf(phonefound)
                let fileData = fileData.splice(index,1)
                await fs.writeFile("../data.json",JSON.stringify(fileData))
                console.log("User Deleted Successfully Successfully")
            }else{
                return console.log("Unauthorized Access")
            }
    }
    } catch (error) {
        console.error("Error")
    }
   
}

// userdelete()
export default userdelete;
























































