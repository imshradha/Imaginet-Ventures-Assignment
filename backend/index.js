import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connection from "./database/db.js";
import routes from './route/route.js';

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connection(username, password);

app.use('/', routes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listing on ${PORT}`)
})