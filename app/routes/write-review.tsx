import { useState, useMemo } from 'react';
import { json, ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { getAllProfessors, getAllCourses } from '~/util/db';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Form } from '@remix-run/react';
import { Professor } from '~/types/Professor';
import { Course } from '~/types/Course';
import ComboBox from '~/components/ComboBox';
import SimpleComboBox from '~/components/SimpleComboBox';
import { Star as StarIcon } from "lucide-react";
import { createReview } from '~/util/db';

export const loader = async ({ request }: LoaderFunctionArgs) => {
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

function WriteReview() {
    const [rating, setRating] = useState(0);
    const { professors, courses } = useLoaderData<typeof loader>();
    const [professor, setProfessor] = useState<string>("");
    const [course, setCourse] = useState<string>("");



    const allProfessors = professors?.map(prof => ({ id: prof.id.toString(), label: prof.name }))?.sort((a, b) => a.label.localeCompare(b.label)) || [];
    const allCourses = courses?.map(course => ({ id: course.id.toString(), label: course.name }))?.sort((a, b) => a.label.localeCompare(b.label)) || [];

    const professorOptions = useMemo(() => {
        if (course) {
            return allProfessors.filter(prof => 
                professors.find(p => 
                    p.id.toString() === prof.id && 
                    p.courses.some(c => c.course.id.toString() === course)
                )
            );
        }
        return allProfessors;
    }, [course, allProfessors, professors]);

    const courseOptions = useMemo(() => {
        if (professor) {
            const selectedProfessor = professors.find(p => p.id.toString() === professor);
            if (selectedProfessor) {
                return allCourses.filter(c => 
                    selectedProfessor.courses.some(pc => pc.course.id.toString() === c.id)
                );
            }
        }
        return allCourses;
    }, [professor, professors, allCourses]);


    return (
        <div className='w-full flex justify-center items-center h-screen'>
            <Card className='max-w-xl w-full'>
                <Form method='post'>
                <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2">
            <div className=" col-span-1 flex flex-col space-y-1">
              <Label className="text-sm font-medium" htmlFor="manager">
                Professor
              </Label>
              <ComboBox  name='professor' placeholder="Select professor" options={professorOptions} value={professor} setValue={setProfessor} />
            </div>
            <div className="col-span-1 flex flex-col space-y-1">
              <Label className="text-sm font-medium" htmlFor="manager">
                Course
              </Label>
              <ComboBox name='course' placeholder="Select course" options={courseOptions} value={course} setValue={setCourse} />
            </div>
        </div>
        <div className="flex items-center gap-2 my-4 py-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <StarIcon
              key={index}
              className={`w-6 h-6 hover:cursor-pointer`}
              fill={index < rating ? "currentColor" : "none"}
              stroke={index < rating ? "currentColor" : "#718096"}
              strokeWidth={1.5}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
                <Textarea placeholder="Write your review here..." rows={10} name='comment' />
                </CardContent>
                <CardFooter>
                    <Button type='submit'>Submit</Button>
                </CardFooter>
                </Form>
            </Card>
        </div>
    );
}

export default WriteReview;