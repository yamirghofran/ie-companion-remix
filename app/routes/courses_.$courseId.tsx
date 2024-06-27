import SkeletonText from '~/components/SkeletonText';
import Reviews from '~/components/Reviews';
import CourseProfessorsCard from '~/components/CourseProfessorsCard';
import CourseMaterial from '~/components/CourseMaterial';
import { useNavigation } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCourse } from '~/util/db';
import invariant from 'tiny-invariant';
import { MetaFunction } from "@remix-run/node";
import { Course as CourseType} from "~/types/Course";

export const loader = async ({ params }: { params: { courseId: string } }) => {
    invariant(params.courseId, 'Expected params.courseId to be a string');
    const course = await getCourse(parseInt(params.courseId));
    return json({ course });
};


export const meta = ({ data }: { data: { course: CourseType | undefined | null } }) => {
  if (!data || !data.course) {
    return [
      { title: "Course Not Found" },
      { description: "Sorry, we couldn't find that product." },
    ];
  }

  const { course } = data;

  return [
    { title: `${course.name}` },
    { description: "Courses" },
    { "og:title": course.name },
  ];
};


function Course() {
    const { course } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
  return (
    <>
      <div className='w-full h-full flex flex-col items-center'>
        <div className='relative isolate w-full max-w-7xl px-6 lg:px-8'>
        <div className="md:flex-row flex flex-col items-center md:items-start md:justify-between mx-auto w-full max-w-7xl pt-12 pb-24 sm:py-12 lg:py-8">
          <div className="flex-1 flex flex-col items-center gap-4">
          {navigation.state === 'loading' ? <SkeletonText /> : 
          <div className="w-full">
            <h1 className='text-2xl font-semibold my-4'>{course?.name}</h1>
            <p className='mr-4 leading-6 text-slate-800 text-base max-w-2xl'>{course?.description}</p>
          </div>}
          </div>
          <CourseProfessorsCard professors={course?.professors.map(p => ({
            ...p.professor,
          })) ?? []} />
        </div>
        <Reviews reviews={course?.reviews ?? []} />
    </div>
    </div>
    </>
    
  );
};

export default Course;