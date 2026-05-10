import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pkg from 'pg';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jwt = jsonwebtoken;
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

pool.query(`
    CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name varchar(31),
    user_username varchar(15),
    user_password varchar(127),
    user_mail varchar(31)
    );
`)
    .then(() => console.log("Table user created with successful."))
    .catch((error) => console.log("Erro L47: ", error));// CREATE TABLE USERS below


// CREATE TABLE reviews
pool.query(`
    CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        user_id int NOT NULL,
        review_name varchar(100),
        review_type varchar(15),
        review_genre varchar(15),
        review_content text
    );
    `)
    .then(() => console.log("Table reviews created with successful"))
    .catch((error) => console.log(error));

const result = await pool.query('SELECT * FROM users');
console.log(result.rows);

const result_reviews = await pool.query('SELECT * FROM reviews');
console.log(result_reviews.rows);

//AUTHENTICATION FUNCTION

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

// CREATE TOKEN

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

//ROUTES

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

// LOGIN ROUTE

app.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await pool.query(`
        SELECT * FROM users WHERE user_username = $1
        `,
    [username])
    const user = await result.rows[0];
    console.log(user);
    if(user !== undefined){ 
        const isMatch = await bcrypt.compare(password, user.user_password)
        if(isMatch){
            const userid = user.user_id
            const accessToken = generateAccessToken(userid)
            console.log(accessToken)
            res.json({
                success: true,
                message: 'Login autorizado',
                id: userid,
                access_token: accessToken
            })
        }
        else{
            res.json({
                success: false,
                message: 'Login negado'
            })
        }
    }
    else{
        res.json({
            success: false,
            message: 'Login negado'
        })
        
    }
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/public/signup.html")
})

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10)
    const name = req.body.name;
    const mail = req.body.mail;
    const result = await pool.query(`
        SELECT * FROM users WHERE user_username = $1
        `,
        [username])
    const user = await result.rows[0];
    if(user == undefined) {
        pool.query(`
            INSERT INTO users (user_username, user_name, user_password, user_mail)
            VALUES ($1, $2, $3, $4)`,
            [username, name, hash, mail])
        .then(() => {
            res.json({
                success: true,
            })
            console.log(name, username, mail, password);
        })
    }
    else {
        res.json({
            success: false,
            })
    }
})

app.get('/cineline', (req, res) => {
    res.sendFile(__dirname + "/public/main.html");
})

app.get('/create', (req, res) => {
    res.sendFile(__dirname + "/public/create.html");
})

app.post('/create', authenticateToken, (req, res) => {
    const title = req.body.title;
    const type = req.body.type;
    const genre = req.body.genre;
    const content = req.body.content;
    const userid = req.body.user_id;
    console.log(title, type, genre, content);
    try {
        pool.query(`
            INSERT INTO reviews(user_id, review_name, review_type, review_genre, review_content)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [userid, title, type, genre, content])
            res.json({
                success: true,
            })
        
    }
    catch(error){
        console.log(error);
    }
})

app.post('/cineline', authenticateToken, (req, res) => {
    pool.query('SELECT * FROM reviews')
    .then(result => {
        const content = result.rows;
        console.log(content);
        res.json(content);
    })
})

// app.get('/user', (req, res) => {
//     res.sendFile(__dirname + "/public/user.html");
// })

app.get('/review', (req, res) => {
    res.sendFile(__dirname + "/public/review.html");
})

app.post('/review', authenticateToken, (req, res) => {
    const id = req.body.review_id;
    pool.query(`
        SELECT * FROM reviews
        WHERE review_id = $1
        `,
        [id])
    .then(result => {
        const review = result.rows[0];
        const userid = review.user_id;
        pool.query(`
            SELECT * FROM users
            WHERE user_id = $1
            `,
            [userid])
        .then(result => {
            const user = result.rows[0];
            const username = user.user_name;
            res.json({
                user: username,
                review: review
        });
        })
    })
})

app.listen(5000, () =>{
    console.log("Server running at port: " + 5000)
})