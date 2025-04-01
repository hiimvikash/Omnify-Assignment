"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.addBlogSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    name: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6)
});
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6)
});
exports.addBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.any()
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.any()
});
