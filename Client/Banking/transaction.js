import readLineSync from 'readline-sync';
import chalk from 'chalk'
import fs from "fs/promises"
import {sendsms,generateotp,date,time} from "../utils/index.js"

async function transaction(){
    console.clear()
    console.log(chalk.red("================================================="))
    console.log(chalk.blue("\t \t Banking System"))
    console.log(chalk.red("================================================="));
    console.log(chalk.blue("\t \t Transaction History"));
    console.log(chalk.red("================================================="));
    console.log(chalk.red("\t \t Should start with Country code"));
    let phone = readLineSync.question("Enter your verified mobile Number: ")
    while(!phone){
        phone = readLineSync.question("Enter your verified mobile Number: ")
    }
    let fileData = await fs.readFile("../data.json")
    fileData = JSON.parse(fileData)
    let phonefound =  fileData.find(ele=>ele.phone == phone)
    if(!phonefound){
        throw("Unauthorized Access")
    }
    console.log(chalk.green("Here is your transaction History"))
    console.table(phonefound.transaction)
}
// transaction()
export default transaction