import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userName = searchParams.get("userName");

    if (!userName) {
      return NextResponse.json(
        {
          success: false,
          message: "userName is Required",
        },
        { status: 400 }
      );
    }

    const checkUserNameExist = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (checkUserNameExist) {
      return NextResponse.json({
        success: false,
        message: "userName Already Exist",
      });
    }

    return NextResponse.json({
      success: false,
      message: "userName Not Exist",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create resource",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
