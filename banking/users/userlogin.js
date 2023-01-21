import readLineSync from "readline-sync"
import chalk from "chalk"
import fs from "fs/promises"
import twilio from "twilio"
import {sendsms,generateotp} from "../utils/index.js"
import addmoney from "../Banking/addmoney.js"
import transaction from "../Banking/transaction.js"
import withdraw from "../Banking/withdraw.js"
import balance from "../Banking/viewbalance.js"
import displaymenu from "../app.js"


async function userlogin(){
    try {
        console.clear()
        console.log(chalk.red("================================================="))
        console.log(chalk.blue("\t \t Banking System"))
        console.log(chalk.red("================================================="));
        console.log(chalk.blue("\t \t User Login"));
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
        let fileData = await fs.readFile("../data.json")
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
            if(otp == userotp){
                console.log("User Login Successfully")
                submenu()
            }else{
                return console.log("Unauthorized Access")
            }
    }
    } catch (error) {
        console.error("Error")
    }
   
}



export default userlogin;

async function submenu(){

    console.log(`1.Add Money
    2.Withdraw Money
    3.View Balance
    4.Transaction History`);


    let key = readLineSync.question("Enter the operation you want to perform:")
    switch(key){
        case 1:
            console.log("Add Money")
            await addmoney()
        break
        case 2:
            console.log("Withdraw Money")
            await withdraw()
        break;
        case 3:
            console.log("View Balance");
            await balance()
        break;
        case 4:
            console.log("Transaction History")
            await transaction()
        break;
        case 5:
            console.log("Return to main menu");
            await displaymenu()
        default:
            console.log("Invalid Options")
        break;

    }
}

























































