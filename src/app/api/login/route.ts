import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const user = await db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, "1234", {
      expiresIn: "1h",
    });

    console.log(token);

    return NextResponse.json(
      {
        message: "Login bem-sucedido.",
        token,
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao processar login." },
      { status: 500 }
    );
  }
}
