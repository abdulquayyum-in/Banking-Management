import readLineSync from 'readline-sync';
import chalk from 'chalk'
import fs from "fs/promises"
import {sendsms,generateotp,date,time} from "../utils/index.js"

async function addmoney(){
    console.clear()
    console.log(chalk.red("================================================="))
    console.log(chalk.blue("\t \t Banking System"))
    console.log(chalk.red("================================================="));
    console.log(chalk.blue("\t \t Add Money"));
    console.log(chalk.red("================================================="));
    console.log(chalk.red("\t \t Should start with Country code"));
    let phone = readLineSync.question("Enter your verified mobile Number")
    while(!phone){
        phone = readLineSync.question("Enter your verified mobile Number")
    }
    let fileData = await fs.readFile("../data.json")
    fileData = JSON.parse(fileData)
    let phonefound =  fileData.find(ele=>ele.phone == phone)
    if(!phonefound){
        throw("Unauthorized Access")
    }
    let deposit = readLineSync.questionInt("Enter the amount of money you want to add:")
    phonefound.balance = phonefound.balance + deposit
    let draw = "-";
    let transaction = {"date": date()+" "+time(),"Added":deposit,"Withdraw":draw,"Balance":phonefound.balance}
    phonefound.transaction.push(transaction)
    fileData.push(phonefound)
    

    await fs.writeFile("../data.json",JSON.stringify(fileData))
    console.log("The balance was successfully Deposited")
    console.log(`The total balance right now = ${phonefound.balance}`)

}


export default addmoney;