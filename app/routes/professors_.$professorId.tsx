import React, { useState, useEffect } from 'react'
import CourseCard from '~/components/CourseCard';
import Review from '~/components/Review';
import { Button } from '~/components/ui/button';
import ReviewModal from '~/components/ReviewModal';
import NoReviews from '~/components/NoReviews';
import SkeletonText from '~/components/SkeletonText';
import SkeletonReview from '~/components/SkeletonReview';
import Reviews from '~/components/Reviews';
import ProfessorCoursesCard from "~/components/ProfessorCoursesCard";
import { useLoaderData, useNavigation } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getProfessor } from '~/util/db';
import invariant from 'tiny-invariant';

export const loader = async ({params}: {params: {professorId: string}}) => {
    invariant(params.professorId, 'Expected params.professorId to be a string');
    const professor = await getProfessor(parseInt(params.professorId));
    return json({professor})
}


function Professor () {
    const {professor} = useLoaderData<typeof loader>();
    const navigation = useNavigation();

  return (
    <>
      <div className='w-full h-full'>
      <div className='w-full relative isolate px-6 lg:px-8'>
      <div className="md:flex-row flex flex-col items-center md:items-start md:justify-between mx-auto w-full max-w-7xl pt-12 pb-24 sm:py-12 lg:py-8">
        <div className="flex-1 flex flex-col items-center gap-4">
        {navigation.state === 'loading' ? <SkeletonText /> : 
        <div className="w-full">
          <h1 className='text-2xl font-semibold'>{professor?.name}</h1>
          <p className='text-lg text-slate-600'>{professor?.email}</p>
          <p className='mr-4 leading-6 text-slate-800 text-base max-w-2xl'>{professor?.bio && professor.bio}</p>
          </div>}
        </div>
        <ProfessorCoursesCard courses={professor?.courses.map(c => ({
          ...c.course
        })) ?? []} />
        </div>

       <Reviews reviews={professor?.reviews ?? []} />
        </div>
    </div>
    </>
    
  );
};

export default Professor