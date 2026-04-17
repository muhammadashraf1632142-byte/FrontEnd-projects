import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <>
      <div className="w-full flex flex-col items-center max-w-md space-y-3">
        <Skeleton className="h-24 w-5/6 rounded" />
      </div>
      <div className="shadow-panel w-64 space-y-5 rounded-lg bg-transparent p-4">
        <Skeleton className="h-52 rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
      <div className="shadow-panel w-64 space-y-5 rounded-lg bg-transparent p-4">
        <Skeleton className="h-52 rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
      <div className="shadow-panel w-64 space-y-5 rounded-lg bg-transparent p-4">
        <Skeleton className="h-52 rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
    </>
  );
}
