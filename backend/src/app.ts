import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

// Add this to see incoming requests in 'pm2 logs'
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Match both with and without trailing slash
app.use("/api/users", userRoutes)

export default app