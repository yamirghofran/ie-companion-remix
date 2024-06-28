import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import Reviews from "~/components/Reviews";

export const meta: MetaFunction = () => {
  return [
    { title: "IE Companion" },
    { name: "description", content: "Anonymous reviews of professors and courses by IE students." },
  ];
};

export async function loader() {
  const reviews = await prisma.review.findMany({
    include: {
      professor: true,
      course: true,
    },
  });
  return json({ reviews });
}

export default function Index() {
  const { reviews } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <div className="mx-auto max-w-2xl py-24 lg:py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-6xl">
              IE Companion
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Anonymous reviews of professors and courses by IE students.
            </p>
          </div>
        </div>
      <Reviews reviews={reviews} />
    </div>
  );
}
