import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { success, z } from 'zod'

export async function POST(request: Request) {
    await dbConnect()
    try {
       const { username, code} = await request.json() 
    } catch (error) {
        console.error("Error Verifying user", error)
        return Response.json({
            success: false,
            message: "ERror verifying user"
        }, {status: 400})
    }
}