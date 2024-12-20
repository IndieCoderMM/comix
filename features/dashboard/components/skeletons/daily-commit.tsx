const DailyCommitSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col rounded-lg border bg-card px-4 py-4">
      <div className="mb-2 flex items-center justify-between gap-1">
        <div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="mt-1 h-4 w-3/4 rounded bg-gray-200"></div>
        </div>
        <div className="h-6 w-5 rounded bg-gray-200"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-5 rounded bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-5 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-2 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          </div>
          <div className="mt-2 h-4 w-full rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default DailyCommitSkeleton;
