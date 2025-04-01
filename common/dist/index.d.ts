import { z } from 'zod';
export declare const signUpSchema: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signInSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const addBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    title: string;
    content?: any;
}, {
    title: string;
    content?: any;
}>;
export declare const updateBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    title: string;
    content?: any;
}, {
    title: string;
    content?: any;
}>;
export type SignupType = z.infer<typeof signUpSchema>;
export type SigninType = z.infer<typeof signInSchema>;
export type AddBlogType = z.infer<typeof addBlogSchema>;
export type UpdateBlogType = z.infer<typeof updateBlogSchema>;
