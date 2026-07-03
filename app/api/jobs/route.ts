import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM jobs");

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title, company, location, salary, description } = body;

  await db.query(
    `INSERT INTO jobs(title,company,location,salary,description)
     VALUES(?,?,?,?,?)`,
    [title, company, location, salary, description]
  );

  return NextResponse.json({
    message: "Job Posted Successfully",
  });
}