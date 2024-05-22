import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config()
export let sign = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload,
            process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
                algorithm: 'HS256' 
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export let verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}