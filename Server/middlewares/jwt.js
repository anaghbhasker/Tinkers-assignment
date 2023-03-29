import jwt from "jsonwebtoken";

export async function generateAuthToken(user) {
    const jwtSecretKey = "mern_stack"
    const token = jwt.sign(
        { _id: user._id, email: user.email },
        jwtSecretKey
    );
    return token;
    }

    export async function verifyToken(req,res,next) {
        try {
            const token=req.headers["ownertoken"]
            if (!token) {
                res.json({ status: "failed", message: "You Login first" });
            }else{
                const decoded = jwt.verify(token, "mern_stack");
                const userId = decoded._id;
                next()
            }
            } catch (err) {
            res.js0
            }
        }