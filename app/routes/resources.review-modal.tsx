
import { useState, useMemo } from "react";
import { json, LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import { getAllProfessors, getAllCourses, createReview } from "~/util/db";
import { Label } from "~/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Star as StarIcon } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import ComboBox from "~/components/ComboBox";

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
  return redirect(`/professors/${professor}`);
}