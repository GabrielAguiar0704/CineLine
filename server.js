import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pkg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { Pool } = pkg;

const app = express();
const PORT = 5432;
dotenv.config();
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
console.log(PASSWORD);
const DATABASE = process.env.DB_DATABASE;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
    user: USER,
    host:  HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT
});

// TEST BD. //well... this above should be just a connection test, but after some tests I concluded that's nescessary to start the connection. Is something about lazy connection
pool.query('SELECT 1')
    .then(() => console.log("BD connected!"))
    .catch((err) => console.error("Algo deu errado:", err));

// pool.query(`
//     CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     user_name varchar(31),
//     user_username varchar(15),
//     user_password varchar(31),
//     user_mail varchar(31)
//     );
// `)
//     .then(() => console.log("Table user created with successful."))
//     .catch((error) => console.log("Erro L47: ", error));

// CREATE TABLE USERS below


// CREATE TABLE reviews
// pool.query(`
//     CREATE TABLE reviews (
//         review_id SERIAL PRIMARY KEY,
//         user_id int NOT NULL,
//         review_name varchar(100),
//         review_type varchar(15),
//         review_genre varchar(15),
//         review_content text
//     );
//     `)
//     .then(() => console.log("Table reviews created with successful"))
//     .catch((error) => console.log(error));

const result = await pool.query('SELECT * FROM users');
console.log(result.rows);

const result_reviews = await pool.query('SELECT * FROM reviews');
console.log(result_reviews.rows);

//ROUTES

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await pool.query(`
        SELECT * FROM users WHERE user_username = $1
        `,
    [username]);
    const user = await result.rows[0];
    if(user.user_password != password){
        res.json({
            success: false,
            message: 'Login negado'
        })
    }
    if(user.user_password == password){
        res.json({
            success: true,
            message: 'Login autenticado'
        })
    }
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/public/signup.html")
})

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const mail = req.body.mail;
    pool.query(`
        INSERT INTO users (user_username, user_name, user_password, user_mail)
        VALUES ($1, $2, $3, $4)
        `,
        [username, name, password, mail])
    .then(() => {
        res.json({
            success: true,
        })
    })
    console.log(name, username, mail, password);
})

app.get('/cineline', (req, res) => {
    res.sendFile(__dirname + "/public/main.html");
})

app.get('/create', (req, res) => {
    res.sendFile(__dirname + "/public/create.html");
})

app.post('/create', (req, res) => {
    const title = req.body.title;
    const type = req.body.type;
    const genre = req.body.genre;
    const content = req.body.content;
    console.log(title, type, genre, content);
    pool.query(`
        INSERT INTO reviews(user_id, review_name, review_type, review_genre, review_content)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [0, title, type, genre, content])
})

app.post('/cineline', (req, res) => {
    console.log('post works')
    pool.query('SELECT * FROM reviews')
    .then(result => {
        const content = result.rows;
        console.log(content);
        res.json(content);
    })
})

app.get('/user', (req, res) => {
    res.sendFile(__dirname + "/public/user.html");
})

app.listen(5000, () =>{
    console.log("Server running at port: " + 5000)
})