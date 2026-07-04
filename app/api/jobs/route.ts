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
    const requiredFields = ["title", "company", "location", "salary", "description"];

    for (const field of requiredFields) {
      if (!body[field] || !body[field].toString().trim()) {
        return Response.json(
          {
            error: "Missing required field",
            details: `${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    const salaryInput = body.salary.toString().replace(/\s+/g, " ").trim();
    const salary = salaryInput.toUpperCase().includes("LPA")
      ? salaryInput
      : `${salaryInput} LPA`;

    const result = await db.collection("jobs").insertOne({
      title: body.title.toString().trim(),
      company: body.company.toString().trim(),
      location: body.location.toString().trim(),
      salary,
      description: body.description.toString().trim(),
      createdAt: new Date(),
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
