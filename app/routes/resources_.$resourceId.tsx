import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletonText from "~/components/SkeletonText";
import { getResourceById } from "~/util/db";
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Resource } from "~/types/Resource";


export const loader = async ({ params }: { params: { resourceId: string } }) => {
    const resource = await getResourceById(parseInt(params.resourceId));
    return json({ resource });
}

export const meta = ({ data }: { data: { resource: Resource } }) => {
    if (!data || !data.resource) return [
        {
            title: "Resource | IE Companion",
            description: "Resource",
        }
    ];
    return [
      {
        title: `${data.resource?.name} | IE Companion`,
        description: data.resource?.description,
      },
    ];
  };

function ResourcePage() {
  const { resource } = useLoaderData<typeof loader>();
  const items = resource?.items ?? [];
  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="relative isolate w-full max-w-7xl px-6 lg:px-8">
          <div className="md:flex-row flex flex-col items-center md:items-start md:justify-between mx-auto w-full max-w-7xl pt-12 pb-24 sm:py-12 lg:py-8">
            <div className="flex-1 flex flex-col items-center gap-4">
              {resource ? (
                <div className="w-full">
                  <h1 className="text-2xl font-semibold my-4">{resource.name}</h1>
                  {items.map((item) => (
                    item.type === "pdf" && (
                      <iframe key={item.id} className="w-full h-[calc(100vh-10rem)]" src={item.url ?? ''} title={`Resource Content: ${item.name}`} />
                    )
                  ))}
                </div>
              ) : (
                <div>No resource found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResourcePage;
