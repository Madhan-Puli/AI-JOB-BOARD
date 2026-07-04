import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description?: string;
};

type JobDocument = Omit<Job, "_id"> & {
  _id: ObjectId;
};

function serializeJob(job: JobDocument): Job {
  return {
    _id: job._id.toString(),
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    description: job.description,
  };
}

export async function getJobs() {
  const client = await clientPromise;
  const db = client.db("jobboard");
  const jobs = await db
    .collection<JobDocument>("jobs")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return jobs.map(serializeJob);
}

export async function getJobById(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db("jobboard");
  const job = await db.collection<JobDocument>("jobs").findOne({
    _id: new ObjectId(id),
  });

  return job ? serializeJob(job) : null;
}
