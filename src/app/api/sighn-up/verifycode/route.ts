import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
// import { z } from "zod";
// import { usernameValidation } from "@/app/schemas/sighnUpSchema";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decoded = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decoded });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Error usernotound",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;

    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "verification fail please sighnup again",
        },
        { status: 400 }
      );
    }

    else{

        return Response.json(
            {
              success: false,
              message: "incorrecte verifcation",
            },
            { status: 400 }
          );

    }



  } catch (error) {
    console.error("Error verfying user:", error);
    return Response.json(
      {
        success: false,
        message: "Error veryfying username",
      },
      { status: 500 }
    );
  }
}
