import { Skeleton } from "../ui/skeleton"

const BlogCardSkeleton = () => {
  return (
    <div className="border-2 rounded-[0.625rem] p-4 border-white h-[150px]">
      <div>
        <Skeleton className="mb-2 h-[20px] w-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[20px]  w-[150px]" />
          <Skeleton className="h-[20px]  w-[100px]" />
        </div>
      </div>
      <div>
        <Skeleton className="float-right h-[30px] w-[100px]" />
      </div>
    </div>
  )
}

export default BlogCardSkeleton
