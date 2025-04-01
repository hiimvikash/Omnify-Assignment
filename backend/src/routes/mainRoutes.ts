import { Hono } from "hono";
import { userRouter } from "./userRoutes";
import { blogRouter } from "./blogRoutes";


export const mainRouter = new Hono();

mainRouter.get("/health", (c)=>{
    return c.json({ message : "Server is healthy"})
})

mainRouter.route('/user', userRouter);
mainRouter.route('/blog', blogRouter);


