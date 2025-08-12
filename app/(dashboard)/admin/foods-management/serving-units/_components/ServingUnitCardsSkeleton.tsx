'use client';
import { Skeleton } from '@/components/ui/skeleton';

export const ServingUnitCardsSkeleton = () => {
  const skeletonCards = Array(12).fill(null);

  return (
    <div className="grid grid-cols-4 gap-2">
      {skeletonCards.map((_, index) => (
        <div
          className="flex flex-col justify-between gap-3 rounded-lg border p-6"
          key={index}
        >
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-1">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="size-6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
