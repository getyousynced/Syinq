import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import authOptions from '@/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'
import type { Session } from "next-auth";

export async function POST(req: NextRequest) {
  try {
    const session: Session | null = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ 
        message: 'Unauthorized' 
      }, { status: 401 })
    }

    const { userName, phoneNumber, gender, dateOfBirth, role } = await req.json()

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        userName,
        phoneNumber,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        role: role as Role,
      }
    })

    return NextResponse.json({ 
      success: true, 
      user: updatedUser 
    })

  } catch (error) {
    console.error('Profile completion error:', error)
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}
