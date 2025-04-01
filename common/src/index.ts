import {z} from 'zod';

export const signUpSchema = z.object({
    username : z.string().min(3),
    name : z.string().optional(),
    password : z.string().min(6)
});
export const signInSchema = z.object({
    username : z.string().min(3),
    password : z.string().min(6)
});
export const addBlogSchema = z.object({
    title : z.string(),
    content : z.any()
});
export const updateBlogSchema = z.object({
    title : z.string(),
    content : z.any()
});


export type SignupType = z.infer<typeof signUpSchema>;
export type SigninType = z.infer<typeof signInSchema>;
export type AddBlogType = z.infer<typeof addBlogSchema>;
export type UpdateBlogType = z.infer<typeof updateBlogSchema>;

