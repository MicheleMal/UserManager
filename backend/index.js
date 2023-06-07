//FIXME: Sistemare tutti i return
import epxress from "express"
import cors from "cors"
import "dotenv/config"
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"

const app = epxress()

app.use(epxress.json())
app.use(cors())

app.use("/manager", usersRoutes)
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`)
})