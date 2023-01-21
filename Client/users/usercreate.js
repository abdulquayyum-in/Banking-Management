import readLineSync from "readline-sync"
import chalk from "chalk"
import fs from "fs/promises"

async function usercreate(){
    console.clear()
    console.log(chalk.red("================================================="))
    console.log(chalk.blue("\t \t Banking System"))
    console.log(chalk.red("================================================="));
    console.log(chalk.blue("\t \t User Create"));
    console.log(chalk.red("================================================="));
    let name = readLineSync.question("Enter your name:")
    while(!name){
        name = readLineSync.question("Enter your name:")
    }
    let phone = readLineSync.question("Enter Your phone Number:")
    while(!phone){
        phone = readLineSync.question("Enter Your phone Number:")
    }
    let aadhar = readLineSync.question("Enter Your Aadhar Number:")
    while(!aadhar){
        aadhar = readLineSync.question("Enter Your Aadhar Number:")
    }
    let pancard = readLineSync.question("Enter Your pancard No:")
    while(!pancard){
        pancard = readLineSync.question("Enter Your pancard No:")
    }
    let passcode = readLineSync.questionInt("Enter Your Passcode",{max:4})
    if(!passcode){
        passcode = readLineSync.questionInt("Enter Your Passcode",{max:4})
    }

    let data = {name,phone,aadhar,pancard,balance:0,passcode,transaction:[]}

    let fileData = await fs.readFile("data.json")
    fileData = JSON.parse(fileData)

    let userfound = await fileData.find(ele=>ele.phone == phone)
    if(userfound){
        throw("Account already Exist")
    }else{

        fileData.push(data)
        await fs.writeFile("../data.json",JSON.stringify(fileData))
        console.log("Thank You for Registering at our Bank")
    }


}

// usercreate()
export default usercreate;