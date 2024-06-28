
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { json, LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import { getAllProfessors, getAllCourses, createReview } from "~/util/db";

export async function loader({ request }: LoaderFunctionArgs) {
  const professors = await getAllProfessors();
  const courses = await getAllCourses();
  return json({ professors, courses });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const professor = Number(formData.get('professor')) as number;
  const course = Number(formData.get('course')) as number;
  const rating = Number(formData.get('rating')) as number;
  const comment = formData.get('comment') as string;
  const review = await createReview(professor, course, rating, comment);
  toast.success('Review created');
  return json({ success: true, review });
}