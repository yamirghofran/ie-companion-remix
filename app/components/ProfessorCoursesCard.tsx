  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card"
  import { Link } from "@remix-run/react";
  import type { Course } from "~/types/Course";
  
  function CourseItem({ course }: { course: Course }) {
    return (
        <Link to={`/courses/${course.id}`} className="my-0 py-0">
        <div className="flex items-center gap-4 hover:text-primary hover:cursor-pointer">
            <div className="flex flex-col items-start gap-1">
              <p className="text-sm font-medium leading-none">{course.name}</p>
            </div>
          </div>
          </Link>
    )
  }

  export default function ProfessorCoursesCard({ courses }: { courses: Course[] }) {
    return (
      <Card className='w-full md:max-w-xs  md:mr-16 mt-6 md:mt-0 h-fit'>
        <CardHeader>
          <CardTitle>{courses.length > 1 ? 'Professor Courses' : 'Professor Course'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            {courses.map((course, index) => <CourseItem course={course} key={course.id} />)}
        </CardContent>
      </Card>
    )
  }
  