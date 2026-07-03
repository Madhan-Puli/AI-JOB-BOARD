import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM jobs");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("DB ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch jobs",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}