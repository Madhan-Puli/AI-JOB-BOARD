import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getJobs } from "@/lib/jobs";

export async function GET() {
  try {
    const jobs = await getJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch jobs",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("jobboard");

    const body = await req.json();

    const salary = body.salary.toString().includes("LPA")
      ? body.salary
      : `${body.salary} LPA`;

    const result = await db.collection("jobs").insertOne({
      title: body.title,
      company: body.company,
      location: body.location,
      salary,
      description: body.description,
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("POST ERROR:", error);

    return Response.json(
      {
        error: "Failed to post job",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
