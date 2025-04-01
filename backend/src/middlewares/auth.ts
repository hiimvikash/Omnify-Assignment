import { Context, Next } from "hono";
import { verify } from "hono/jwt";


export async function checkAuth(c : Context, next : Next){
    try {
        const authHeader = c.req.header("Authorization") || "";
        const token = authHeader.split(" ")[1];
        const user = await verify(token, c.env.JWT_SECRET);
        if(user){
            c.set("userInfo", user);
            return await next();
        }
    } catch (error) {
        c.status(403);
        return c.json({message : "Unauthenticated"});
    }
}