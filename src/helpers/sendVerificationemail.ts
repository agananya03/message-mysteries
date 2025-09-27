import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        
    } catch (emailError) {
        console.log("Error sending verification email", emailError)
        return {success: false, message: "failed to send verification email"}
    }
}