import mysql from "mysql2"
import "dotenv/config"

export const connection = mysql.createConnection({
    host: process.env.hostDev,
    user: process.env.userDev,
    password: process.env.pwDev,
    database: process.env.dbDev
})


connection.connect((error)=>{
    if(error){
        console.error(`Error connecting to database ${error}`)
    }else{
        console.log("Stable database connection successfully")
    }
})

export default connection