// TODO: Aggiungere aggiornare readme.md ed eliminare tutti gli spazi prima di inserire nel db (nome, cognome, password, email, tel_number)
// ?: Cancellare token dopo la verifica dell'account 

import epxress from "express"
import cors from "cors"
import "dotenv/config"
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"


const app = epxress()

app.use(epxress.json())
app.use(cors({
    origin: "http://localhost:5173", // Specifica l'origine del frontend
    credentials: true // Consenti l'invio dei cookie
}))

app.use("/manager/users", usersRoutes)
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`)
})