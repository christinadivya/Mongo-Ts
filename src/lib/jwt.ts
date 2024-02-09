import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = 'w5BwL6gkd2nm7F6Hc3QrtKXJ8rKHy42T'; // Change this to your secret key

export function generateToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

export function verifyToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded: JwtPayload) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}
