import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
config({path:'./.env'});

const app = express();
import "./utils/db_connection.js";
const PORT = process.env.PORT
import cors from 'cors';
import { corsFunction } from "./utils/cors.js";
import TodoRoutes from "./routes/todo.routes.js"

app.use(cors());
app.use(corsFunction);
app.use(json());
app.use(urlencoded({extended: true}));
app.use(TodoRoutes)

app.listen(process.env.PORT || PORT ,()=>{
    console.log(`Server is listening on port ${PORT}`);
})

export default app