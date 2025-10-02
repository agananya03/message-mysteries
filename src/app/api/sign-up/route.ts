import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { success } from "zod";


export async function POST(request: Request){
    await dbConnect()
    try {
        const {username, email, password} = await request.json()
        const existinguserVerifiedbyUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if(existinguserVerifiedbyUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        }
        const existingUserbyEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUserbyEmail) {

        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: boolean;
                isAcceptingMessage: boolean;
                messages: Message[] 
            })
        }
    } catch (error) {
        console.error('Error while registering user', error)
        return Response.json({
            success: false,
            message: "Error while registering user"
        },
        {
            status: 500
        }
    )
    }
}