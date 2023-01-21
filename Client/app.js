import readLineSync from "readline-sync"
import chalk from "chalk"
import fs from "fs/promises"
import usercreate from "./users/usercreate.js"
import userlogin from "./users/userlogin.js"
import userdelete from "./users/userdelete.js"

async function displaymenu(){
    console.clear()
    console.log(chalk.red("================================================="))
    console.log(chalk.blue("\t \t Banking System"))
    console.log(chalk.red("================================================="));
    console.log(chalk.blue("\t \t Main Menu"));
    console.log(chalk.red("================================================="));
    console.log(chalk.yellow("Select the operation you want to perform:"))
    console.log(`
    1.Account Create
    2.User Login
    3.Delete Account
    4.Exit\n`);
    let opt = readLineSync.questionInt("Enter the operation you want to perform:")
    switch(opt){
        case 1:
            console.log("Account Create")
           await usercreate()
           break;
        case 2:
            console.log("User Login")
            await userlogin()
            break;
        case 3:
            console.log("Delete Account")
            await userdelete()
            break;
        case 4:
            console.log(chalk.red("Thank You for using Our CLI Application"))
            return
        default:
        console.log("Invalid options");
    }

}
displaymenu()
export default displaymenu;