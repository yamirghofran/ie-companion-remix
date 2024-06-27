import React from 'react'
import { useReviewModal } from '../util/ReviewModalContext';
import {Button} from '~/components/ui/button';
import { MessageSquareDiff } from 'lucide-react';


function NoReviews({ }) {
    const { setReviewOpen } = useReviewModal();
  return (
    <div className="w-full flex justify-center items-center">
    <div className="text-center flex flex-col items-center leading-tight">
      <MessageSquareDiff className="size-16" strokeWidth={1} />
      <h3 className="mt-2 text-xl font-semibold text-gray-900">No reviews yet.</h3>
      <p className="mt-1 text-lg text-gray-500">Be the first to write a review!</p>
      <div className="mt-6">
      <Button variant="default" onClick={() => {
        setReviewOpen(true);
      }}>
          Write a Review
        </Button>
      </div>
    </div>
    </div>

  )
}

export default NoReviews;