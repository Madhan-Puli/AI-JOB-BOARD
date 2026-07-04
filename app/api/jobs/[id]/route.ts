import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Received ID:", id);

    const client = await clientPromise;
    const db = client.db("jobboard");

    const job = await db.collection("jobs").findOne({
      _id: new ObjectId(id),
    });

    console.log("Job Found:", job);

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}