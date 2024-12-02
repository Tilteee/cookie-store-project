import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Cookie {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export async function GET(req: NextRequest) {
  const cookies = db.prepare("SELECT * FROM cookies").all() as Cookie[];
  return NextResponse.json(cookies, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { name, price, imageUrl } = await req.json();

  if (!name || !price || !imageUrl) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  const stmt = db.prepare(
    "INSERT INTO cookies (name, price, imageUrl) VALUES (?, ?, ?)"
  );
  const result = stmt.run(name, price, imageUrl);
  const newCookie = db
    .prepare("SELECT * FROM cookies WHERE id = ?")
    .get(result.lastInsertRowid);

  return NextResponse.json(newCookie, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, name, price, imageUrl } = await req.json();

  if (!id || !name || !price || !imageUrl) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 }
    );
  }

  const cookie = db.prepare("SELECT * FROM cookies WHERE id = ?").get(id);
  if (!cookie) {
    return NextResponse.json(
      { error: "Cookie não encontrado." },
      { status: 404 }
    );
  }

  const stmt = db.prepare(
    "UPDATE cookies SET name = ?, price = ?, imageUrl = ? WHERE id = ?"
  );
  stmt.run(name, price, imageUrl, id);

  const updatedCookie = db
    .prepare("SELECT * FROM cookies WHERE id = ?")
    .get(id);

  return NextResponse.json(updatedCookie, { status: 200 });
}
