import {resend} from "@/app/lib/resend";
import VerificationEmail from "../../../email/Verificationemail";

import { ApiResponse } from "@/app/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifycode:string
):  Promise<ApiResponse>{

    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject:' Verifcation code',
            react: VerificationEmail({username , otp:verifycode}),
          });






        return {success:true,message:' sent verifiaction email'}
        
    } catch (emailError) {
        console.error("Error sending email",emailError)
        return {success:false,message:'failed to send verifiaction email'}
        
    }
}