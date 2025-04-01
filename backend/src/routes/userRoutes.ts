import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'
import { withAccelerate } from "@prisma/extension-accelerate";

import {signUpSchema, signInSchema} from "@vikashdev/jotter-common"
import { checkAuth } from "../middlewares/auth";

type User = {
  id : number,
  username : string,
  name : string
}
export const userRouter = new Hono<{
    Bindings :{
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables : {
      userInfo : User
  }
}>();

userRouter.get('/profile', checkAuth, (c)=>{
  c.status(200);
  const user = c.get('userInfo');
  return c.json({message : "Authenticated", user});
})




userRouter.post('/signup', async (c)=>{
    // this is to initialize the prisma client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
  
    // get body
    const body = await c.req.json();
    const { success } = signUpSchema.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({message : "Invalid Inputs"})
    }
  
  // insert in user table
    try {
      const user = await prisma.user.create({
        data:{
          username : body.username,
          name : body.name,
          password : body.password
        }
      })
  
      const token = await sign({id:user.id, username : user.username, name : user.name}, c.env.JWT_SECRET);
      c.status(200);
      return c.json({message : `New user ${user.username} created`, token});
    } 
    catch (e :any) {
      if (e.code === 'P2002' && e.meta?.target.includes('username')) {
        // Handle unique constraint violation for username
        c.status(409); // Conflict status code
        return c.json({ message: "Username already exists" });
      } else {
        // Handle other errors
        console.log(e);
        c.status(400);
        return c.json({ message: "Error occurred while creating user" });
      }
    }
  })





  userRouter.post('/signin', async (c)=>{
    // this is to initialize the prisma client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
  
    // get body
    const body = await c.req.json();
    const { success } = signInSchema.safeParse(body);
    if(!success){
      c.status(411)
      c.json({message : "Invalid Input"})
    }
  
  
    try {
      if (!body.username || !body.password) {
        c.status(400);
        return c.json({message : "Invalid Inputs"});
      }
  
      const user = await prisma.user.findFirst({
        where:{
          username : body.username,
          password : body.password
        }
      })
      if(!user){
        c.status(403);
        return c.json({message : "Wrong Credentials"});
      }
  
      const token = await sign({id:user.id, username : user.username}, c.env.JWT_SECRET);
      c.status(200);
      return c.json({message : `SignedIn successful`, token, userId : user.id});
    } 
    catch (e) {
        c.status(400);
        return c.json({message : "Something went wrong"});
    }
  })













  // -----------------------------------------------DANGER-----------------------------------------------------------------------
  userRouter.delete('/', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      try {
        await prisma.user.deleteMany({});
        return c.json({message : "all users deleted successfully"});
      } catch (error) {
        return c.json({message : "Error deleting users"});
      }
  })