const RepoFeedSkeleton = () => {
  const repoCard = (
    <div className="animate-pulse rounded-lg border bg-card p-4">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-1">
            <div className="h-4 w-1/3 bg-gray-300"></div>
          </div>
          <div className="mt-2 h-4 w-full bg-gray-300"></div>
        </div>
        <div className="flex flex-col items-end">
          <div className="h-6 w-12 rounded bg-gray-300"></div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-6 w-1/4 rounded bg-gray-300"></div>
        <div className="h-s w-1/4 rounded bg-gray-300"></div>
        <div className="h-6 w-1/4 rounded bg-gray-300"></div>
        <div className="h-6 w-1/4 rounded bg-gray-300"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>{repoCard}</div>
      ))}
    </div>
  );
};

export default RepoFeedSkeleton;
