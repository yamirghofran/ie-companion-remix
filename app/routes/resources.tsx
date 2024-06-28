// app/routes/items.tsx
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllResources } from "~/util/db";
import { Link } from "@remix-run/react";
import { Course } from "~/types/Course";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Resources",
      description: "All resources",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const page = 1;
  const limit = 20; // Number of items per page

  // Fetch items from your data source
    const resources = await getAllResources();
  const hasMore = resources.length === limit;

  return json({ resources, page, hasMore });
}

export default function Resources() {
  const { resources, page, hasMore } = useLoaderData<typeof loader>();

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-semibold pt-12'>Resources</h1>
      <main className="w-full flex justify-center">
        <section className="md:w-8/12 w-10/12 mx-auto">
          <ul
            className="w-full flex flex-col gap-y-4 list-none justify-center items-center px-4 mb-48"
          >
            {
              resources.map((resource) => {
                return (
                  <li key={resource.id} className="md:w-10/12 lg:w-[720px] w-full  border-b border-b-slate-300">
                  <Link
                    to={`/resources/${resource.id}`} key={resource.id}
                    className="flex justify-between gap-x-6 items-center group no-underline  rounded-md p-1.5 transition duration-200 ease-in-out"
                  >
                      <h2 className="order-1 font-semibold my-2 text-black group-hover:text-blue-600 md:text-xl text-base transition duration-200 ease-in-out">
                        {resource.name}
                      </h2>
                  </Link>
                </li>
                )
              } )
            }
          </ul>
        </section>
      </main>
    </div>
  );
}