import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { checkAuth } from "../middlewares/auth";
import { addBlogSchema, updateBlogSchema } from "@vikashdev/jotter-common";

type User = {
    id : number,
    username : string,
    name : string
}

export const blogRouter = new Hono<{
    Bindings :{
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userInfo : User
    }
}>();




// create BLOG
blogRouter.post("/", checkAuth, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = c.get('userInfo');
    const body = await c.req.json();
    const { success } = addBlogSchema.safeParse(body);
    if(!success){
      c.status(411)
      c.json({message : "Invalid Input"})
    }
    try {
        const blog = await prisma.blog.create({
            data:{
                title : body.title,
                content : body.content,
                authorId : user.id
            },
            select:{
                id: true,
                title : true,
                content : true,
                createdAt : true,
                authorId : true,
                author : {
                    select :{
                        username : true
                    }
                }
            }
        })
        c.status(201);
        return c.json(blog);
    } catch (e) {
        c.status(406);
        return c.json({message : "Error while inserting"})
    }
})

// update BLOG given blogId & authorId
blogRouter.put("/:blogId", checkAuth, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('blogId');
    const user = c.get("userInfo");
    const body = await c.req.json();
    const { success } = updateBlogSchema.safeParse(body);
    if(!success){
      c.status(411)
      c.json({message : "Invalid Input"})
    }
    try {
        const blog = await prisma.blog.update({
            where:{
                id : parseInt(blogId),
                authorId : user.id
            },
            data:{
                title : body.title,
                content : body.content
            },
            select:{
                id: true,
                title : true,
                content : true,
                createdAt : true,
                authorId : true,
                author : {
                    select :{
                        username : true
                    }
                }
            }
        })
        c.status(201);
        return c.json(blog);
    } catch (e) {
        c.status(406);
        return c.json({message : "Error while updating"})
    }
})


// get MYBLOGS only 
blogRouter.get("/myblogs", checkAuth, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = c.get("userInfo");

    try {
        const blog = await prisma.blog.findMany({
            where :{
                authorId : user.id
            },
            orderBy: {
                createdAt: 'desc' // Sort by createdAt property in descending order
            },
            select:{
                id: true,
                title : true,
                createdAt : true,
                authorId : true,
                author : {
                    select :{
                        username : true
                    }
                }
            }
        })
        if(blog.length === 0){
            return c.json({message : "No Blogs found associated to your account"})
        }
        c.status(200);
        return c.json(blog);
    } catch (e) {
        console.log(e);
        c.status(404);
        return c.json({message : "Error while fethching blogs"})
    }
})


// get ALLBLOGS from DB
blogRouter.get("/bulk", async (c) => {
    const page = Number(c.req.query("page")) || 1;  // Default page is 1
    const limit = Number(c.req.query("limit")) || 9;  // Default limit is 9
    const skip = (page - 1) * limit;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findMany({
            skip,       // Skip previous pages
            take: limit, // Limit results per page
            orderBy: {
                createdAt: 'desc' // Sort by createdAt in descending order
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                authorId: true,
                author: {
                    select: {
                        username: true,
                        name: true
                    }
                }
            }
        });

        const totalBlogs = await prisma.blog.count(); // Get total blog count

        if (blog.length === 0) {
            return c.json({ message: "No blogs found" });
        }

        return c.json({
            page,
            limit,
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs,
            blogs: blog
        });

    } catch (e) {
        console.log(e);
        return c.json({ message: "Error while fetching blogs" }, 500);
    }
});


// get singleBLOG from DB
blogRouter.get("/:blogId", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('blogId')

    try {
        const blog = await prisma.blog.findFirst({
            where:{
                id : parseInt(blogId)
            },
            select:{
                id: true,
                title : true,
                content : true,
                createdAt : true,
                authorId : true,
                comments : true,
                author : {
                    select :{
                        username : true
                    }
                }
            }
        })
        if(!blog){
            throw new Error();
        }
        c.status(200);
        return c.json(blog);
    } catch (e) {
        c.status(404);
        return c.json({message : e})
    }
})

blogRouter.delete("/:blogId", checkAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('blogId');
    const user = c.get("userInfo");

    try {
        // Verify if the blog exists and if the user is the author
        const blog = await prisma.blog.findFirst({
            where: {
                id: parseInt(blogId),
                authorId: user.id
            }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found or you are not authorized to delete this blog" });
        }


        // delete the comments
        await prisma.comment.deleteMany({
            where:{
                blogId : parseInt(blogId)
            }
        });
        // Delete the blog
        await prisma.blog.delete({
            where: {
                id: parseInt(blogId)
            }
        });
        

        c.status(200);
        return c.json({ message: "Blog deleted successfully" });
    } catch (e) {
        c.status(500);
        return c.json({ message: e });
    }
});









// -----------------------------------------------COMMENTS-----------------------------------------------------------------------


blogRouter.post("/:blogId/addcomment", checkAuth, async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = c.get('userInfo');
    const body = await c.req.json();
    const blogId = c.req.param('blogId');

    try {
        const comment = await prisma.comment.create({
            data:{
                comment : body.comment,
                commentorId : user.id,
                commentorUsername : user.username,
                blogId: parseInt(blogId)
            },
            select : {
                comment:true,
                commentorId : true,
                commentorUsername : true,
                blogId:true,
                createdAt:true,
                id:true
            }
        })
        c.status(201);
        return c.json(comment);
    } catch (error) {
        c.status(406);
        return c.json({message : "Error while adding comments"})
    }
})




blogRouter.delete("/comment/:commentId", checkAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = c.get('userInfo');
    const commentId = c.req.param('commentId');

    try {
        // Find the comment to ensure it exists and belongs to the user
        const comment = await prisma.comment.findUnique({
            where: {
                id: parseInt(commentId),
            },
            select: {
                commentorId: true,
            },
        });

        if (!comment) {
            c.status(404);
            return c.json({ message: "Comment not found" });
        }

        // Check if the user is the owner of the comment
        if (comment.commentorId !== user.id) {
            c.status(403);
            return c.json({ message: "You are not authorized to delete this comment" });
        }

        // Delete the comment
        await prisma.comment.delete({
            where: {
                id: parseInt(commentId),
            },
        });

        c.status(200);
        return c.json({ message: "Comment deleted successfully" });
    } catch (error) {
        c.status(406);
        return c.json({ message: "Error while deleting the comment" });
    }
});

























// -----------------------------------------------DANGER-----------------------------------------------------------------------
blogRouter.delete('/', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try {
        await prisma.blog.deleteMany({});
        return c.json({message : "all blogs deleted successfully"});
      } catch (error) {
        return c.json({message : "Error deleting blogs"});
      }
})