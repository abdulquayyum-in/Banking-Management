import readLineSync from 'readline-sync';
import chalk from 'chalk'
import fs from "fs/promises"
import {sendsms,generateotp,date,time} from "../utils/index.js"

async function withdraw(){

    try {
        console.clear()
        console.log(chalk.red("================================================="))
        console.log(chalk.blue("\t \t Banking System"))
        console.log(chalk.red("================================================="));
        console.log(chalk.blue("\t \t Withdraw"));
        console.log(chalk.red("================================================="));
        console.log(chalk.red("\t \t Should start with Country code"));
        let phone = readLineSync.question("Enter your verified mobile Number: ")
        while(!phone){
            phone = readLineSync.question("Enter your verified mobile Number: ")
        }
        let fileData = await fs.readFile("data.json")
        fileData = JSON.parse(fileData)
        let phonefound =  fileData.find(ele=>ele.phone == phone)
        if(!phonefound){
            throw("Unauthorized Access")
        }
        let withdraw = readLineSync.questionInt("Enter the amount of money you want to Withdraw:")
        phonefound.balance = phonefound.balance - withdraw
        let add = "-";
        let transaction = {"date": date()+" "+time(),"Added":add,"Withdraw":withdraw,"Balance":phonefound.balance}
        phonefound.transaction.push(transaction)
        fileData.push(phonefound)
        
    
        await fs.writeFile("../data.json",JSON.stringify(fileData))
        console.log("The balance was successfully Withdrawed")
        console.log(`The total balance right now = ${phonefound.balance}`)
    } catch (error) {
        console.error("Unauthorised Access");
    }
   

}
// withdraw()
export default withdraw;