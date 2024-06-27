import ReviewComponent from '~/components/Review';
import NoReviews from '~/components/NoReviews';
import SkeletonReview from '~/components/SkeletonReview';
import { Review, ReviewWithRelations } from '~/types/Review'



function Reviews({reviews}: {reviews: ReviewWithRelations[]}) {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-12">
    <div className="max-w-7xl w-full">
    {/*<h1 className="text-xl font-semibold mb-2 text-center md:text-left">Reviews</h1>*/}
    <div className="flex flex-col items-center justify-center w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full">
          {reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((review) => (
            <ReviewComponent
              id={review.id}
              key={review.id}
              professorId={review.professorId}
              professor={review.professor}
              courseId={review.courseId}
              course={review.course}
              rating={review.rating}
              comment={review.comment}
              createdAt={review.createdAt}
              updatedAt={review.updatedAt}
            />
          ))}
        </div>
        </div>
    </div>
    </div>
    
  )
}

export default Reviews