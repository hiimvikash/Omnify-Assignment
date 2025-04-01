import { Hono } from 'hono'
import { mainRouter } from './routes/mainRoutes';
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());
app.route('/api/v1', mainRouter);

app.get("/*", (c)=>{
    return c.json({message : "You're lost"})
})


export default app
