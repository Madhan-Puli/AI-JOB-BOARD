import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [rows]: any = await db.query(
    "SELECT * FROM jobs WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Job not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows[0]);
}