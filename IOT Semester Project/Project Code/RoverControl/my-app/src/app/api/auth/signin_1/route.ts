// File: src/app/api/auth/signin/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    console.log("a");
  const body = await req.json();
  const { email, password } = body;
    console.log(email);
  const user = await prisma.user.findUnique({ where: { email } });
console.log(user);
// window.alert(email);
//   if (!user) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   }

//   const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

//   if (!passwordMatch) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   }

//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
//     expiresIn: '7d',
//   });

  return NextResponse.json({ message: 'Login successful' });
}
