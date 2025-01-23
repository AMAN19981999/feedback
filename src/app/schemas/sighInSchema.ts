import {z}  from "zod";


export const sighnInSchema = z.object({
    identifier:z.string(),
    password:z.string(),
})