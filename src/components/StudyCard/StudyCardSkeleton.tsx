import { Skeleton } from "../ui/skeleton";

export const StudyCardSkeleton = () => {
  return (
    <div
      className="w-full rounded-sm space-y-4 overflow-hidden flex flex-col justify-between"
    >
      <Skeleton className="bg-zinc-400 h-50 w-full rounded-sm" />
      <div className="space-y-4">
        <Skeleton className="bg-zinc-400 h-6 w-full" />
        <Skeleton className="bg-zinc-400 h-20 w-9/10" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="bg-zinc-400 h-6 w-20 rounded-sm" />
        <div className="flex flex-col items-end space-y-4">
          <Skeleton className="bg-zinc-400 h-6 w-20" />
          <Skeleton className="bg-zinc-400 h-4 w-40" />
        </div>
      </div>
    </div>
  );
};
