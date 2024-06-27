import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonListItem() {
  return (
    <div className="flex flex-col items-center space-y-3 w-full mt-12">
      <Skeleton className="h-[60px] w-full max-w-2xl rounded-xl" />
      <Skeleton className="h-[60px] w-full max-w-2xl rounded-xl" />
      <Skeleton className="h-[60px] w-full max-w-2xl rounded-xl" />
      <Skeleton className="h-[60px] w-full max-w-2xl rounded-xl" />
      <Skeleton className="h-[60px] w-full max-w-2xl rounded-xl" />
      <Skeleton className="h-[60px] w-full max-w-2xl rounded-xl" />

    </div>
  )
}
