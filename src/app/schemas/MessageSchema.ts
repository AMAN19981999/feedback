import {z}  from "zod";


export const MessageSchema = z.object({

        content:z
        .string()
        .min(10,{message:"content must be atleast 10 chrcater"})
        .max(300,{message:"content must be less than 300 chracter"})

   
})