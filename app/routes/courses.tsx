import { getAllCourses } from "~/util/db";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Course } from "~/types/Course";
import { Professor } from "~/types/Professor";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Courses",
      description: "All courses",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const page = 1;
  const limit = 20; // Number of items per page
  const courses = await getAllCourses();
  const hasMore = courses.length === limit;
  return json({ courses, page, hasMore });
}



function courses() {
  const { courses, page, hasMore } = useLoaderData<typeof loader>();
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-semibold pt-12'>Courses</h1>
      <main className="w-full flex justify-center">
        <section className="md:w-8/12 w-10/12 mx-auto">
          <ul
            className="w-full flex flex-col gap-y-4 list-none justify-center items-center px-4 mb-48"
          >
            {
              courses.map((course) => {
                return (
                  <li key={course.id} className="md:w-10/12 lg:w-[720px] w-full  border-b border-b-slate-300">
                  <Link
                    to={`/courses/${course.id}`} key={course.id}
                    className="flex justify-between gap-x-6 items-center group no-underline  rounded-md p-1.5 transition duration-200 ease-in-out"
                  >
                    <div className="order-2 flex flex-col items-start justify-end">
                      <Professors professors={course.professors.map(p => p.professor)} />
                    </div>
                      <h2 className="order-1 font-semibold my-2 text-black group-hover:text-blue-600 md:text-xl text-base transition duration-200 ease-in-out">
                        {course.name}
                      </h2>
                  </Link>
                </li>
                )
              })
            }
          </ul>
        </section>
      </main>
    </div>
  )
}

const Professors = ({ professors }: { professors: Professor[] }) => {

  return (
    <>
      {professors.map((professor) => (
        <p key={professor.id} className="text-sm text-slate-700">{professor.name}</p>
      ))}
    </>
  );
};

export default courses