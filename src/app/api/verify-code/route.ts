import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { success, z } from 'zod'

export async function POST(request: Request) {
    await dbConnect()
    try {
       const { username, code} = await request.json() 
       const decodedUsername = decodeURIComponent(username)
       const user = await UserModel.findOne({username: decodedUsername})
       if(!user) {
        return Response.json({
                    success: false,
                    message: "User not found"
                }, {status: 500})
       }
       const isCodeValid = user.verifyCode === code
       const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
       if(isCodeNotExpired && isCodeValid) {
        user.isVerified = true
        await user.save()
        return Response.json({
                    success: true,
                    message: "Account Verified successfully"
                }, {status: 200})
       } else if(!isCodeNotExpired) {
        return Response.json({
            success: false,
            message: "Verification Code has expired, please signup again"
        }, {status: 400})
       } else {
        return Response.json({
                    success: false,
                    message: "Incorrect Verification Code. Try another code"
                }, {status: 400})
       }
    } catch (error) {
        console.error("Error Verifying user", error)
        return Response.json({
            success: false,
            message: "ERror verifying user"
        }, {status: 500})
    }
}