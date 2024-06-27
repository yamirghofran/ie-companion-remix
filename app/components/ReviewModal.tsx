import { useState, useMemo, useEffect } from "react";
import { Label } from "~/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Star as StarIcon } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import ComboBox from "~/components/ComboBox";
import { useLoaderData, useFetcher, Fetcher, Form, useNavigation } from "@remix-run/react";
import { Professor, ProfessorWithRelations } from "~/types/Professor";
import { Course, CourseWithRelations } from "~/types/Course";
import { useReviewModal } from "~/context/ReviewModalContext";

type FetcherData = {
    professors: ProfessorWithRelations[];
    courses: CourseWithRelations[];
};

export default function ReviewModal() {
    const { open, setOpen } = useReviewModal();
    const fetcher = useFetcher<FetcherData>();
    const [rating, setRating] = useState(0);
    const { professors = [], courses = [] } = fetcher.data || { professors: [], courses: [] };
    const [professor, setProfessor] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const navigation = useNavigation();

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/resources/review-modal");
        }
    }, [fetcher]);

    useEffect(() => {
      if (navigation.state === "loading" && navigation.formAction === "/resources/review-modal") {
        setOpen(false);
        // Optionally reset form state here
        setRating(0);
        setProfessor("");
        setCourse("");
      }
    }, [navigation.state, navigation.formAction, setOpen]);

    const allProfessors = useMemo(() => 
        professors?.map(prof => ({ id: prof.id.toString(), label: prof.name }))
            ?.sort((a, b) => a.label.localeCompare(b.label)) || [],
        [professors]
    );

    const allCourses = useMemo(() => 
        courses?.map(course => ({ id: course.id.toString(), label: course.name }))
            ?.sort((a, b) => a.label.localeCompare(b.label)) || [],
        [courses]
    );

    const professorOptions = useMemo(() => {
        if (course) {
            const selectedCourse = courses.find(c => c.id.toString() === course);
            if (selectedCourse && selectedCourse.professors) {
                const filteredProfessors = selectedCourse.professors.map(p => ({
                    id: p.professor.id.toString(),
                    label: p.professor.name
                })).sort((a, b) => a.label.localeCompare(b.label));
                
                if (filteredProfessors.length === 1) {
                    setProfessor(filteredProfessors[0].id);
                }
                
                return filteredProfessors;
            }
        }
        return allProfessors;
    }, [course, courses, allProfessors, setProfessor]);

    const courseOptions = useMemo(() => {
        if (professor) {
            const selectedProfessor = professors.find(p => p.id.toString() === professor);
            if (selectedProfessor && selectedProfessor.courses) {
                const filteredCourses = selectedProfessor.courses.map(c => ({
                    id: c.course.id.toString(),
                    label: c.course.name
                })).sort((a, b) => a.label.localeCompare(b.label));
                
                if (filteredCourses.length === 1) {
                    setCourse(filteredCourses[0].id);
                }
                
                return filteredCourses;
            }
        }
        return allCourses;
    }, [professor, professors, allCourses, setCourse]);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="h-8 my-2">
            Write a Review
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm rounded-lg md:max-w-[600px]">
          <Form method="post" action="/resources/review-modal">
          <DialogHeader className="mb-4">
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
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
          <div className="flex items-center gap-2 my-2 ml-2">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                className={`size-5 hover:cursor-pointer ${index < rating ? "text-primary" : "text-white"}`}
                fill="currentColor"
                stroke={index < rating ? "currentColor" : "black"}
                strokeWidth={1.5}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          {(professor && course) && <div className="flex justify-end">
            <Button variant="outline" className="h-8 mb-2" onClick={() => {
                setRating(0);
                setProfessor("");
                setCourse("");
            }}>
              Clear
            </Button>
          </div>}
          <input type="hidden" name="rating" value={rating} />
          <Textarea placeholder="Write your review here..." rows={10} name="comment" />
          <DialogFooter className="my-4">
            <Button type="submit">Post Review</Button>
          </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
