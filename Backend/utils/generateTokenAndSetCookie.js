import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '5d'
    });
    res.setHeader("Authorization", token);
    return token
}

export default generateTokenAndSetCookie;