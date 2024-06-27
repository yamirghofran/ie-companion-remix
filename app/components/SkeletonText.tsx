import { Skeleton } from "~/components/ui/skeleton"

function SkeletonText() {
  return (
    <div className='space-y-6 w-full flex flex-col items-center'>
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
    </div>
    
  )
}

export default SkeletonText;