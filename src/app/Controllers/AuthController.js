import User from "../models/User.js";
import connection from "../../config/db/index.js";
import bcrypt from "bcrypt";
import Auth from "../helpers/Auth.js";
import db from "../../config/db/index.js";

class AuthController {

    index(req, res) {
        res.render('user/login');
    }

    /* REGISTER
    ** path: /auth/resgister
    ** method: POST
    */
    registerForm(req, res) {
        res.render( 'user/register');
    }

    logout(req, res){
         // Clear the cookie named "your-cookie-name"
        res.cookie('token');
        res.redirect('/');
    }


    async register(req, res){
        const {name, password, email} = req.body;
        if(!name || !password || !email){
            return res.status(401).send({error: 'Vui long nhap day du thong tin'});
        }
        console.log(`Email: ${email}`);
        connection.connect().then(async (db) =>{
            try{
                const result = await User.isAvailable(db, email);
                console.log(`Result: ${result}`);
                if (result) {
                    console.log('Email is already taken');
                    return res.status(401).json({message: 'Email is already taken'});
                }else{
                    bcrypt.hash(req.body.password, 10, function(err, hash){
                        if(err){
                            console.log(`Error: ${err}`);
                        }else{
                            console.log(`Hash: ${hash}`);
                            connection.connect().then(async (db) =>{
                                const user = new User(undefined, req.body.name, req.body.email, hash);
                                user.save(db).then((result) =>{
                                    console.log(`InsertID: ${result.insertedId}`);
                                    res.json(result);
                                });
                            });
                        }
                    });
                }
            }catch(err){

            }
        });
    }

    /* LOGIN
    ** path: /auth/login
    ** method: POST
    */
    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`Email: ${email} | Password: ${password}`);
        connection.connect().then(async (db) => {
            try {
                const user = await User.findByEmail(db, email);
                if(!user){
                    return  res.status(401).send({ auth: false, message: 'Tài khoản Không tồn tại'});
                }
                console.log(typeof user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (result) {
                            // create token
                            const token = Auth.createJWTToken(email);
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: false, // false if not using https | true if using https
                                sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                maxAge: 3600000, // expired time, should set to match token expiry (1h)
                            });
                            console.log('Login successful');
                            // res.json({ message: 'Login successful', token: token});
                            res.redirect('/posts');
                        } else {
                            console.log('Login failed');
                            res.json({ message: 'Login failed' });
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        });
    }

    
}

export default new AuthController();